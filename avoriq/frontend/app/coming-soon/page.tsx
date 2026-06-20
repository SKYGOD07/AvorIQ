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
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } });
    }
  };

  const comingSoonFeatures = [
    { title: "AI Study Planner", description: "Custom adaptive study roadmaps based on your target syllabus.", iconName: "Calendar" as const, phase: "Phase 2" },
    { title: "Exam Prep Assistant", description: "Mock papers, instant grading, and performance metrics.", iconName: "Award" as const, phase: "Phase 2" },
    { title: "YouTube Companion", description: "Curated noise-free learning from verified channels.", iconName: "Play" as const, phase: "Phase 3" },
    { title: "Career Navigator", description: "Pathways from High School to Postgraduate with skills mapping.", iconName: "Compass" as const, phase: "Phase 3" },
    { title: "WhatsApp Assistant", description: "Queries, alerts, and guidance directly via WhatsApp.", iconName: "MessageSquare" as const, phase: "Phase 2" },
    { title: "Community Forums", description: "Connect with peers and alumni in moderated forums.", iconName: "Users" as const, phase: "Phase 4" },
    { title: "Parent Dashboard", description: "Monitor milestones and application progress.", iconName: "LineChart" as const, phase: "Phase 4" },
    { title: "Voice Assistant", description: "Hands-free voice commands and verbal learning.", iconName: "Mic" as const, phase: "Phase 3" },
    { title: "Mental Wellness", description: "Stress relief strategies and exam anxiety support.", iconName: "Heart" as const, phase: "Phase 2" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 max-w-3xl space-y-4">
          <span className="text-bauhaus-red text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Roadmap
          </span>
          <h1 className="text-foreground text-4xl sm:text-5xl font-black uppercase tracking-tight leading-[0.95]">
            DEVELOPMENT<br />
            <span className="text-bauhaus-red">VISION</span>
          </h1>
          <div className="w-24 h-[3px] bg-bauhaus-red" />
          <p className="text-slate-500 text-sm uppercase tracking-wider font-medium">
            While today we assist with scholarship intelligence, here are the modules in active development.
          </p>
        </div>

        {/* Waitlist */}
        <div className="bg-surface border-2 border-foreground brutal-shadow p-8 max-w-3xl mb-16 space-y-6">
          <h2 className="text-foreground text-lg font-black uppercase tracking-wider">
            Join the Beta Waitlist
          </h2>
          <p className="text-slate-500 text-xs uppercase tracking-wider">
            Be the first to access new modules when they launch.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubscribe}
                className="flex items-center gap-0 max-w-md"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-600" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOUR EMAIL"
                    className="w-full pl-10 pr-4 py-3 bg-surface-2 border-2 border-[#333] border-r-0 text-foreground text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-bauhaus-red placeholder:text-slate-600"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-bauhaus-red text-white font-black text-xs uppercase tracking-widest border-2 border-bauhaus-red hover:bg-transparent hover:text-bauhaus-red transition-all cursor-pointer flex items-center gap-2"
                >
                  Register
                  <Send className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-accent-emerald font-black text-xs uppercase tracking-widest bg-accent-emerald/10 border-2 border-accent-emerald py-3 px-6 w-fit"
              >
                <CheckCircle2 className="w-4.5 h-4.5" />
                Registered for beta!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {comingSoonFeatures.map((f, idx) => (
            <ComingSoonCard key={idx} title={f.title} description={f.description} iconName={f.iconName} phase={f.phase} />
          ))}
        </div>
      </div>
    </div>
  );
}
