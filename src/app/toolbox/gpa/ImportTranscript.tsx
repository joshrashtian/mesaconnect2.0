// File: components/TranscriptUploader.tsx
"use client";

import { useState, useCallback, ClassType } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"; // needed by react-pdf
import { parsedTranscript } from "./ParseTranscriptHelper";
import { transcriptJsonToClassTypeArray } from "./TransformTranscript";
import { useGPA } from "./GPAProvider";
import { IoCloudUpload } from "react-icons/io5";

type Course = {
  code: string;
  title: string;
  grade: string;
  unitsAttempted: number;
  unitsEarned: number;
  gradePoints: number;
};

type ParsedTranscript = {
  studentInfo: { name: string; id: string; dob: string };
  terms: Array<{ termName: string; courses: Course[] }>;
  totals: {
    overall: { attemptedUnits: number; earnedUnits: number; gpa: number };
  };
};

export default function TranscriptUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [showDocument, setShowDocument] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    success: boolean;
    transcript?: ParsedTranscript;
    error?: string;
  } | null>(null);
  const { AddClassesToSemester } = useGPA();

  //
  // ─── 1) POINT PDF.JS AT THE CORRECT WORKER URL ─────────────────────────────────────
  // We use UNPKG (or jsDelivr) to fetch the exact same pdfjs-dist version that react-pdf bundles.
  //
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.mjs`;

  //
  // ─── 2) WHEN THE USER PICKS A FILE, SAVE THE File OBJECT ────────────────────────────
  //
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setResult(null);
    setShowDocument(false);

    const picked = e.target.files?.[0] || null;
    setFile(picked);
  };

  //
  // ─── 3) WHEN THE USER CLICKS “SUBMIT,” WE RENDER <Document file={file}> ─────────────
  //
  const onSubmit = () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }
    setError(null);
    setResult(null);
    setShowDocument(true);
  };

  //
  // ─── 4) EXTRACT TEXT ONCE <Document> HAS LOADED ─────────────────────────────────────
  //
  const onDocumentLoadSuccess = useCallback(async (pdf: any) => {
    setLoading(true);
    setError(null);

    try {
      let fullText = "";
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const strings: string[] = content.items.map((item: any) => item.str);
        fullText += strings.join(" ") + "\n";
      }

      const raw = `
