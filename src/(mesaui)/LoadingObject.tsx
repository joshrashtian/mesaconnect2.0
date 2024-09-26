import React from "react";
import { VscLoading } from "react-icons/vsc";

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
    <div className="flex items-center justify-center">
      <VscLoading
        style={{ fontSize: size, color: color }}
        className={`animate-spin text-zinc-900 ${className}`}
      />
    </div>
  );
};

export default LoadingObject;
