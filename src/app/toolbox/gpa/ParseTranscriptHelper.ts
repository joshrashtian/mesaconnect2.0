// ────────────────────────────────────────────────────────────────────────────────
// File: parseTranscriptFinal.ts
// ────────────────────────────────────────────────────────────────────────────────

/**
 * 1) Extract student information (Name / ID / DOB)
 *
 *    Looks for a pattern like:
 *      “Unofficial <First> <Middle?> <Last>   ID #: <digits>   DOB: <MM/DD/YY>”
 */
export async function extractStudentInfo(raw: string) {
  const m = raw.match(
    /Unofficial\s+(.+?)\s+ID\s+#:\s+(\d+)\s+DOB:\s+([0-9/]+)/m
  );
  return {
    name: m ? m[1].replace(/\s+/g, " ").trim() : "N/A",
    id: m ? m[2].trim() : "N/A",
    dob: m ? m[3].trim() : "N/A",
  };
}

/**
 * 2) Parse out all terms + courses robustly.
 *
 *    Steps:
 *     a) Globally find every “<SEMESTER> <YEAR>” (e.g. “SUMMER 2023”, “FALL 2023”, etc.)
 *     b) Record the index of each match in the raw string.
 *     c) Slice the raw string into “chunks”—one chunk per term—using those indices.
 *     d) Within each chunk, split into lines.  For each line:
 *         • Strip off ANY leading text “... SUMMER 2023 ---” (in case the heading is on the same line)
 *         • Collapse multiple spaces into a single space
 *         • Try two regexes: “fully graded” or “IP‐only”
 *         • If it matches, split code into category/number and push a clean course object
 */
export async function parseTranscriptText(raw: string) {
  // a) Find all term‐headings anywhere in `raw`: “SUMMER 2023”, “FALL 2023”, etc.
  const termHeadingGlobal = /\b(SUMMER|FALL|WINTER|SPRING)\s+(\d{4})\b/gi;

  type TermMatch = { termName: string; index: number };
  const termMatches: TermMatch[] = [];
  let m: RegExpExecArray | null = null;
  while ((m = termHeadingGlobal.exec(raw)) !== null) {
    termMatches.push({
      termName: `${m[1].toUpperCase()} ${m[2]}`, // e.g. “SUMMER 2023”
      index: m.index,
    });
  }

  // If we found no headings at all, return []
  if (termMatches.length === 0) {
    return [];
  }

  // b) Add a “sentinel” at raw.length so slicing the last term is easy
  termMatches.push({ termName: "", index: raw.length });

  // c) Build a single regex that matches either:
  //    • Fully‐graded course lines: CODE <title> GRADE UA UE GP
  //    • “IP” courses:          CODE <title> IP UA
  //
  // We use a single, global, “named‐capture”‐style pattern. Explanation:
  //   - ([A-Za-z0-9\-]+)       → group 1: course‐code (e.g. “CMPSCI-122”)
  //   - \s+(.+?)\s+            → group 2: course‐title (any text, lazily)
  //   - (IP|[A-FPIR]{1,2})     → group 3: grade (“A”–“F” or “IP”)
  //   - \s+([\d.]{1,4})        → group 4: unitsAttempted
  //   - (?:\s+([\d.]{1,4})     → group 5: unitsEarned  (optional, because IP won’t have it)
  //   - \s+([\d.]{1,5}))?      → group 6: gradePoints (optional)
  //
  // Putting it all together (with /g so we can find multiple matches):
  const courseRegex =
    /([A-Za-z0-9\-]+)\s+(.+?)\s+(IP|[A-FPIR]{1,2})\s+([\d.]{1,4})(?:\s+([\d.]{1,4})\s+([\d.]{1,5}))?/g;

  // d) Now slice raw into “term‐chunks” and run courseRegex over each chunk.
  const terms: Array<{
    termName: string;
    courses: Array<{
      category: string;
      number: string;
      name: string;
      grade: string;
      unitsAttempted: number;
      unitsEarned: number;
      gradePoints: number;
    }>;
  }> = [];

  for (let i = 0; i < termMatches.length - 1; i++) {
    const { termName, index: startIdx } = termMatches[i];
    const endIdx = termMatches[i + 1].index;
    const chunk = raw.slice(startIdx, endIdx).trim();

    // 1) Remove any leading “… TERMNAME …” + any dashes/spaces before matching courses.
    //    e.g. if chunk begins “-----SUMMER 2023----- CMPSCI-122 …”, we strip it off.
    //    We allow multiple spaces between words in termName:
    const [sem, yr] = termName.split(" ");
    const stripHeadingRegex = new RegExp(
      `^[\\s\\-]*${sem}\\s+${yr}[\\s\\-]*`,
      "i"
    );
    let body = chunk.replace(stripHeadingRegex, "").trim();

    // 2) Collapse EVERY sequence of whitespace into a single space, so titles won’t have giant gaps:
    //    e.g. “Architecture/Assembly   Language” → “Architecture/Assembly Language”
    body = body.replace(/\s+/g, " ");

    // 3) Now run a global `.exec()` loop with courseRegex to find every course:
    const courses: Array<{
      category: string;
      number: string;
      name: string;
      grade: string;
      unitsAttempted: number;
      unitsEarned: number;
      gradePoints: number;
    }> = [];

    let cmatch: RegExpExecArray | null = null;
    while ((cmatch = courseRegex.exec(body)) !== null) {
      const [
        ,
        code,      // e.g. "CMPSCI-122"
        rawTitle,  // e.g. "Architecture/Assembly Language"
        grade,     // e.g. "A" or "IP"
        ua,        // e.g. "3.00"
        ue,        // e.g. "3.00"  (undefined if IP)
        gp,        // e.g. "12.00" (undefined if IP)
      ] = cmatch;

      // Split course‐code at the first dash into category/number:
      let [category, number] = code.split("-");
      if (number === undefined) {
        number = "";
      }

      // Interpret “IP” lines (no UE/GP) vs fully‐graded:
      const unitsAttempted = parseFloat(ua);
      const unitsEarned = grade.toUpperCase() === "IP" ? 0 : parseFloat(ue!);
      const gradePoints = grade.toUpperCase() === "IP" ? 0 : parseFloat(gp!);

      courses.push({
        category,
        number,
        name: rawTitle.trim(),
        grade: grade.toUpperCase(),
        unitsAttempted,
        unitsEarned,
        gradePoints,
      });
    }

    terms.push({ termName, courses });
  }

  return terms;
}


