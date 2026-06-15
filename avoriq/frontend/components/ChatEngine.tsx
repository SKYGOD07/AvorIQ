"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Scholarship, StudentProfile } from "../types/scholarship";
import { mockScholarships } from "../data/scholarships";
import ScholarshipCard from "./ScholarshipCard";
import StarBorder from "./reactbits/StarBorder";

export interface ChatMessage {
  id: string;
  sender: "student" | "ai";
  text: string;
  results?: Scholarship[]; // Scholarships to render inline
}

interface ChatEngineProps {
  onOpenDetails: (scholarship: Scholarship) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export default function ChatEngine({ onOpenDetails, savedIds, onToggleSave }: ChatEngineProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I am AvorIQ's AI Scholarship Engine. Tell me a bit about yourself (e.g., 'I am a girl studying engineering in MP' or 'My family income is below 2 lakhs') and I'll find the best opportunities for you.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const parseAndMatch = (query: string): Scholarship[] => {
    // Mock Natural Language Parser
    const q = query.toLowerCase();
    
    let matched = mockScholarships;

    // Filter by Keywords
    if (q.includes("girl") || q.includes("female") || q.includes("women")) {
      matched = matched.filter((s) => s.eligibility.gender === "Female" || s.eligibility.gender === "All");
    }
    if (q.includes("engineer") || q.includes("b.tech") || q.includes("btech")) {
      matched = matched.filter((s) => s.eligibility.fieldsOfStudy.includes("Engineering") || s.eligibility.fieldsOfStudy.includes("All"));
    }
    if (q.includes("mp") || q.includes("madhya pradesh")) {
      matched = matched.filter((s) => s.eligibility.states.includes("Madhya Pradesh") || s.eligibility.states.includes("All India"));
    }
    if (q.includes("sc") || q.includes("st")) {
      matched = matched.filter((s) => s.eligibility.castes.includes("SC") || s.eligibility.castes.includes("ST") || s.eligibility.castes.includes("All"));
    }
    if (q.includes("income") || q.includes("lakh") || q.includes("poor")) {
      matched = matched.filter((s) => s.eligibility.familyIncomeMax <= 500000 && s.eligibility.familyIncomeMax > 0);
    }
    
    // Sort by Match Score mock (actually just sorting by Amount here for demonstration)
    matched.sort((a, b) => b.amount - a.amount);
    
    // Return top 3 matches
    return matched.slice(0, 3);
  };

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const userQuery = inputValue;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "student",
      text: userQuery,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI Processing
    setTimeout(() => {
      setIsTyping(false);
      
      const results = parseAndMatch(userQuery);
      
      let aiText = "Here are some top opportunities I found based on your profile:";
      if (results.length === 0) {
        aiText = "I couldn't find any direct matches for that query. Could you provide a bit more context about your stream or location?";
      }

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiText,
        results: results.length > 0 ? results : undefined,
      };

      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-navy-deep/40 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin relative z-10">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex items-start gap-3 sm:gap-4 max-w-[95%] sm:max-w-[85%] ${
                msg.sender === "student" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg ${
                  msg.sender === "student"
                    ? "bg-gradient-to-br from-accent-purple to-purple-600"
                    : "bg-gradient-to-br from-accent-blue to-blue-600"
                }`}
              >
                {msg.sender === "student" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Message Content */}
              <div className="flex flex-col gap-3 min-w-0">
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === "student"
                      ? "bg-accent-purple/10 text-slate-200 rounded-tr-none border border-accent-purple/20"
                      : "bg-white/[0.03] text-slate-300 rounded-tl-none border border-white/10"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Inline Scholarship Cards */}
                {msg.results && msg.results.length > 0 && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-2">
                    {msg.results.map((scholarship) => (
                      <div key={scholarship.id} className="min-w-[280px]">
                        <ScholarshipCard
                          scholarship={scholarship}
                          isSaved={savedIds.includes(scholarship.id)}
                          onToggleSave={(e) => {
                            e.stopPropagation();
                            onToggleSave(scholarship.id);
                          }}
                          onOpenDetails={() => onOpenDetails(scholarship)}
                          matchScore={95} // Mock high match score for these results
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4 mr-auto max-w-[85%]"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Bot className="w-5 h-5" />
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 rounded-tl-none flex items-center gap-2">
              <span className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-navy-deep/80 backdrop-blur-md border-t border-white/5 relative z-10">
        <StarBorder as="div" color="#2563EB" className="w-full">
          <div className="relative flex items-end w-full bg-navy-card rounded-xl border border-white/5 shadow-inner">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message AvorIQ... (e.g. 'I am an engineering student looking for scholarships')"
              className="w-full max-h-32 min-h-[56px] py-4 pl-5 pr-14 bg-transparent text-white text-sm focus:outline-none resize-none scrollbar-thin placeholder:text-slate-500"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-3 bottom-2.5 p-2 rounded-lg bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white disabled:opacity-50 disabled:bg-transparent disabled:text-slate-500 transition-all cursor-pointer"
            >
              {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </StarBorder>
        <p className="text-center text-[10px] text-slate-500 mt-3 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-accent-purple" />
          AvorIQ can make mistakes. Consider verifying important deadlines on official portals.
        </p>
      </div>
    </div>
  );
}
