"use client";
import React, { createContext, use, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";
export type MultiStepContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  incrementStep: () => void;
  decrementStep: () => void;
  components: React.ReactNode[] | undefined;
  options?: StepOptions | undefined;
  create: (options: MultiStepObject) => void;
  setState: (state: any) => void;
  state: any;
  alterState: (newState: any) => void;
};

export type MultiStepObject = {
  title: StepOptions["title"];
  components: React.ReactNode[];
  options?: StepOptions;
};

interface StepOptions {
  title?: string;
  indexsWithNotskip?: number[];
}

export const MultiStepContext = createContext<MultiStepContextType>({
  currentStep: 0,
  setCurrentStep: () => {},
  incrementStep: () => {},
  decrementStep: () => {},
  create: () => {},
  options: undefined,
  components: [],
  setState: () => {},
  state: undefined,
  alterState: () => {},
});

const MultiStepProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [components, setComponents] = useState<React.ReactNode[]>();
  const [details, setDetails] = useState<StepOptions>();
  const [state, setState] = useState<any>();

  function clean() {
    setComponents(undefined);
    setCurrentStep(0);
    setDetails(undefined);
    setState(undefined);
  }
  function incrementStep() {
    //@ts-ignore
    if (currentStep + 1 >= components?.length) {
      clean();
      return;
    }
    setCurrentStep((prev) => prev + 1);

    console.log(state);
  }
  function decrementStep() {
    setCurrentStep((prev) => prev - 1);
  }

  function create({ title, components, options }: MultiStepObject) {
    setComponents(components);
    setDetails({ title, ...options });
  }

  function alterState(newState: any) {
    setState((prev: any) => ({ ...prev, ...newState }));
  }

  return (
    <MultiStepContext.Provider
      value={{
        incrementStep,
        decrementStep,
        create,
        currentStep,
        options: details,
        setCurrentStep,
        components,
        setState,
        state,
        alterState,
      }}
    >
      {children}
      <AnimatePresence>
        {components && (
          <>
            <motion.footer
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 1, type: "spring" }}
              className="fixed bottom-0 left-0 z-50 h-2/3 w-full origin-bottom rounded-t-[50px] bg-white p-10 font-eudoxus"
            >
              {details?.title && (
                <h1 className="text-3xl font-bold">{details.title}</h1>
              )}
              <MultiStepComponent />
            </motion.footer>

            <motion.div
              exit={{ opacity: 0 }}
              className="fixed left-0 top-0 z-10 h-full w-full bg-black/50 backdrop-blur-sm duration-300 backdrop:scale-90"
            />
          </>
        )}
      </AnimatePresence>
    </MultiStepContext.Provider>
  );
};

function MultiStepComponent() {
  const context = useContext(MultiStepContext);

  if (!context.components) return null;
  return (
    <div className="relative h-full w-full rounded-3xl">
      {context.components[context.currentStep]}

      {!context.options?.indexsWithNotskip?.includes(context.currentStep) && (
        <MultiStepNextButton />
      )}

      <Indexes />
    </div>
  );
}

function Indexes() {
  const { components, currentStep } = useContext(MultiStepContext);

  if (!components) return null;
  return (
    <div className="absolute bottom-6 right-1/2 z-50 flex flex-row items-center gap-3 self-center rounded-2xl bg-slate-300/20 p-2 px-5 font-mono">
      {Array.from(Array(components?.length).keys()).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-2 animate-pulse rounded-full duration-500 ${i === currentStep ? "bg-slate-500" : "bg-slate-300"}`}
        />
      ))}
      <ul className="h-4 w-0.5 bg-slate-300" />
      <p>{components?.length - (currentStep + 1)}</p>
    </div>
  );
}
function useMultiStep() {
  return useContext(MultiStepContext);
}

function useMultiStepState() {
  let context = useContext(MultiStepContext);
  return [context.state, context.setState];
}

export function MultiStepNextButton() {
  const { incrementStep } = useMultiStep();
  return (
    <button
      onClick={incrementStep}
      className="absolute bottom-20 right-1/2 flex flex-row items-center justify-center gap-4 self-center rounded-lg bg-slate-500 p-2 px-5 text-white ring-2 ring-transparent duration-500 hover:bg-slate-700/80 hover:ring-blue-500/30"
    >
      Next <IoArrowForward />
    </button>
  );
}

export { MultiStepProvider, useMultiStep, useMultiStepState };