/**
 * 3) Compute overall totals (sum UA | UE | GP across ALL terms)
 */
export async function computeTotals(
  terms: Array<{
    termName: string;
    courses: Array<{
      category: string;
      number: string;
      name: string;
      grade: string;
      unitsAttempted: number;
      unitsEarned: number;
      gradePoints: number;
    }>;
  }>
) {
  let totalUA = 0;
  let totalUE = 0;
  let totalGP = 0;

  for (const term of terms) {
    for (const c of term.courses) {
      // Skip any course with grade "F" or "IP"
      if (c.grade === "F" || c.grade === "IP") {
        continue;
      }
      totalUA += c.unitsAttempted;
      totalUE += c.unitsEarned;
      totalGP += c.gradePoints;
    }
  }

  const overallGPA = totalUA > 0 ? totalGP / totalUA : 0;
  return {
    overall: {
      attemptedUnits: parseFloat(totalUA.toFixed(2)),
      earnedUnits: parseFloat(totalUE.toFixed(2)),
      gpa: parseFloat(overallGPA.toFixed(2)),
    },
  };
}

/**
 * 4) Top‐level helper: given raw PDF→text, return { studentInfo, terms, totals }.
 *
 *    Example usage:
 *      const raw = await extractTextWithPDFJS(pdfBuffer);  // however you get raw text
 *      const studentInfo = extractStudentInfo(raw);
 *      const terms = parseTranscriptText(raw);
 *      const totals = computeTotals(terms);
 *      console.log({ studentInfo, terms, totals });
 */
export async function parsedTranscript(raw: string) {
  const studentInfo = await extractStudentInfo(raw);
  const terms = await parseTranscriptText(raw);
  const totals = await computeTotals(terms);
  return { studentInfo, terms, totals };
}


// ────────────────────────────────────────────────────────────────────────────────
// BELOW IS A QUICK DEMO YOU CAN RUN IN NODE OR A REPL.  Remove/comment out
// once you integrate into Next.js.
//
// (1) Paste exactly the text from your PDF→text step into `inputRaw`
// (2) Run `parsedTranscript(inputRaw)` and inspect the JSON.
// ────────────────────────────────────────────────────────────────────────────────

