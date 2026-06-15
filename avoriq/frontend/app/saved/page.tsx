"use client";

import { useState, useEffect } from "react";
import { mockScholarships } from "../../data/scholarships";
import { Scholarship } from "../../types/scholarship";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import ScholarshipCard from "../../components/ScholarshipCard";
import ScholarshipDetailModal from "../../components/ScholarshipDetailModal";
import { Bookmark, Sparkles, LayoutDashboard, ArrowRight, Trash2, CheckCircle2, ChevronRight, Hourglass } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

interface ProgressState {
  [key: string]: "saved" | "vetted" | "applied" | "approved" | "disbursed";
}

export default function SavedScholarshipsPage() {
  const [savedIds, setSavedIds] = useLocalStorage<string[]>("avoriq_saved", []);
  const [progressState, setProgressState] = useLocalStorage<ProgressState>("avoriq_progress", {});
  const [savedScholarships, setSavedScholarships] = useState<Scholarship[]>([]);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  // Sync saved scholarships from ids list
  useEffect(() => {
    const list = mockScholarships.filter((s) => savedIds.includes(s.id));
    setSavedScholarships(list);

    // Initialize progress states for newly saved items
    const updatedProgress = { ...progressState };
    let changed = false;
    list.forEach((s) => {
      if (!updatedProgress[s.id]) {
        updatedProgress[s.id] = "saved";
        changed = true;
      }
    });
    if (changed) {
      setProgressState(updatedProgress);
    }
  }, [savedIds]);

  const handleRemove = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds(savedIds.filter((x) => x !== id));
  };

  const handleUpdateProgress = (id: string, stage: "saved" | "vetted" | "applied" | "approved" | "disbursed") => {
    setProgressState({
      ...progressState,
      [id]: stage,
    });
    if (stage === "disbursed") {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const stages = [
    { key: "saved", label: "Saved" },
    { key: "vetted", label: "Papers Checked" },
    { key: "applied", label: "Applied" },
    { key: "approved", label: "Approved" },
    { key: "disbursed", label: "Funds Sent" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-left space-y-2">
          <span className="text-accent-purple text-xs font-bold uppercase tracking-wider block">
            Your Dashboard
          </span>
          <h1 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight">
            Saved Opportunities
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Monitor your saved scholarships, track their portal status, and simulate your application document status checklist.
          </p>
        </div>

        {savedScholarships.length === 0 ? (
          /* Empty State */
          <div className="glass-panel p-12 max-w-xl mx-auto text-center rounded-3xl border border-white/5 space-y-6 mt-10">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent-purple mx-auto">
              <Bookmark className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-bold text-xl">No saved scholarships yet</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                Explore the Match Finder to bookmark opportunities you are eligible for, and track them here.
              </p>
            </div>
            <Link href="/scholarships" className="inline-block pt-2">
              <button className="px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-sm font-bold rounded-xl shadow-lg hover:opacity-95 flex items-center gap-2 mx-auto cursor-pointer">
                <span>Browse Scholarships</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </Link>
          </div>
        ) : (
          /* Grid of Saved opportunities */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Scholarship Cards (Span 2) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedScholarships.map((s) => (
                  <div key={s.id} className="relative group">
                    <ScholarshipCard
                      scholarship={s}
                      isSaved={true}
                      onToggleSave={(e) => handleRemove(s.id, e)}
                      onOpenDetails={() => setSelectedScholarship(s)}
                    />
                    {/* Inline remove button overlay */}
                    <button
                      onClick={() => handleRemove(s.id)}
                      className="absolute top-4 right-14 p-2 rounded-xl bg-white/5 hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/20 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove Opportunity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Application Pipeline Tracker (Span 1) */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-panel p-6 rounded-3xl space-y-6 border border-white/10 sticky top-24">
                <div>
                  <h3 className="text-white text-base font-bold flex items-center gap-2">
                    <LayoutDashboard className="w-5 h-5 text-accent-purple" />
                    Application Milestones
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    Simulate your document checklists and approvals pipeline for saved items.
                  </p>
                </div>

                <div className="space-y-6">
                  {savedScholarships.map((s) => {
                    const currentStage = progressState[s.id] || "saved";
                    return (
                      <div key={s.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3.5">
                        <span className="text-white text-xs font-bold block truncate" title={s.name}>
                          {s.name}
                        </span>

                        {/* Progress Line */}
                        <div className="flex items-center justify-between gap-1 text-[9px] font-bold uppercase text-slate-500">
                          {stages.map((stage, idx) => {
                            const isCompleted = stages.findIndex((st) => st.key === currentStage) >= idx;
                            const isCurrent = stage.key === currentStage;
                            return (
                              <button
                                key={stage.key}
                                onClick={() => handleUpdateProgress(s.id, stage.key as any)}
                                className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                                  isCurrent
                                    ? "text-accent-blue scale-105 font-extrabold"
                                    : isCompleted
                                    ? "text-emerald-400"
                                    : "text-slate-600 hover:text-slate-400"
                                }`}
                              >
                                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all ${
                                  isCurrent
                                    ? "bg-accent-blue border-accent-blue text-white shadow-sm shadow-accent-blue/40"
                                    : isCompleted
                                    ? "bg-emerald-400/15 border-emerald-400 text-emerald-400"
                                    : "bg-transparent border-white/10"
                                }`}>
                                  {isCompleted && !isCurrent ? "✔" : ""}
                                </div>
                                <span className="hidden md:inline">{stage.label}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Quick feedback banner based on state */}
                        <div className="p-2.5 rounded-lg text-2xs leading-relaxed flex items-center gap-2
                          bg-white/[0.02] border border-white/5 text-slate-400">
                          {currentStage === "saved" && (
                            <>
                              <Hourglass className="w-3.5 h-3.5 text-accent-blue shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
                              <span>Check required documents and organize scans.</span>
                            </>
                          )}
                          {currentStage === "vetted" && (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>Documents verified by AvorIQ. Ready to click 'Apply'.</span>
                            </>
                          )}
                          {currentStage === "applied" && (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>Submitted to board portal. Pending verification.</span>
                            </>
                          )}
                          {currentStage === "approved" && (
                            <>
                              <Sparkles className="w-3.5 h-3.5 text-accent-purple shrink-0 animate-pulse" />
                              <span>Board approved! Awaiting disbursement updates.</span>
                            </>
                          )}
                          {currentStage === "disbursed" && (
                            <>
                              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span className="text-emerald-400 font-bold">Funds received successfully! Congratulations! 🎉</span>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Details modal integration */}
      {selectedScholarship && (
        <ScholarshipDetailModal
          scholarship={selectedScholarship}
          isOpen={true}
          onClose={() => setSelectedScholarship(null)}
          isSaved={savedIds.includes(selectedScholarship.id)}
          onToggleSave={() => handleRemove(selectedScholarship.id)}
        />
      )}
    </div>
  );
}
