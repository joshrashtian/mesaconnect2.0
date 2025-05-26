import { useState, useEffect } from "react";
import { formatPostgresInterval } from "@/_functions/postgres_helpers";

const Slider = ({
  min,
  max,
  step,
  value,
  onChange,
  className = "",
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (e: any) => void;
  className?: string;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateValue(e);
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    updateValue(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateValue = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newValue = min + (percentage / 100) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;
    onChange({ target: { value: Math.max(min, Math.min(max, steppedValue)) } });
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div
      className={`relative h-12 w-full cursor-pointer ${className}`}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Track */}
      <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 transform rounded-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 shadow-inner">
        {/* Progress */}
        <div
          className="h-full rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 shadow-lg transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />

        {/* Glow effect */}
        <div
          className={`absolute top-0 h-full rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-300 ${
            isHovered || isDragging ? "opacity-30 blur-sm" : "opacity-0"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Thumb */}
      <div
        className={`absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-orange-500 bg-white shadow-lg transition-all duration-200 ${
          isDragging
            ? "scale-125 border-purple-500 shadow-xl"
            : isHovered
              ? "scale-110 shadow-lg"
              : ""
        }`}
        style={{ left: `${percentage}%` }}
      >
        {/* Inner gradient */}
        <div
          className={`h-full w-full rounded-full bg-gradient-to-br from-orange-200 to-purple-200 transition-opacity duration-200 ${
            isHovered || isDragging ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Pulse animation when dragging */}
        {isDragging && (
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-30" />
        )}
      </div>

      {/* Value indicator */}
      {(isHovered || isDragging) && (
        <div
          className="absolute -top-12 -translate-x-1/2 transform rounded-lg bg-gray-800 px-3 py-1 text-sm text-white shadow-lg transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
          style={{ left: `${percentage}%` }}
        >
          {formatPostgresInterval(value)}
          <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
        </div>
      )}
    </div>
  );
};

export default Slider;
