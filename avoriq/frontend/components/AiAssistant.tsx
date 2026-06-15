"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, User, GraduationCap, ArrowRight, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  sender: "student" | "ai";
  text: string;
}

const PRESETS = [
  {
    label: "Madhya Pradesh Class 11",
    query: "I am from Madhya Pradesh and studying in Class 11. Which scholarships can I apply for?",
    response: "You are in luck! Based on your profile, you are eligible for the **Post Matric Scholarship Scheme for SC/ST/OBC Students - MP** (providing up to ₹35,000/year) and the **National Means-cum-Merit Scholarship (NMMS)** (providing ₹12,000/year). You may also qualify for private scholarships like **HDFC Bank Parivartan's ECS**.",
  },
  {
    label: "STEM Girls Scholarships",
    query: "Show me scholarships for girl students pursuing engineering or medical courses.",
    response: "For female students in technical streams, we highly recommend: \n1. **L'Oréal India For Young Women in Science Scholarship** (₹2.5 Lakhs over the course)\n2. **Pragati Scholarship Scheme for Girl Students** (₹50,000/year)\n3. **Kotak Kanya Scholarship** (₹1.5 Lakhs/year for professional UG courses).\nThese are excellent opportunities specifically designed to promote women in STEM.",
  },
  {
    label: "Under ₹2.5L Income Merit",
    query: "Which high-value scholarships can I apply for if my family income is below ₹2.5 Lakhs?",
    response: "For families with annual income below ₹2.5 Lakhs, there are several premium options:\n- **PM-YASASVI Scholarship Scheme** (up to ₹1.25 Lakhs/year for OBC/EWS)\n- **LIC Golden Jubilee Scholarship** (₹20,000/year)\n- **Central Sector Scheme (CSSS)** (up to ₹20,000/year for top 80th percentile students)\nAll of these focus heavily on supporting low-income, meritorious students.",
  },
];

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! I am AvorIQ's AI Scholarship Intelligence Assistant. Click one of the preset prompts below to simulate my recommendations, or use the Finder tool to query the database.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const triggerPreset = (query: string, response: string) => {
    if (isTyping) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "student", text: query }]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "ai", text: response }]);
    }, 1500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="glass-panel rounded-3xl h-[480px] flex flex-col overflow-hidden relative border border-white/10">
      {/* Glow */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-accent-blue/5 rounded-full blur-2xl pointer-events-none" />

      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-blue to-accent-purple flex items-center justify-center text-white">
            <Bot className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-white text-sm font-bold flex items-center gap-1.5">
              AvorIQ AI Assistant
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">
              Cognitive Agent Simulator
            </span>
          </div>
        </div>
        <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider text-accent-purple border border-accent-purple/20 bg-accent-purple/10 rounded-full">
          Coming Soon
        </span>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 max-w-[85%] ${
              msg.sender === "student" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-md flex items-center justify-center text-white shrink-0 ${
                msg.sender === "student" ? "bg-accent-purple" : "bg-accent-blue"
              }`}
            >
              {msg.sender === "student" ? (
                <User className="w-4.5 h-4.5" />
              ) : (
                <Bot className="w-4.5 h-4.5" />
              )}
            </div>
            <div
              className={`p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-line ${
                msg.sender === "student"
                  ? "bg-accent-purple/10 text-slate-200 rounded-tr-none border border-accent-purple/20"
                  : "bg-white/[0.02] text-slate-300 rounded-tl-none border border-white/5"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-2.5 mr-auto max-w-[85%]">
            <div className="w-7 h-7 rounded-md bg-accent-blue flex items-center justify-center text-white shrink-0">
              <Bot className="w-4.5 h-4.5" />
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 rounded-tl-none flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Preset Suggestions */}
      <div className="px-4 py-2 bg-navy-deep/40 border-t border-white/5">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
          Preset Queries (Tap to ask)
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              disabled={isTyping}
              onClick={() => triggerPreset(preset.query, preset.response)}
              className="text-[11px] font-semibold text-slate-400 bg-white/5 hover:bg-white/10 hover:text-white border border-white/5 rounded-lg px-2.5 py-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input (Disabled) */}
      <div className="p-4 border-t border-white/5 bg-white/[0.01] space-y-1.5">
        <div className="relative">
          <input
            type="text"
            disabled
            placeholder="AI-powered recommendations coming soon..."
            className="w-full pl-4 pr-10 py-3 rounded-xl bg-white/[0.01] border border-white/5 text-slate-500 text-xs focus:outline-none cursor-not-allowed"
          />
          <button
            type="button"
            disabled
            className="absolute right-2 top-2 p-1 text-slate-600 bg-white/5 rounded-lg cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-center text-[10px] font-medium text-accent-purple/80">
          ✨ Chat recommendations coming in V2 with n8n RAG setup. Use Scholarship Finder above for current data.
        </p>
      </div>
    </div>
  );
}
