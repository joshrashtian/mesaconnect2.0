"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const CircularProgressBar = ({
  percentage = 0,
  size = 120,
  strokeWidth = 8,
  color = "#3b82f6",
  backgroundColor = "#e5e7eb",
  showText = true,
  textColor = "#374151",
  animationDuration = 1.5,
  delay = 0,
  className = "",
  easing = "easeInOut",
  customText = "",
  textClassName = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  const progressVariants = {
    hidden: {
      strokeDashoffset: circumference,
    },
    visible: {
      strokeDashoffset: circumference - (percentage / 100) * circumference,
      transition: {
        duration: animationDuration,
        ease: easing,
        delay: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
        delay: animationDuration * 0.7,
      },
    },
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -90,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: -90,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <motion.svg
        width={size}
        height={size}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          variants={progressVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        />
      </motion.svg>

      {showText && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center font-semibold"
          style={{ color: textColor, fontSize: size * 0.12 }}
          variants={textVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: animationDuration * 0.8 }}
          >
            {Math.round(percentage)}%
          </motion.span>
        </motion.div>
      )}
      {customText && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center font-semibold"
          style={{ color: textColor, fontSize: size * 0.12 }}
          variants={textVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: animationDuration * 0.8 }}
            className={textClassName}
          >
            {customText}
          </motion.span>
        </motion.div>
      )}
    </div>
  );
};

// Advanced progress bar with pulse effect
const PulsingProgressBar = ({
  percentage,
  ...props
}: {
  percentage: number;
}) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <CircularProgressBar percentage={percentage} {...props} />
    </motion.div>
  );
};

// Progress bar with floating elements
const FloatingProgressBar = ({
  percentage,
  ...props
}: {
  percentage: number;
}) => {
  return (
    <div className="relative">
      <CircularProgressBar percentage={percentage} {...props} />
      {/* Floating dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-blue-400"
          initial={{
            x: Math.cos((i * 60 * Math.PI) / 180) * 80,
            y: Math.sin((i * 60 * Math.PI) / 180) * 80,
            opacity: 0,
          }}
          animate={{
            x: Math.cos((i * 60 * Math.PI) / 180) * 60,
            y: Math.sin((i * 60 * Math.PI) / 180) * 60,
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
};

export { CircularProgressBar, PulsingProgressBar, FloatingProgressBar };
