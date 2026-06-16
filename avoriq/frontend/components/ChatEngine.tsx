"use client";

import { useState, useRef, useEffect } from "react";
import { User, Sparkles, LogIn, Send, Loader2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Scholarship } from "../types/scholarship";
import { mockScholarships } from "../data/scholarships";
import ScholarshipCard from "./ScholarshipCard";
import { useChatLimit } from "../hooks/useChatLimit";

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  results?: Scholarship[];
}

interface ChatEngineProps {
  onOpenDetails: (scholarship: Scholarship) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export default function ChatEngine({ onOpenDetails, savedIds, onToggleSave }: ChatEngineProps) {
  const { isLimitReached, incrementMessageCount } = useChatLimit();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I'm AvorIQ, your AI scholarship companion. How can I help you today? I can find scholarships, explain eligibility, or help with your applications.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const parseAndMatch = (query: string): Scholarship[] => {
    const q = query.toLowerCase();
    let matched = mockScholarships;

    if (q.includes("girl") || q.includes("female")) {
      matched = matched.filter((s) => s.eligibility.gender === "Female" || s.eligibility.gender === "All");
    }
    if (q.includes("engineer") || q.includes("btech")) {
      matched = matched.filter((s) => s.eligibility.fieldsOfStudy.includes("Engineering") || s.eligibility.fieldsOfStudy.includes("All"));
    }
    
    return matched.slice(0, 2);
  };

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    
    if (isLimitReached) {
      return; // Handled by UI overlay
    }

    const userQuery = inputValue;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userQuery,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);
    incrementMessageCount();

    // Simulate AI Processing
    setTimeout(() => {
      setIsTyping(false);
      
      const results = parseAndMatch(userQuery);
      
      let aiText = "I've analyzed your request. Based on the information provided, here are some relevant insights:";
      if (results.length > 0 && (userQuery.toLowerCase().includes("scholarship") || userQuery.toLowerCase().includes("money"))) {
          aiText = "I found some scholarship opportunities that might match your profile:";
      }

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiText,
        results: results.length > 0 && aiText.includes("scholarship") ? results : undefined,
      };

      setMessages((prev) => [...prev, aiResponse]);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pt-8 pb-32 scrollbar-none">
        <div className="max-w-3xl mx-auto px-4 space-y-8">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 md:gap-6 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-lg bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta shrink-0 mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div className={`flex flex-col gap-4 max-w-[85%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-5 py-3 rounded-2xl text-[15px] leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-white/5 border border-white/10 text-slate-200"
                        : "bg-transparent text-slate-300"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.results && msg.results.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 w-full">
                      {msg.results.map((scholarship) => (
                        <ScholarshipCard
                          key={scholarship.id}
                          scholarship={scholarship}
                          isSaved={savedIds.includes(scholarship.id)}
                          onToggleSave={(e) => {
                            e.stopPropagation();
                            onToggleSave(scholarship.id);
                          }}
                          onOpenDetails={() => onOpenDetails(scholarship)}
                          matchScore={95}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-violet/10 border border-violet/20 flex items-center justify-center text-violet shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div className="flex gap-4 md:gap-6">
              <div className="w-8 h-8 rounded-lg bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1.5 px-2">
                <span className="w-1.5 h-1.5 bg-terracotta/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-terracotta/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-terracotta/50 rounded-full animate-bounce" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-3xl mx-auto relative">
          <div className="relative flex items-center bg-surface/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden group focus-within:border-terracotta/40 transition-all">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message AvorIQ..."
              className="w-full max-h-40 min-h-[60px] py-4.5 pl-6 pr-16 bg-transparent text-white text-[15px] focus:outline-none resize-none scrollbar-none placeholder:text-slate-500"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping || isLimitReached}
              className={`absolute right-3 p-2.5 rounded-xl transition-all ${
                inputValue.trim() && !isTyping && !isLimitReached
                  ? "bg-terracotta text-white shadow-lg shadow-terracotta/20"
                  : "bg-white/5 text-slate-500"
              }`}
            >
              {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-center text-[11px] text-slate-500 mt-3 font-medium">
            AvorIQ can make mistakes. Verify important information.
          </p>
        </div>
      </div>

      {/* Guest Limit Overlay */}
      <AnimatePresence>
        {isLimitReached && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-background/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md bg-surface border border-white/10 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet/15 rounded-full blur-3xl" />
              
              <div className="w-16 h-16 bg-terracotta/10 border border-terracotta/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-terracotta" />
              </div>
              
              <h2 className="text-2xl font-extrabold text-white mb-3">Limit Reached</h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                You&apos;ve reached the free message limit for guests. Sign in to unlock unlimited messages, chat history, and premium AI features.
              </p>
              
              <div className="space-y-3">
                <Link href="/login" className="block">
                  <button className="w-full py-4 bg-gradient-to-r from-terracotta to-violet text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-terracotta/20">
                    <LogIn className="w-5 h-5" />
                    Sign In to Continue
                  </button>
                </Link>
                
                <Link href="/" className="block">
                  <button className="w-full py-4 bg-white/5 text-slate-300 rounded-xl font-semibold hover:bg-white/10 transition-all border border-white/5">
                    Back to Home
                  </button>
                </Link>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-terracotta" />
                Join 10,000+ users on AvorIQ
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
