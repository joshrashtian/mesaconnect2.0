"use client";
import React, { createContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoChevronForward, IoClose } from "react-icons/io5";

export const ModalContext = createContext({
  createModal: () => {},
  createDialogBox: (
    e: React.JSX.Element | JSX.IntrinsicElements,
    confirmed: (props: any) => void,
  ) => {},
  disarmModal: () => {},
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState<React.JSX.Element | undefined>();
  const [type, setType] = useState<"dialog" | "modal">("modal");
  const [confirmCommand, setConfirmCommand] = useState<() => Promise<void>>();
  const [settings, setSettings] = useState<ModalSettingType | null>();

  const value = {
    createModal: (component: React.JSX.Element, settings: ModalSettingType) => {
      setType("modal");
      setActive(component);
      setSettings(settings);
    },
    createDialogBox: (
      e: React.JSX.Element | JSX.IntrinsicElements,
      confirmed: { newFunction: () => Promise<void> },
      options: ModalSettingType,
    ) => {
      setType("dialog");
      //@ts-ignore
      setActive(e);
      const newFunction = () => confirmed.newFunction();
      setConfirmCommand(() => newFunction);
      setSettings({ ...options });
    },
    disarmModal: () => {
      setActive(undefined);
      setSettings(null);
    },
  };

  return (
    //@ts-ignore
    <ModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {active && (
          <motion.section className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ type: "spring" }}
              className="z-50 flex min-h-72 min-w-[500px] flex-col justify-between rounded-xl bg-zinc-50 p-10 dark:bg-zinc-900 dark:text-white"
            >
              {active}

              {type === "dialog" && (
                <ul className="flex flex-row gap-2">
                  <button
                    onClick={(e) => {
                      // @ts-ignore
                      confirmCommand();
                      setActive(undefined);
                    }}
                    className="group flex h-full w-40 cursor-pointer flex-row items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-theme-blue to-theme-blue-2 p-2 text-lg text-white duration-500 hover:w-48 hover:scale-105 hover:rounded-lg hover:bg-orange-400 hover:shadow-md hover:drop-shadow-lg"
                  >
                    <p className="translate-x-3 duration-200 group-hover:translate-x-0">
                      {settings?.confirmText ?? "Confirm"}
                    </p>
                    <IoChevronForward className="-translate-x-3 opacity-0 duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </button>
                  {settings?.cancelText && (
                    <button
                      onClick={(e) => {
                        value.disarmModal();
                      }}
                      className="group flex h-full w-40 cursor-pointer flex-row items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-theme-blue to-theme-blue-2 p-2 text-lg text-white duration-500 hover:w-48 hover:scale-105 hover:rounded-lg hover:bg-orange-400 hover:shadow-md hover:drop-shadow-lg"
                    >
                      <p className="translate-x-3 duration-200 group-hover:translate-x-0">
                        {settings?.cancelText}
                      </p>
                      <IoClose className="-translate-x-3 opacity-0 duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </button>
                  )}
                </ul>
              )}
            </motion.div>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 z-10 bg-gray-500 opacity-50 ${settings?.backgroundClass}`}
              onClick={() => {
                if (!settings || settings.canUnmount) value.disarmModal();
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
    settings?: ModalSettingType,
  ) {
    if (!settings?.storedComponent && !component) return;
    if (settings?.storedComponent)
      //@ts-ignore
      context.createModal(settings?.storedComponent, settings);
    //@ts-ignore
    else context.createModal(component, settings);
  }

  function CreateDialogBox(
    e: React.JSX.Element | JSX.IntrinsicElements,
    confirmed: () => Promise<void> | void,
    options?: ModalSettingType,
  ) {
    // @ts-ignore
    context.createDialogBox(e, { newFunction: confirmed }, options);
  }

  function DisarmModal() {
    context.disarmModal();
  }

  function GetContext() {
    return context;
  }

  return { CreateModal, CreateDialogBox, DisarmModal, GetContext };
};

export type ModalSettingType = {
  storedComponent?: React.JSX.Element;
  canUnmount?: boolean;
  onUnmount?: (func: () => void) => void;
  backgroundClass?: string;
  confirmText?: string;
  cancelText?: string;
};

export default ModalProvider;
