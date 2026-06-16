"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TabItem {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  variant?: "default" | "pills" | "underline";
}

export function Tabs({
  tabs,
  defaultValue,
  value: controlledValue,
  onChange,
  className = "",
  variant = "default",
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || tabs[0]?.value || "");
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : uncontrolledValue;

  const handleTabClick = (tabValue: string) => {
    const tab = tabs.find((t) => t.value === tabValue);
    if (tab?.disabled) return;
    
    if (!isControlled) {
      setUncontrolledValue(tabValue);
    }
    onChange?.(tabValue);
  };

  const variantStyles = {
    default: "bg-white/5",
    pills: "bg-white/5",
    underline: "bg-transparent",
  };

  const tabStyles = {
    default: (isActive: boolean) =>
      `px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
        isActive
          ? "bg-terracotta/15 text-terracotta shadow-sm shadow-terracotta/10"
          : "text-slate-400 hover:text-white hover:bg-white/5"
      }`,
    pills: (isActive: boolean) =>
      `px-5 py-2 rounded-xl text-sm font-medium transition-all ${
        isActive
          ? "bg-gradient-to-r from-terracotta/15 to-violet/15 text-terracotta border border-terracotta/30"
          : "text-slate-400 hover:text-white hover:bg-white/5"
      }`,
    underline: (isActive: boolean) =>
      `px-4 py-3 text-sm font-medium relative transition-colors ${
        isActive
          ? "text-white"
          : "text-slate-400 hover:text-white"
      }`,
  };

  return (
    <div className={className}>
      <div
        className={`flex gap-1 ${variant === "underline" ? "border-b border-white/5" : ""} ${variantStyles[variant]} rounded-xl p-1`}
        role="tablist"
        aria-orientation="horizontal"
      >
        {tabs.map((tab) => {
          const isActive = activeValue === tab.value;
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.value}`}
              id={`tab-${tab.value}`}
              onClick={() => handleTabClick(tab.value)}
              disabled={tab.disabled}
              className={`
                ${tabStyles[variant](isActive)}
                ${tab.disabled ? "opacity-50 cursor-not-allowed" : ""}
                ${variant === "underline" && isActive ? "after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-terracotta after:to-violet" : ""}
                ${tab.icon ? "flex items-center gap-2" : ""}
              `}
            >
              {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
              {tab.label}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        {tabs.map((tab) => (
          <motion.div
            key={tab.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={activeValue === tab.value ? "" : "hidden"}
            role="tabpanel"
            id={`panel-${tab.value}`}
            aria-labelledby={`tab-${tab.value}`}
            tabIndex={0}
          >
            {tab.children}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}