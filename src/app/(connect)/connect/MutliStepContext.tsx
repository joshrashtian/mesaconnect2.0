"use client";
import React, { createContext, useContext, useState } from "react";
import { motion } from "framer-motion";
export type MultiStepContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  incrementStep: () => void;
  decrementStep: () => void;
  components: React.ReactNode[] | undefined;
  create: (options: MultiStepObject) => void;
};

export type MultiStepObject = {
  title: StepOptions["title"];
  components: React.ReactNode[];
  options?: StepOptions;
};

interface StepOptions {
  title?: string;
}

export const MultiStepContext = createContext<MultiStepContextType>({
  currentStep: 0,
  setCurrentStep: () => {},
  incrementStep: () => {},
  decrementStep: () => {},
  create: () => {},
  components: [],
});

const MultiStepProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [components, setComponents] = useState<React.ReactNode[]>();
  const [details, setDetails] = useState<StepOptions>();

  function incrementStep() {
    setCurrentStep((prev) => prev + 1);
  }
  function decrementStep() {
    setCurrentStep((prev) => prev - 1);
  }

  function create({ title, components, options }: MultiStepObject) {
    setComponents(components);
    setDetails({ title, ...options });
  }

  return (
    <MultiStepContext.Provider
      value={{
        incrementStep,
        decrementStep,
        create,
        currentStep,
        setCurrentStep,
        components,
      }}
    >
      {children}

      {components && (
        <>
          <motion.footer
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="fixed bottom-0 left-0 z-50 h-2/3 w-full origin-bottom rounded-t-[50px] bg-white p-10"
          >
            {details?.title && (
              <h1 className="text-3xl font-bold">{details.title}</h1>
            )}
            <MultiStepComponent />
          </motion.footer>
          <motion.div className="fixed left-0 top-0 z-10 h-full w-full bg-black/50 backdrop-blur-sm duration-1000 backdrop:scale-90" />
        </>
      )}
    </MultiStepContext.Provider>
  );
};

function MultiStepComponent() {
  const context = useContext(MultiStepContext);
  if (!context.components) return null;
  return <div>{context.components[context.currentStep]}</div>;
}

function useMultiStep() {
  return useContext(MultiStepContext);
}

export { MultiStepProvider, useMultiStep };
