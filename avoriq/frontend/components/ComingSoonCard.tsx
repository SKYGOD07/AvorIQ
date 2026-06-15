"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ComingSoonCardProps {
  title: string;
  description: string;
  iconName: keyof typeof Icons;
  phase: string;
}

export default function ComingSoonCard({
  title,
  description,
  iconName,
  phase,
}: ComingSoonCardProps) {
  // Dynamically resolve icon from name string
  const IconComponent = (Icons[iconName] as LucideIcon) || Icons.Sparkles;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between h-full group"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent-purple/10 rounded-full blur-2xl group-hover:bg-accent-purple/20 transition-all duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-accent-purple group-hover:text-accent-blue transition-colors duration-300">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-accent-purple/10 border border-accent-purple/20 text-accent-purple rounded-full">
            Coming Soon
          </span>
        </div>

        <h3 className="text-white text-lg font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {description}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
        <span>Module Integration</span>
        <span className="font-medium text-slate-400">{phase}</span>
      </div>
    </motion.div>
  );
}
