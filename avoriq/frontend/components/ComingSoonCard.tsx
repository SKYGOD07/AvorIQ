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
  const IconComponent = (Icons[iconName] as LucideIcon) || Icons.Sparkles;

  return (
    <motion.div
      whileHover={{ x: -2, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="bg-surface border-2 border-[#333] p-6 relative overflow-hidden flex flex-col justify-between h-full group hover:border-bauhaus-red hover:shadow-[4px_4px_0px_0px_#D92A2A] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 border-2 border-[#333] flex items-center justify-center text-slate-500 group-hover:bg-bauhaus-red group-hover:border-bauhaus-red group-hover:text-white transition-all">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="px-2.5 py-1 text-[9px] font-black tracking-widest uppercase bg-bauhaus-yellow/10 border-2 border-bauhaus-yellow text-bauhaus-yellow">
            Coming Soon
          </span>
        </div>

        <h3 className="text-foreground text-sm font-black uppercase tracking-wider mb-2">
          {title}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">
          {description}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t-2 border-[#333] flex items-center justify-between text-[9px] text-slate-600 font-black uppercase tracking-widest">
        <span>Module</span>
        <span className="text-slate-400">{phase}</span>
      </div>
    </motion.div>
  );
}
