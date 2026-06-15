"use client";

import { useState } from "react";
import ComingSoonCard from "../../components/ComingSoonCard";
import { Sparkles, Mail, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.7 }
      });
    }
  };

  const comingSoonFeatures = [
    {
      title: "AI Study Planner",
      description: "Generates custom adaptive study roadmaps, mapping out chapters, study guides, and micro-milestones based on your target syllabus.",
      iconName: "Calendar" as const,
      phase: "Phase 2 (Q4 2026)",
    },
    {
      title: "Exam Prep Assistant",
      description: "Provides mock exam papers (JEE, NEET, Board papers), instant grading, detailed explanations, and performance metrics.",
      iconName: "Award" as const,
      phase: "Phase 2 (Q4 2026)",
    },
    {
      title: "YouTube Learning Companion",
      description: "Curates noise-free, highly structured learning modules from verified YouTube channels, skipping clickbait and distractions.",
      iconName: "Play" as const,
      phase: "Phase 3 (Q1 2027)",
    },
    {
      title: "Career Navigator",
      description: "Maps pathways from Class 6 to Graduation, detailing skills, certifications, and entry-level positions for your dream job.",
      iconName: "Compass" as const,
      phase: "Phase 3 (Q1 2027)",
    },
    {
      title: "WhatsApp AI Assistant",
      description: "Ask queries, receive deadline alerts, scan document eligibility check-ups, and receive guidance directly via a WhatsApp chat.",
      iconName: "MessageSquare" as const,
      phase: "Phase 2 (Q3 2026)",
    },
    {
      title: "Community Forums",
      description: "Safely connect with peer groups, study buddies, and alumni mentors in verified academic forums moderated by AI safeguards.",
      iconName: "Users" as const,
      phase: "Phase 4 (Q2 2027)",
    },
    {
      title: "Parent Dashboard",
      description: "Provides a supportive portal for parents to monitor academic milestones, scholarship application progress, and safe chat summaries.",
      iconName: "LineChart" as const,
      phase: "Phase 4 (Q2 2027)",
    },
    {
      title: "Voice Assistant",
      description: "Enables hands-free voice commands and verbal learning modules for students with visual impairments or language barriers.",
      iconName: "Mic" as const,
      phase: "Phase 3 (Q2 2027)",
    },
    {
      title: "Mental Wellness Support",
      description: "A private, compassionate AI space providing stress relief strategies, relaxation exercises, and mindfulness techniques for exam anxiety.",
      iconName: "Heart" as const,
      phase: "Phase 2 (Q3 2026)",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/20 text-accent-purple rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Project Roadmap</span>
          </div>
          <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight">
            Our Development Vision
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            AvorIQ will grow to become the ultimate AI companion for Indian student life. While today we assist with scholarship intelligence, here are the modules currently in active development.
          </p>
        </div>

        {/* Waitlist Subscription Banner */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 max-w-3xl mx-auto mb-16 relative overflow-hidden text-center space-y-6">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent-blue/10 rounded-full blur-2xl pointer-events-none" />
          
          <h2 className="text-white text-xl sm:text-2xl font-bold">
            Join the AvorIQ Beta Waitlist
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            Be the first to access our AI Study Planner and WhatsApp Assistant modules when they launch in private beta this summer.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              >
                <div className="relative w-full">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your student email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-white text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple hover:opacity-95 text-white font-bold rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Register</span>
                  <Send className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm bg-emerald-500/10 border border-emerald-500/20 py-3.5 px-6 rounded-xl w-fit mx-auto"
              >
                <CheckCircle2 className="w-4.5 h-4.5" />
                <span>You have been registered for private beta! Check your email soon.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comingSoonFeatures.map((f, idx) => (
            <ComingSoonCard
              key={idx}
              title={f.title}
              description={f.description}
              iconName={f.iconName}
              phase={f.phase}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