// Uncomment this block to test in Node/REPL:
//
// const inputRaw = `
// 05/29/25   College of the Canyons   Page   1 of   2 Unofficial Joshua   Jacob   Rashtian   ID #:   0563681 DOB:   08/02/05 Course   Title   Grade   UA   UE   GP   GPA   Codes External   Totals:   0.00   0.00   0.00   0.00 ---------------------------------------SUMMER   2023--------------------------------------- CMPSCI-122   Architecture/Assembly   Language   A   3.00   3.00   12.00 Term   Totals:   3.00   3.00   12.00   4.00 Cumulative   Totals:   3.00   3.00   12.00   4.00 ----------------------------------------FALL   2023---------------------------------------- CMPSCI-111   Intro   Algorithms   and   Prog/Java   A   3.00   3.00   12.00 CMPSCI-111L   Intro   to   Algorithms/Prog Lab   A   1.00   1.00   4.00 COUNS-150   Student   Success   A   3.00   3.00   12.00 MATH-211   Calculus   I   B   5.00   5.00   15.00 ENGL-101   English   Composition   A   4.00   4.00   16.00   7 Term   Totals:   16.00   16.00   59.00   3.69 Cumulative   Totals:   19.00   19.00   71.00   3.74 ---------------------------------------WINTER   2024--------------------------------------- SPAN-101   Elem   Spanish   I   A   5.00   5.00   20.00 Term   Totals:   5.00   5.00   20.00   4.00 Cumulative   Totals:   24.00   24.00   91.00   3.79 ---------------------------------------SPRING   2024--------------------------------------- COMS-105   Fund.   of   Public   Speaking   A   3.00   3.00   12.00 CMPSCI-182L   Data   Structures/Pro.   Dsgn. Lab   A   1.00   1.00   4.00 CMPSCI-182   Data   Structures/Prog   Design   A   3.00   3.00   12.00 MATH-212   Calculus   II   F   5.00   0.00   0.00   R ENGL-103   Critical   Read/Writ/Thinking   A   3.00   3.00   12.00 Term   Totals:   15.00   10.00   40.00   2.67 Cumulative   Totals:   34.00   34.00   131.00   3.85 ---------------------------------------SUMMER   2024--------------------------------------- HIST-111   United   States   History   I   A   3.00   3.00   12.00 Term   Totals:   3.00   3.00   12.00   4.00 Cumulative   Totals:   37.00   37.00   143.00   3.86 ----------------------------------------FALL   2024---------------------------------------- CMPSCI-256   Discrete   Structures   A   3.00   3.00   12.00 MATH-212   Calculus   II   B   5.00   5.00   15.00 PHYSIC-220   Mechanics   of   Solids   and Fluids   A   4.00   4.00   16.00 PSYCH-101   Intro   to   Psychology   B   3.00   3.00   9.00 Term   Totals:   15.00   15.00   52.00   3.47 Cumulative   Totals:   52.00   52.00   195.00   3.75
// 05/29/25   College of the Canyons   Page   2 of   2 Unofficial Joshua   Jacob   Rashtian   ID #:   0563681 DOB:   08/02/05 Course   Title   Grade   UA   UE   GP   GPA   Codes ---------------------------------------WINTER   2025--------------------------------------- PSYCH-102   Physiological   Psychology   A   3.00   3.00   12.00 HIST-112   United   States   History   II   A   3.00   3.00   12.00 DANCE-100   Dance   Appreciation   A   3.00   3.00   12.00 Term   Totals:   9.00   9.00   36.00   4.00 Cumulative   Totals:   61.00   61.00   231.00   3.79 ---------------------------------------SPRING   2025--------------------------------------- MATH-213   Calculus   III   IP   5.00 MATH-214   Linear   Algebra   IP   4.00 PHYSIC-221   Physics:   Electricity/Magnetism   IP   4.00 Term   Totals:   0.00   0.00   0.00   0.00 Cumulative   Totals:   61.00   61.00   231.00   3.79 ----------------------------------------FALL   2025---------------------------------------- CMPSCI-235   C   Programming   IP   3.00 COMS-190   Forensics   IP   4.00 MATH-215   Differential   Equations   IP   4.00 PHYSIC-222   Thermodyn/Optics/Relativity   IP   4.00 Term   Totals:   0.00   0.00   0.00   0.00 Cumulative   Totals:   61.00   61.00   231.00   3.79 Overall:   61.00   61.00   231.00   3.79 Degree   Applicable   Totals:   61.00   61.00   231.00   3.79 COC   CSU   Transferable   Totals:   61.00   61.00   231.00   3.79 COC   UC   Transferable   Totals:   61.00   61.00   231.00   3.79
// `;
//
// parsedTranscript(inputRaw).then((json) => console.log(JSON.stringify(json, null, 2)));
