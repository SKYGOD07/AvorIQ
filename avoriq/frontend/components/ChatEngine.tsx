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
      text: "// AVORIQ TERMINAL v1.0\n// Scholarship Intelligence Module Active.\n// Type a query to begin matching.",
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
    if (isLimitReached) return;

    const userQuery = inputValue;
    const newMessage: ChatMessage = { id: Date.now().toString(), sender: "user", text: userQuery };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);
    incrementMessageCount();

    setTimeout(() => {
      setIsTyping(false);
      const results = parseAndMatch(userQuery);
      let aiText = "// Processing request...\n// Analysis complete. Here are relevant insights:";
      if (results.length > 0 && (userQuery.toLowerCase().includes("scholarship") || userQuery.toLowerCase().includes("money"))) {
        aiText = "// MATCH FOUND.\n// Displaying scholarship results:";
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
    <div className="flex flex-col h-full bg-background relative">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto pt-8 pb-32 scrollbar-hide">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 bg-bauhaus-red text-white flex items-center justify-center shrink-0 mt-1 font-black text-xs">
                    AI
                  </div>
                )}

                <div className={`flex flex-col gap-4 max-w-[85%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-5 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-surface-2 border-2 border-[#333] text-slate-300"
                        : "bg-transparent text-slate-400 font-mono text-xs"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.results && msg.results.length > 0 && (
                    <div className="grid grid-cols-1 gap-0 w-full">
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
                  <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center shrink-0 mt-1 font-black text-xs">
                    U
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-bauhaus-red text-white flex items-center justify-center shrink-0 font-black text-xs">
                AI
              </div>
              <div className="flex items-center gap-1.5 px-2 font-mono text-xs text-bauhaus-red">
                <span className="animate-pulse">█</span>
                <span className="text-slate-500">processing...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-3xl mx-auto relative">
          <div className="relative flex items-center bg-surface border-2 border-[#333] focus-within:border-bauhaus-red focus-within:shadow-[3px_3px_0px_0px_#D92A2A] transition-all">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="// TYPE YOUR QUERY..."
              className="w-full max-h-40 min-h-[56px] py-4 pl-5 pr-16 bg-transparent text-foreground text-sm font-mono focus:outline-none resize-none scrollbar-hide placeholder:text-slate-600 placeholder:uppercase"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping || isLimitReached}
              className={`absolute right-2 p-2.5 transition-all ${
                inputValue.trim() && !isTyping && !isLimitReached
                  ? "bg-bauhaus-red text-white"
                  : "bg-surface-2 text-slate-600"
              }`}
            >
              {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-600 mt-3 font-black uppercase tracking-widest">
            AvorIQ can make mistakes. Verify important information.
          </p>
        </div>
      </div>

      {/* Limit Overlay */}
      <AnimatePresence>
        {isLimitReached && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/90"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md bg-surface border-2 border-foreground brutal-shadow-lg p-8 text-center relative"
            >
              <div className="w-16 h-16 bg-bauhaus-red text-white flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-wider text-foreground mb-3">Limit Reached</h2>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed uppercase tracking-wider">
                Sign in to unlock unlimited messages and premium features.
              </p>
              <div className="space-y-3">
                <Link href="/login" className="block">
                  <button className="w-full py-4 bg-bauhaus-red text-white font-black uppercase tracking-widest text-sm border-2 border-bauhaus-red hover:bg-transparent hover:text-bauhaus-red transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </button>
                </Link>
                <Link href="/" className="block">
                  <button className="w-full py-4 bg-transparent text-slate-400 font-black uppercase tracking-widest text-sm border-2 border-[#333] hover:border-foreground hover:text-foreground transition-all cursor-pointer">
                    Back to Home
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
