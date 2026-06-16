"use client";

import { useState, useRef, useEffect } from "react";
import { User, Sparkles, LogIn, Send, Loader2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Scholarship } from "../types/scholarship";
import { mockScholarships, indianStates } from "../data/scholarships";
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const parseAndMatch = (query: string): Scholarship[] => {
    const q = query.toLowerCase();
    
    // Check if the query is a simple greeting
    const greetings = ["hi", "hello", "hey", "hola", "greetings", "good morning", "good afternoon", "good evening"];
    const isGreetingOnly = greetings.some(g => q.trim() === g || q.trim().startsWith(g + " "));
    if (isGreetingOnly) {
      return [];
    }

    let matched = mockScholarships;
    let filterApplied = false;

    // Filter by Gender
    if (q.includes("girl") || q.includes("female") || q.includes("women") || q.includes("girl's") || q.includes("girls")) {
      matched = matched.filter((s) => s.eligibility.gender === "Female" || s.eligibility.gender === "All");
      filterApplied = true;
    } else if (q.includes("boy") || q.includes("male") || q.includes("boys")) {
      matched = matched.filter((s) => s.eligibility.gender === "All");
      filterApplied = true;
    }

    // Filter by Field of Study
    if (q.includes("engineer") || q.includes("btech") || q.includes("engineering") || q.includes("tech") || q.includes("computer")) {
      matched = matched.filter((s) => s.eligibility.fieldsOfStudy.includes("Engineering") || s.eligibility.fieldsOfStudy.includes("All"));
      filterApplied = true;
    } else if (q.includes("medical") || q.includes("mbbs") || q.includes("doctor") || q.includes("dental") || q.includes("nursing") || q.includes("healthcare")) {
      matched = matched.filter((s) => s.eligibility.fieldsOfStudy.includes("Medical") || s.eligibility.fieldsOfStudy.includes("All"));
      filterApplied = true;
    } else if (q.includes("science") || q.includes("bsc") || q.includes("msc") || q.includes("stem")) {
      matched = matched.filter((s) => s.eligibility.fieldsOfStudy.includes("Science") || s.eligibility.fieldsOfStudy.includes("All"));
      filterApplied = true;
    } else if (q.includes("commerce") || q.includes("bcom") || q.includes("mcom") || q.includes("account")) {
      matched = matched.filter((s) => s.eligibility.fieldsOfStudy.includes("Commerce") || s.eligibility.fieldsOfStudy.includes("All"));
      filterApplied = true;
    } else if (q.includes("arts") || q.includes("humanities") || q.includes("ba") || q.includes("ma")) {
      matched = matched.filter((s) => s.eligibility.fieldsOfStudy.includes("Arts") || s.eligibility.fieldsOfStudy.includes("All"));
      filterApplied = true;
    } else if (q.includes("management") || q.includes("mba") || q.includes("bba") || q.includes("business")) {
      matched = matched.filter((s) => s.eligibility.fieldsOfStudy.includes("Management") || s.eligibility.fieldsOfStudy.includes("All"));
      filterApplied = true;
    } else if (q.includes("law") || q.includes("llb") || q.includes("legal")) {
      matched = matched.filter((s) => s.eligibility.fieldsOfStudy.includes("Law") || s.eligibility.fieldsOfStudy.includes("All"));
      filterApplied = true;
    }

    // Filter by Education Level
    if (q.includes("postgrad") || q.includes("postgraduate") || q.includes("pg") || q.includes("master") || q.includes("phd") || q.includes("mtech") || q.includes("mba")) {
      matched = matched.filter((s) => s.eligibility.educationLevel.includes("PG"));
      filterApplied = true;
    } else if (q.includes("undergrad") || q.includes("undergraduate") || q.includes("ug") || q.includes("bachelor") || q.includes("btech") || q.includes("bsc") || q.includes("bcom") || q.includes("mbbs")) {
      matched = matched.filter((s) => s.eligibility.educationLevel.includes("UG"));
      filterApplied = true;
    } else if (q.includes("diploma")) {
      matched = matched.filter((s) => s.eligibility.educationLevel.includes("Diploma"));
      filterApplied = true;
    } else if (q.includes("school") || q.includes("class 6") || q.includes("class 7") || q.includes("class 8") || q.includes("class 9") || q.includes("class 10") || q.includes("middle school")) {
      matched = matched.filter((s) => s.eligibility.educationLevel.includes("Class 6–10"));
      filterApplied = true;
    } else if (q.includes("class 11") || q.includes("class 12") || q.includes("high school") || q.includes("puc") || q.includes("junior college")) {
      matched = matched.filter((s) => s.eligibility.educationLevel.includes("Class 11–12"));
      filterApplied = true;
    }

    // Filter by Category
    if (q.includes("govt") || q.includes("government") || q.includes("ministry") || q.includes("state")) {
      matched = matched.filter((s) => s.category === "Government");
      filterApplied = true;
    } else if (q.includes("private") || q.includes("bank") || q.includes("company") || q.includes("corporate")) {
      matched = matched.filter((s) => s.category === "Private");
      filterApplied = true;
    } else if (q.includes("ngo") || q.includes("trust") || q.includes("foundation")) {
      matched = matched.filter((s) => s.category === "NGO" || s.category === "Private");
      filterApplied = true;
    } else if (q.includes("international") || q.includes("abroad") || q.includes("uk") || q.includes("study abroad") || q.includes("foreign")) {
      matched = matched.filter((s) => s.category === "International");
      filterApplied = true;
    }

    // Filter by Caste / Category
    if (q.includes("general") || q.includes("open")) {
      matched = matched.filter((s) => s.eligibility.castes.includes("General"));
      filterApplied = true;
    } else if (q.includes("obc")) {
      matched = matched.filter((s) => s.eligibility.castes.includes("OBC"));
      filterApplied = true;
    } else if (q.includes("sc")) {
      matched = matched.filter((s) => s.eligibility.castes.includes("SC"));
      filterApplied = true;
    } else if (q.includes("st")) {
      matched = matched.filter((s) => s.eligibility.castes.includes("ST"));
      filterApplied = true;
    } else if (q.includes("ews")) {
      matched = matched.filter((s) => s.eligibility.castes.includes("EWS"));
      filterApplied = true;
    }

    // Filter by specific state names
    const matchedState = indianStates.find(state => q.includes(state.toLowerCase()));
    if (matchedState) {
      matched = matched.filter(s => s.eligibility.states.includes("All") || s.eligibility.states.includes(matchedState));
      filterApplied = true;
    }

    if (filterApplied) {
      return matched;
    }

    // If query contains general words indicating they are looking for general scholarships
    const isSeekingGeneral = q.includes("scholarship") || q.includes("scholarships") || q.includes("opportunity") || q.includes("opportunities") || q.includes("list") || q.includes("show") || q.includes("find") || q.includes("money") || q.includes("grant");
    if (isSeekingGeneral) {
      return mockScholarships;
    }

    return [];
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
      
      const greetings = ["hi", "hello", "hey", "hola", "greetings", "good morning", "good afternoon", "good evening"];
      const isGreeting = greetings.some(g => userQuery.toLowerCase().trim() === g || userQuery.toLowerCase().trim().startsWith(g + " "));

      let aiText = "";
      if (isGreeting) {
        aiText = "// AVORIQ TERMINAL v1.0\n// Hello! I am your AI Scholarship Companion.\n// How can I assist you today? You can ask me things like:\n// - 'Show me scholarships for engineering students'\n// - 'Are there any scholarships for girls?'\n// - 'List postgraduate scholarships'";
      } else if (results.length > 0) {
        aiText = `// MATCH FOUND.\n// Found ${results.length} matching scholarships. Displaying top matches below:`;
      } else {
        aiText = "// ANALYSIS COMPLETE.\n// No matching scholarships found for your query.\n// Try searching using other keywords (e.g. 'girls', 'engineering', 'government', 'UG', 'caste SC').";
      }

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiText,
        results: results.length > 0 && !isGreeting ? results.slice(0, 3) : undefined,
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
              ref={textareaRef}
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
