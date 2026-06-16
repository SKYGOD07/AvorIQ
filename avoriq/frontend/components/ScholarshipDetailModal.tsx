"use client";

import { useState } from "react";
import { Scholarship } from "../types/scholarship";
import { X, Calendar, Banknote, ShieldAlert, Award, FileText, CheckCircle2, Bookmark, BookmarkCheck, ExternalLink, Sparkles, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ScholarshipDetailModalProps {
  scholarship: Scholarship;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export default function ScholarshipDetailModal({
  scholarship,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
}: ScholarshipDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "eligibility" | "documents" | "steps" | "faqs">("overview");
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  if (!isOpen) return null;

  const handleApply = () => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      setApplied(true);
    }, 2000);
  };

  const tabs = [
    { id: "overview", label: "Overview & Benefits", icon: Award },
    { id: "eligibility", label: "Eligibility Criteria", icon: ShieldAlert },
    { id: "documents", label: "Required Documents", icon: FileText },
    { id: "steps", label: "Application Steps", icon: CheckCircle2 },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative w-full max-w-3xl h-[85vh] bg-surface border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-start justify-between bg-gradient-to-b from-white/[0.02] to-transparent">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider rounded-md inline-block uppercase bg-terracotta/15 border border-terracotta/20 text-terracotta">
                {scholarship.category} Scholarship
              </span>
              <h2 className="text-white text-xl md:text-2xl font-bold leading-snug mt-2">
                {scholarship.name}
              </h2>
              <p className="text-slate-400 text-sm">{scholarship.provider}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-6 py-4 bg-white/[0.01] border-b border-white/5 text-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Banknote className="w-5 h-5" />
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block font-semibold">Financial Support</span>
                <span className="text-white font-bold">{scholarship.amountFormatted}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block font-semibold">Application Deadline</span>
                <span className="text-white font-semibold">
                  {new Date(scholarship.deadline).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 col-span-2 md:col-span-1">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${scholarship.status === "Open" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block font-semibold">Current Status</span>
                <span className="text-white font-semibold">{scholarship.status}</span>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex items-center gap-1 overflow-x-auto px-6 py-2 border-b border-white/5 scrollbar-thin">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-terracotta/15 text-terracotta border border-terracotta/25"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Modal Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-white font-bold text-base">About the Scholarship</h3>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {scholarship.description}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <h4 className="text-white font-bold text-sm flex items-center gap-2 text-terracotta">
                    <Award className="w-4.5 h-4.5" />
                    Coverage & Financial Benefits
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {scholarship.benefits || scholarship.coverage}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "eligibility" && (
              <div className="space-y-6">
                <h3 className="text-white font-bold text-base">Who Can Apply?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Academic Level</span>
                    <span className="text-slate-200 text-sm font-semibold">
                      {scholarship.eligibility.educationLevel.join(", ")}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Gender Requirement</span>
                    <span className="text-slate-200 text-sm font-semibold">
                      {scholarship.eligibility.gender === "All"
                        ? "Open to all genders (Male/Female/Other)"
                        : `Exclusively for ${scholarship.eligibility.gender} candidates`}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Annual Family Income</span>
                    <span className="text-slate-200 text-sm font-semibold">
                      {scholarship.eligibility.familyIncomeMax > 0
                        ? `Must be below ₹${scholarship.eligibility.familyIncomeMax.toLocaleString()}`
                        : "No income limit restrictions"}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Eligible States (Domicile)</span>
                    <span className="text-slate-200 text-sm font-semibold font-medium">
                      {scholarship.eligibility.states.includes("All")
                        ? "All Indian States & UTs"
                        : scholarship.eligibility.states.join(", ")}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Caste/Social Category</span>
                    <span className="text-slate-200 text-sm font-semibold">
                      {scholarship.eligibility.castes.join(", ")}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Field of Study</span>
                    <span className="text-slate-200 text-sm font-semibold">
                      {scholarship.eligibility.fieldsOfStudy.includes("All")
                        ? "All academic streams"
                        : scholarship.eligibility.fieldsOfStudy.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="space-y-4">
                <h3 className="text-white font-bold text-base">Required Documents Checklist</h3>
                <p className="text-slate-400 text-sm">
                  Please make sure you have scanned copies of the following documents ready before launching the application:
                </p>
                <div className="space-y-2.5">
                  {scholarship.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-sm text-slate-300"
                    >
                      <div className="w-5 h-5 rounded-md bg-terracotta/15 flex items-center justify-center text-terracotta font-bold text-[10px]">
                        {idx + 1}
                      </div>
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "steps" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-bold text-base mb-2">Selection Methodology</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {scholarship.selectionProcess}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-bold text-base">Step-by-Step Application Guide</h3>
                  <div className="relative border-l border-white/10 pl-6 ml-3 space-y-6">
                    <div className="relative">
                      <div className="absolute -left-[30px] top-0 w-4.5 h-4.5 rounded-full bg-violet border-4 border-surface" />
                      <h4 className="text-white font-semibold text-sm">Step 1: Check Eligibility</h4>
                      <p className="text-slate-400 text-xs mt-1">
                        Read through the criteria list under our "Eligibility" tab to verify you fulfill the conditions.
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[30px] top-0 w-4.5 h-4.5 rounded-full bg-terracotta border-4 border-surface" />
                      <h4 className="text-white font-semibold text-sm">Step 2: Scan Official Papers</h4>
                      <p className="text-slate-400 text-xs mt-1">
                        Prepare PDF copies of your marksheet, family income proof, Samagra/Aadhaar card, and college admission fee slips.
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[30px] top-0 w-4.5 h-4.5 rounded-full bg-accent-emerald border-4 border-surface" />
                      <h4 className="text-white font-semibold text-sm">Step 3: Click 'Apply Online'</h4>
                      <p className="text-slate-400 text-xs mt-1">
                        Use AvorIQ's portal integration to navigate to the official board site and submit your application form.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "faqs" && (
              <div className="space-y-4">
                <h3 className="text-white font-bold text-base">Frequently Asked Questions</h3>
                {scholarship.faqs && scholarship.faqs.length > 0 ? (
                  <div className="space-y-4">
                    {scholarship.faqs.map((faq, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                        <h4 className="text-white font-bold text-sm flex items-start gap-2">
                          <span className="text-violet font-mono">Q.</span>
                          {faq.question}
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed pl-5">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm italic">No FAQs listed for this scholarship.</p>
                )}
              </div>
            )}
          </div>

          {/* Sticky Actions Bar */}
          <div className="p-6 border-t border-white/5 bg-gradient-to-t from-white/[0.02] to-transparent flex items-center justify-between gap-4">
            <button
              onClick={onToggleSave}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                isSaved
                  ? "bg-terracotta/10 border border-terracotta/20 text-terracotta hover:bg-terracotta/15"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4.5 h-4.5" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4.5 h-4.5" />
                  <span>Save Opportunity</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-3">
              <a
                href={scholarship.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-300 bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
              >
                <span>Official Link</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {applied ? (
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-500/80 cursor-default">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                  <span>Application Simulated!</span>
                </button>
              ) : (
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-terracotta to-violet shadow-md hover:opacity-95 cursor-pointer disabled:opacity-50"
                >
                  {applying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Opening Portal...</span>
                    </>
                  ) : (
                    <>
                      <span>Apply Online</span>
                      <ExternalLink className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
