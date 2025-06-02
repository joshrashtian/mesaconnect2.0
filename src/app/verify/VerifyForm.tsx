"use client";
import { Input } from "@/components/ui/input";
import React, { createContext, useState } from "react";
import {
  IoBook,
  IoPeople,
  IoPerson,
  IoPersonAdd,
  IoPersonAddOutline,
} from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import LoadingObject from "@/(mesaui)/LoadingObject";
import { supabase } from "../../../config/mesa-config";
const VerifyFormContext = createContext<any>(null);

const VerifyForm = () => {
  const [data, setData] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [step, setStep] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setStep(4);
    const { error } = await supabase.from("verify_applications" as any).insert({
      data: JSON.stringify(data),
      img_included: !!image,
    });

    if (error) {
      alert(error.message);
      console.error(error);
      setStep(3);
    } else {
      setIsSubmitting(false);
      setStep(5);
    }
  };

  function incrementStep() {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      setStep((prev) => prev + 1);
      setIsTransitioning(false);
    }, 100);
  }

  function decrementStep() {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      setStep((prev) => prev - 1);
      setIsTransitioning(false);
    }, 100);
  }
  return (
    <VerifyFormContext.Provider
      value={{ data, setData, step, setStep, incrementStep, decrementStep }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex h-full w-full flex-col gap-4"
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex h-full w-full flex-col"
            >
              <h1 className="text-2xl font-bold">Step 1: Status</h1>
              <p className="text-sm text-gray-500">
                Please select your status to continue.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  className="flex flex-col items-start gap-2 rounded-md bg-zinc-100 px-4 py-4 text-xl text-black transition-all duration-500 hover:bg-zinc-300"
                  onClick={() => {
                    setData({ ...data, status: "interested" });
                    incrementStep();
                  }}
                >
                  <IoBook className="text-orange-500" />
                  <span>Interested in MESA</span>
                </button>
                <button
                  className="flex flex-col items-start gap-2 rounded-md bg-zinc-100 px-4 py-4 text-xl text-black transition-all duration-500 hover:bg-zinc-300"
                  onClick={() => {
                    setData({ ...data, status: "friend" });
                    incrementStep();
                  }}
                >
                  <IoPeople className="text-orange-500" />
                  <span>Friend of MESA</span>
                </button>
                <button
                  className="flex flex-col items-start gap-2 rounded-md bg-zinc-100 px-4 py-4 text-xl text-black transition-all duration-500 hover:bg-zinc-300"
                  onClick={() => {
                    setData({ ...data, status: "incoming" });
                    incrementStep();
                  }}
                >
                  <IoPersonAdd className="text-orange-500" />
                  <span>Incoming MESA Member</span>
                </button>
                <button
                  className="flex flex-col items-start gap-2 rounded-md bg-zinc-100 px-4 py-4 text-xl text-black transition-all duration-500 hover:bg-zinc-300"
                  onClick={() => {
                    setData({ ...data, status: "full" });
                    incrementStep();
                  }}
                >
                  <IoPerson className="text-orange-500" />
                  <span>Full MESA Member</span>
                </button>
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex h-full w-full flex-col gap-4"
            >
              <h1 className="text-2xl font-bold">Step 2: Name</h1>
              <div className="flex w-full flex-col gap-2">
                <Input
                  type="text"
                  placeholder="Name"
                  className="w-full"
                  value={data?.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <Input
                  type="text"
                  placeholder="Student ID... (optional)"
                  className="w-full"
                  value={data?.studentId}
                  onChange={(e) =>
                    setData({ ...data, studentId: e.target.value })
                  }
                />
                <Separator />
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-500">
                    Student ID (optional, but recommended for speed).
                  </p>
                  <Input
                    type="file"
                    placeholder="Image"
                    className="w-full"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0])}
                  />
                  {image && (
                    <div className="flex flex-row items-center gap-2 rounded-md">
                      <Image
                        src={URL.createObjectURL(image)}
                        alt="Image"
                        className="h-20 w-20 rounded-md"
                        width={100}
                        height={100}
                        objectFit="cover"
                      />
                    </div>
                  )}
                </div>
                <Separator />
                <div className="flex flex-row gap-2">
                  <Button onClick={() => decrementStep()}>Back</Button>
                  <Button onClick={() => incrementStep()}>Next</Button>
                </div>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-2xl font-bold">Step 3: Confirmation</h1>
              <p className="text-sm text-gray-500">
                Please confirm your information to continue.
              </p>
              <div className="flex flex-col gap-2 text-lg">
                <p>Name: {data?.name}</p>
                <p>Student ID: {data?.studentId}</p>
                <p className="capitalize">Status: {data?.status}</p>
                <p>Image: {!!image ? "Yes" : "No"}</p>
              </div>
              <div className="flex flex-row gap-2">
                <Button onClick={() => decrementStep()}>Back</Button>
                <Button onClick={() => handleSubmit()}>Submit</Button>
              </div>
            </motion.div>
          )}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex h-full w-full flex-col items-center justify-center gap-4"
            >
              <h1 className="text-2xl font-bold">Submitting...</h1>
              <LoadingObject size={100} />
              <p className="text-sm text-gray-500">
                Please wait while we process your information.
              </p>
            </motion.div>
          )}
          {step === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-2xl font-bold">Success</h1>
              <p className="text-sm text-gray-500">
                Your information has been submitted successfully. You can now
                close this page.
              </p>
              <Button
                onClick={() => {
                  setStep(1);
                  setData(null);
                  setImage(null);
                }}
              >
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div className="flex flex-row gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-row gap-2">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`h-2.5 w-2.5 rounded-full ${step === index + 1 ? "bg-orange-500" : "bg-gray-300"}`}
            ></motion.div>
          </div>
        ))}
      </motion.div>
    </VerifyFormContext.Provider>
  );
};

export default VerifyForm;
