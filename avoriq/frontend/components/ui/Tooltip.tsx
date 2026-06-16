"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = "top",
  delay = 200,
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowStyles = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-accent-blue",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-accent-blue",
    left: "left-full top-1/2 -translate-y-1/2 border-l-accent-blue",
    right: "right-full top-1/2 -translate-y-1/2 border-r-accent-blue",
  };

  return (
    <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip} onFocus={showTooltip} onBlur={hideTooltip}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: position === "top" ? 4 : position === "bottom" ? -4 : 0, x: position === "left" ? 4 : position === "right" ? -4 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute ${positionStyles[position]} z-50
              glass-panel-strong px-3 py-2 rounded-lg text-xs font-medium text-white whitespace-nowrap
              shadow-lg shadow-terracotta/10
              ${className}
            `}
            role="tooltip"
          >
            {content}
            <div
              className={`
                absolute w-0 h-0 border-4 border-transparent ${arrowStyles[position]}
              `}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}