05/29/25   College of the Canyons   Page   1 of   2 Unofficial Joshua   Jacob   Rashtian   ID #:   0563681 DOB:   08/02/05 Course   Title   Grade   UA   UE   GP   GPA   Codes External   Totals:   0.00   0.00   0.00   0.00 ---------------------------------------SUMMER   2023--------------------------------------- CMPSCI-122   Architecture/Assembly   Language   A   3.00   3.00   12.00 Term   Totals:   3.00   3.00   12.00   4.00 Cumulative   Totals:   3.00   3.00   12.00   4.00 ----------------------------------------FALL   2023---------------------------------------- CMPSCI-111   Intro   Algorithms   and   Prog/Java   A   3.00   3.00   12.00 CMPSCI-111L   Intro   to   Algorithms/Prog Lab   A   1.00   1.00   4.00 COUNS-150   Student   Success   A   3.00   3.00   12.00 MATH-211   Calculus   I   B   5.00   5.00   15.00 ENGL-101   English   Composition   A   4.00   4.00   16.00   7 Term   Totals:   16.00   16.00   59.00   3.69 Cumulative   Totals:   19.00   19.00   71.00   3.74 ---------------------------------------WINTER   2024--------------------------------------- SPAN-101   Elem   Spanish   I   A   5.00   5.00   20.00 Term   Totals:   5.00   5.00   20.00   4.00 Cumulative   Totals:   24.00   24.00   91.00   3.79 ---------------------------------------SPRING   2024--------------------------------------- COMS-105   Fund.   of   Public   Speaking   A   3.00   3.00   12.00 CMPSCI-182L   Data   Structures/Pro.   Dsgn. Lab   A   1.00   1.00   4.00 CMPSCI-182   Data   Structures/Prog   Design   A   3.00   3.00   12.00 MATH-212   Calculus   II   F   5.00   0.00   0.00   R ENGL-103   Critical   Read/Writ/Thinking   A   3.00   3.00   12.00 Term   Totals:   15.00   10.00   40.00   2.67 Cumulative   Totals:   34.00   34.00   131.00   3.85 ---------------------------------------SUMMER   2024--------------------------------------- HIST-111   United   States   History   I   A   3.00   3.00   12.00 Term   Totals:   3.00   3.00   12.00   4.00 Cumulative   Totals:   37.00   37.00   143.00   3.86 ----------------------------------------FALL   2024---------------------------------------- CMPSCI-256   Discrete   Structures   A   3.00   3.00   12.00 MATH-212   Calculus   II   B   5.00   5.00   15.00 PHYSIC-220   Mechanics   of   Solids   and Fluids   A   4.00   4.00   16.00 PSYCH-101   Intro   to   Psychology   B   3.00   3.00   9.00 Term   Totals:   15.00   15.00   52.00   3.47 Cumulative   Totals:   52.00   52.00   195.00   3.75
05/29/25   College of the Canyons   Page   2 of   2 Unofficial Joshua   Jacob   Rashtian   ID #:   0563681 DOB:   08/02/05 Course   Title   Grade   UA   UE   GP   GPA   Codes ---------------------------------------WINTER   2025--------------------------------------- PSYCH-102   Physiological   Psychology   A   3.00   3.00   12.00 HIST-112   United   States   History   II   A   3.00   3.00   12.00 DANCE-100   Dance   Appreciation   A   3.00   3.00   12.00 Term   Totals:   9.00   9.00   36.00   4.00 Cumulative   Totals:   61.00   61.00   231.00   3.79 ---------------------------------------SPRING   2025--------------------------------------- MATH-213   Calculus   III   IP   5.00 MATH-214   Linear   Algebra   IP   4.00 PHYSIC-221   Physics:   Electricity/Magnetism   IP   4.00 Term   Totals:   0.00   0.00   0.00   0.00 Cumulative   Totals:   61.00   61.00   231.00   3.79 ----------------------------------------FALL   2025---------------------------------------- CMPSCI-235   C   Programming   IP   3.00 COMS-190   Forensics   IP   4.00 MATH-215   Differential   Equations   IP   4.00 PHYSIC-222   Thermodyn/Optics/Relativity   IP   4.00 Term   Totals:   0.00   0.00   0.00   0.00 Cumulative   Totals:   61.00   61.00   231.00   3.79 Overall:   61.00   61.00   231.00   3.79 Degree   Applicable   Totals:   61.00   61.00   231.00   3.79 COC   CSU   Transferable   Totals:   61.00   61.00   231.00   3.79 COC   UC   Transferable   Totals:   61.00   61.00   231.00   3.79
`.trim();
      // Run your parsing logic on fullText:
      const { studentInfo, terms, totals } = await parsedTranscript(raw);

      //@ts-ignore
      setResult({ success: true, transcript: { studentInfo, terms, totals } });
    } catch (e: any) {
      console.error("Error extracting text:", e);
      setResult({
        success: false,
        error: e.message || "Unknown parsing error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const onAddToGPA = async () => {
    if (!result) return;
    //@ts-ignore
    const classArray = await transcriptJsonToClassTypeArray(result.transcript!);
    //@ts-ignore
    AddClassesToSemester(classArray as ClassType<any, any, any>[]);
  };

  return (
    <div className="mt-2 flex h-96 w-full flex-col gap-4 overflow-y-scroll rounded-xl bg-white p-5 shadow-lg">
      <h1 className="mb-4 text-2xl font-bold">Import Transcript</h1>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="pdf"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <IoCloudUpload className="mr-2" />
            Upload Unofficial Transcript PDF
          </label>
          <input
            type="file"
            id="pdf"
            accept="application/pdf"
            onChange={onFileChange}
            disabled={loading}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
          />
        </div>

        <div className="flex flex-row gap-2">
          <button
            onClick={onSubmit}
            disabled={!file || loading}
            className={`w-full rounded-md px-4 py-2 text-white ${
              !file || loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Parsing PDF…" : "Parse Transcript"}
          </button>
          <button
            onClick={onAddToGPA}
            disabled={!file || loading || !result}
            className={`w-full rounded-md px-4 py-2 text-white ${
              !file || loading || !result
                ? "cursor-not-allowed bg-gray-400"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Add to GPA
          </button>
        </div>
        {error && <p className="text-red-600">{error}</p>}
      </div>

      {/*
        ─── 5) RENDER <Document> ONLY IF showDocument IS TRUE ────────────────────────────
        We pass `file={file}` directly (the File/Blob object). React-PDF will read
        it internally and send its own copy into the worker (no detached ArrayBuffer).
      */}
      {showDocument && file && (
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<p className="mt-4 text-gray-500">Loading PDF…</p>}
          error={<p className="mt-4 text-red-600">Failed to load PDF.</p>}
          noData={<p className="mt-4 text-gray-500">No PDF selected.</p>}
        >
          {/*
            We include a single <Page> that is effectively hidden (1×1 px).
            React-PDF requires at least one <Page> child, but we don’t actually render the PDF.
          */}
          <Page
            pageNumber={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            width={1}
            height={1}
          />
        </Document>
      )}

      {/*
        ─── 6) SHOW RESULTS ONCE result IS SET ───────────────────────────────────────────
      */}
      {result && (
        <div className="mt-6 space-y-6 rounded-lg border bg-gray-50 p-6">
          {result.success ? (
            <>
              <h2 className="text-lg font-semibold text-green-700">
                Parsed Successfully!
              </h2>

              {/* Student Info */}
              <section className="rounded-md border bg-white p-4">
                <h3 className="font-medium text-gray-900">
                  Student Information
                </h3>
                <div className="mt-2 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
                  <div>
                    <span className="font-medium text-gray-700">Name:</span>
                    <p className="text-gray-900">
                      {result.transcript!.studentInfo.name}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Student ID:
                    </span>
                    <p className="text-gray-900">
                      {result.transcript!.studentInfo.id}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Date of Birth:
                    </span>
                    <p className="text-gray-900">
                      {result.transcript!.studentInfo.dob}
                    </p>
                  </div>
                </div>
              </section>

              {/* Terms Summary */}
              <section className="rounded-md border bg-white p-4">
                <h3 className="font-medium text-gray-900">Academic Summary</h3>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                  <div>
                    <span className="font-medium text-gray-700">
                      Total Terms:
                    </span>
                    <p className="text-xl font-bold text-blue-600">
                      {result.transcript!.terms.length}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Total Courses:
                    </span>
                    <p className="text-xl font-bold text-green-600">
                      {result.transcript!.terms.reduce(
                        (acc, term) => acc + term.courses.length,
                        0,
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Overall GPA:
                    </span>
                    <p className="text-xl font-bold text-purple-600">
                      {result.transcript!.totals.overall.gpa.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Total Units:
                    </span>
                    <p className="text-xl font-bold text-orange-600">
                      {result.transcript!.totals.overall.earnedUnits.toFixed(1)}
                    </p>
                  </div>
                </div>
              </section>

              {/* Raw JSON Data */}
              <details className="rounded-md border bg-white">
                <summary className="cursor-pointer p-4 font-medium hover:bg-gray-50">
                  View Raw JSON Data
                </summary>
                <div className="max-h-96 overflow-auto rounded border-t bg-gray-100 p-4">
                  <pre className="text-xs leading-relaxed">
                    {JSON.stringify(result.transcript, null, 2)}
                  </pre>
                </div>
              </details>
            </>
          ) : (
            <div className="flex items-center text-red-700">
              <h3 className="font-semibold">Error:</h3>
              <p className="ml-2">{result.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
