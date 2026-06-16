"use client";

import { Scholarship } from "../types/scholarship";
import { Calendar, Award, Banknote, Bookmark, BookmarkCheck, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import SpotlightCard from "./reactbits/SpotlightCard";
import CountUp from "./reactbits/CountUp";

interface ScholarshipCardProps {
  scholarship: Scholarship;
  isSaved: boolean;
  onToggleSave: (e: React.MouseEvent) => void;
  onOpenDetails: () => void;
  matchScore?: number; // Optional eligibility match percentage
}

export default function ScholarshipCard({
  scholarship,
  isSaved,
  onToggleSave,
  onOpenDetails,
  matchScore,
}: ScholarshipCardProps) {
  const isEndingSoon = scholarship.status === "Ending Soon";
  const isOpen = scholarship.status === "Open";

  // Formatted deadline text
  const formattedDate = new Date(scholarship.deadline).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="h-full cursor-pointer group"
      onClick={onOpenDetails}
    >
      <SpotlightCard className="p-6 h-full flex flex-col justify-between group-hover:border-terracotta/25 transition-colors" spotlightColor="rgba(232, 113, 90, 0.12)">
      {/* Decorative gradient corner glow */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-terracotta/8 rounded-full blur-2xl group-hover:bg-terracotta/15 transition-all duration-300 pointer-events-none" />

      <div>
        {/* Header: Provider & Bookmark */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center font-bold text-terracotta text-sm uppercase">
              {scholarship.provider.substring(0, 2)}
            </div>
            <div>
              <span className="text-slate-400 text-xs font-medium block truncate max-w-[180px]">
                {scholarship.provider}
              </span>
              <span className="px-2 py-0.5 mt-1 text-[10px] font-semibold tracking-wider rounded-md inline-block uppercase border
                bg-white/[0.02] border-white/[0.08] text-slate-300">
                {scholarship.category}
              </span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(e);
            }}
            className={`p-2 rounded-xl border transition-all ${
              isSaved
                ? "bg-terracotta/15 border-terracotta/30 text-terracotta"
                : "bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20"
            }`}
            title={isSaved ? "Saved to wishlist" : "Save to wishlist"}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-terracotta transition-colors duration-300 line-clamp-2">
          {scholarship.name}
        </h3>

        {/* Dynamic Match Score */}
        {matchScore !== undefined && matchScore > 0 && (
          <div className="flex items-center gap-1.5 mb-4 bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald px-2.5 py-1 rounded-lg text-xs font-semibold w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span><CountUp to={matchScore} />% Eligible Match</span>
          </div>
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3.5 py-4 my-2 border-y border-white/5 text-sm">
          <div className="flex items-center gap-2">
            <Banknote className="w-4.5 h-4.5 text-accent-emerald" />
            <div>
              <span className="text-slate-500 text-[10px] block uppercase font-semibold">Value</span>
              <span className="text-white font-bold text-sm">{scholarship.amountFormatted}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className={`w-4.5 h-4.5 ${isEndingSoon ? "text-accent-amber" : "text-slate-400"}`} />
            <div>
              <span className="text-slate-500 text-[10px] block uppercase font-semibold">Deadline</span>
              <span className={`font-semibold text-sm ${isEndingSoon ? "text-accent-amber font-bold" : "text-slate-200"}`}>
                {formattedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Eligibility Text snippet */}
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 my-3">
          <strong className="text-slate-300">Eligible:</strong> {scholarship.eligibility.educationLevel.join(", ")} | Min. Annual Family Income Max limit ₹{scholarship.eligibility.familyIncomeMax > 0 ? scholarship.eligibility.familyIncomeMax.toLocaleString() : "None"}
        </p>
      </div>

      {/* Footer / Status */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border
          ${
            isEndingSoon
              ? "bg-accent-amber/10 border-accent-amber/25 text-accent-amber"
              : isOpen
              ? "bg-accent-emerald/10 border-accent-emerald/25 text-accent-emerald"
              : "bg-accent-rose/10 border-accent-rose/25 text-accent-rose"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isEndingSoon ? "bg-accent-amber animate-pulse" : isOpen ? "bg-accent-emerald" : "bg-accent-rose"}`} />
          {scholarship.status}
        </span>

        <button className="inline-flex items-center gap-1 text-sm font-semibold text-terracotta group-hover:text-violet transition-all duration-300">
          View details
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
      </SpotlightCard>
    </motion.div>
  );
}
