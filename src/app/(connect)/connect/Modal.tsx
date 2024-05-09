"use client";
import React, { Component, createContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IoCheckbox,
  IoChevronForward,
  IoChevronForwardCircle,
} from "react-icons/io5";
export const ModalContext = createContext({
  createModal: (component: React.JSX.Element) => {},
  createDialogBox: (
    e: React.JSX.Element | JSX.IntrinsicElements,
    confirmed: (props: any) => void
  ) => {},
  disarmModal: () => {},
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState<React.JSX.Element | undefined>();
  const [type, setType] = useState<"dialog" | "modal">("modal");
  const [confirmCommand, setConfirmCommand] = useState<() => Promise<void>>();

  const value = {
    createModal: (component: React.JSX.Element) => {
      setType("modal");
      setActive(component);
    },
    createDialogBox: (
      e: React.JSX.Element | JSX.IntrinsicElements,
      confirmed: { newFunction: () => Promise<void> }
    ) => {
      setType("dialog");
      //@ts-ignore
      setActive(e);
      const newFunction = () => confirmed.newFunction();
      setConfirmCommand(() => newFunction);
    },
    disarmModal: () => setActive(undefined),
  };

  return (
    //@ts-ignore
    <ModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {active && (
          <motion.section className="fixed inset-0 flex justify-center items-center overflow-y-auto">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ type: "spring" }}
              className="p-10 rounded-xl z-50 flex flex-col justify-between min-w-[500px] min-h-72 bg-zinc-50"
            >
              {active}
              {type === "dialog" && (
                <button
                  onClick={(e) => {
                    confirmCommand();
                    setActive(undefined)
                  }}
                  className=" cursor-pointer group flex flex-row items-center justify-center text-lg gap-2 bg-gradient-to-br p-2 text-white from-theme-blue to-theme-blue-2 hover:drop-shadow-lg hover:bg-orange-400 hover:scale-105 hover:shadow-md duration-500 h-full rounded-xl hover:rounded-lg hover:w-48 w-40"
                >
                  <p className="group-hover:translate-x-0 translate-x-3 duration-200">
                    Confirm
                  </p>
                  <IoChevronForward className="group-hover:opacity-100 opacity-0 duration-300 group-hover:translate-x-0 -translate-x-3 " />
                </button>
              )}
            </motion.div>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-0 bg-gray-500 opacity-50 "
              onClick={() => {
                value.disarmModal();
              }}
            />
          </motion.section>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

export const useModal = (settings?: {
  storedComponent: React.JSX.Element;
  onUnmount: (func: () => void) => void;
  draggable: boolean;
}) => {
  const context = React.useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  function CreateModal(
    component?: React.JSX.Element,
    settings?: {
      storedComponent: React.JSX.Element;
      onUnmount: (func: () => void) => void;
    }
  ) {
    if (!settings?.storedComponent && !component) return;
    if (settings?.storedComponent)
      context.createModal(settings.storedComponent);
    //@ts-ignore
    else context.createModal(component);
  }

  function CreateDialogBox(
    e: React.JSX.Element | JSX.IntrinsicElements,
    confirmed: { newFunction: () => Promise<void> }
  ) {
    context.createDialogBox(e, { newFunction: confirmed });
  }

  function DisarmModal() {
    context.disarmModal();
  }

  function GetContext() {
    return context;
  }

  return { CreateModal, CreateDialogBox, DisarmModal, GetContext };
};

export default ModalProvider;
