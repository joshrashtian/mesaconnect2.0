"use client";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
const Toast = ({
  trigger,
  type,
  message,
  turnOff,
}: {
  trigger: boolean;
  type: string;
  message: string;
  turnOff: any;
}) => {
  const [toast, setToast] = React.useState({ type: type, message: message });
  const [active, setActive] = React.useState(false);

  useEffect(() => {
    setActive(trigger);
    setToast({
        type: type,
        message: message,
      });
    if (trigger) {
      setTimeout(() => {
        setActive(false);
        turnOff();
      }, 6000);
    }
  }, [trigger]);


  return (
    <AnimatePresence>
    { active &&
      <motion.section
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 50, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="absolute flex flex-col justify-center p-6 shadow-md rounded-3xl top-8 right-8 w-1/5 h-28 bg-white"
      >
        <h1
          className={`font-bold text-lg capitalize ${
            toast.type === "success" && "text-green-800"
          }`}
        >
          {toast.type}
        </h1>
        <h1>{toast.message}</h1>
      </motion.section>
    }
    </AnimatePresence>
  );
};

export default Toast;
