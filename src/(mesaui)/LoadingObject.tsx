"use client";
import React from "react";
import { VscLoading } from "react-icons/vsc";
import { motion } from "framer-motion";
interface LoadingObjectProps {
  size?: number;
  className?: string;
  color?: string;
}

const LoadingObject: React.FC<LoadingObjectProps> = ({
  size = 20,
  className,
  color,
}) => {
  return (
    <motion.div
      className="flex items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <VscLoading
        style={{ fontSize: size, color: color }}
        className={` ${className}`}
      />
    </motion.div>
  );
};

export default LoadingObject;
