"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  MessageSquare, 
  Plus, 
  Settings, 
  History, 
  ChevronRight,
  Sparkles,
  LogOut,
  User,
  Trash2,
  Loader2,
  LayoutDashboard,
  Bookmark,
  GraduationCap,
  X,
  BookOpen,
  RefreshCw,
  Download
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { sendChatMessage } from "../../lib/api";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showStudyPlanner, setShowStudyPlanner] = useState(false);
  const [plannerOutput, setPlannerOutput] = useState("");
  const [isGeneratingPlanner, setIsGeneratingPlanner] = useState(false);
  const [plannerError, setPlannerError] = useState<string | null>(null);

  const { user, logout, userProfile } = useAuth();
  const { 
    threads, 
    activeThreadId, 
    setActiveThreadId, 
    createThread, 
    deleteThread,
    clearAllThreads,
    loading
  } = useChat();

  // Load saved study plan on mount/user change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedKey = user ? `avoriq_study_plan_${user.uid}` : "avoriq_study_plan_guest";
      const savedPlan = window.localStorage.getItem(savedKey);
      if (savedPlan) {
        setPlannerOutput(savedPlan);
      } else {
        setPlannerOutput("");
      }
    }
  }, [user]);

  // Open study planner modal if '?planner=true' is in the URL, then clean it up
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("planner") === "true") {
        setShowStudyPlanner(true);
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, []);

  const generateStudyPlan = async () => {
    setIsGeneratingPlanner(true);
    setPlannerError(null);
    setPlannerOutput("");
    let accumulatedText = "";

    try {
      const csvData = window.localStorage.getItem("avoriq_calibration_csv");
      let message = "Based on my student profile, generate a structured, actionable study plan and resource suggestions for me. Provide a weekly breakdown, recommended topics, and study strategies.";
      if (csvData) {
        message = `[STUDENT CALIBRATION PARAMETERS (CSV FORMAT):\n${csvData}\n]\n\nBased on these calibration parameters, generate a highly customized study plan, weekly roadmap, and specific learning resources for me.`;
      } else if (userProfile) {
        message = `Based on my student profile (Academic Level: ${userProfile.educationLevel || "Student"}, Region: ${userProfile.state || "India"}), generate a customized study plan and recommended topics for me.`;
      }

      await sendChatMessage(
        message,
        userProfile ? {
          educationLevel: userProfile.educationLevel,
          gender: userProfile.gender,
          familyIncomeMax: userProfile.familyIncomeMax,
          state: userProfile.state,
          caste: userProfile.caste,
        } : null,
        {
          onScholarships: () => {},
          onToken: (token) => {
            accumulatedText += token;
            setPlannerOutput(accumulatedText);
          },
          onDone: () => {
            setIsGeneratingPlanner(false);
            if (typeof window !== "undefined") {
              const savedKey = user ? `avoriq_study_plan_${user.uid}` : "avoriq_study_plan_guest";
              window.localStorage.setItem(savedKey, accumulatedText);
            }
          },
          onError: (err) => {
            setPlannerError(err);
            setIsGeneratingPlanner(false);
          }
        }
      );
    } catch (err: any) {
      setPlannerError(err.message || "Failed to generate study plan.");
      setIsGeneratingPlanner(false);
    }
  };

  const downloadStudyPlan = () => {
    if (!plannerOutput) return;
    try {
      const blob = new Blob([plannerOutput], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      
      const userName = userProfile?.name || user?.displayName || "student";
      const sanitizedName = userName.toLowerCase().replace(/\s+/g, "_");
      link.setAttribute("download", `avoriq_study_plan_${sanitizedName}.md`);
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download study plan:", err);
    }
  };

  useEffect(() => {
    if (showStudyPlanner && !plannerOutput && !isGeneratingPlanner) {
      generateStudyPlan();
    }
  }, [showStudyPlanner]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-navy-deep text-white overflow-hidden relative">
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <div className="fixed inset-0 z-[100] overflow-y-auto flex justify-center items-start pt-20 pb-8 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettingsModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm z-40"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-surface border-3 border-foreground p-6 brutal-shadow-lg z-50 text-foreground flex flex-col max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6 border-b-2 border-[#333] pb-4">
                <h3 className="font-black text-lg uppercase tracking-wider text-foreground flex items-center gap-2">
                  <Settings className="w-5 h-5 text-bauhaus-red" />
                  App Settings
                </h3>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="p-1 border-2 border-transparent hover:border-foreground text-slate-400 hover:text-foreground transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Settings Sections */}
              <div className="space-y-6">
                {/* Profile Quick Info */}
                {user ? (
                  <div className="space-y-2">
                    <h4 className="font-black text-xs uppercase tracking-wider text-slate-400 mb-2">Student Profile</h4>
                    <div className="p-3.5 bg-surface-2 border-2 border-[#333] space-y-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <div className="flex justify-between items-center">
                        <span>Email</span>
                        <span className="text-foreground truncate max-w-[200px]" title={user.email}>{user.email}</span>
                      </div>
                      {userProfile ? (
                        <>
                          <div className="flex justify-between items-center">
                            <span>Academic Level</span>
                            <span className="text-foreground">{userProfile.educationLevel || "N/A"}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>State</span>
                            <span className="text-foreground">{userProfile.state || "N/A"}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Social Category</span>
                            <span className="text-foreground">{userProfile.caste || "N/A"}</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-slate-500 normal-case">No profile created yet.</div>
                      )}
                    </div>
                    
                    <Link href="/questionnaire" className="block w-full mt-3">
                      <button 
                        onClick={() => setShowSettingsModal(false)}
                        className="w-full py-3 bg-surface-2 border-2 border-[#333] hover:border-foreground text-foreground text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                      >
                        Update Profile / Questionnaire
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="p-3.5 bg-surface-2 border-2 border-[#333] text-xs text-slate-500">
                    You are in Guest Mode. Sign in to save your history and customize your profile.
                  </div>
                )}

                {/* Chat Management */}
                <div className="space-y-2">
                  <h4 className="font-black text-xs uppercase tracking-wider text-slate-400 mb-2">Chat Options</h4>
                  <button
                    onClick={async () => {
                      if (confirm("Are you sure you want to delete all chat threads? This action cannot be undone.")) {
                        await clearAllThreads();
                        setShowSettingsModal(false);
                      }
                    }}
                    className="w-full py-3 bg-bauhaus-red/10 border-2 border-bauhaus-red text-bauhaus-red hover:bg-bauhaus-red hover:text-white text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All Chat Threads
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AI Study Planner Modal */}
      <AnimatePresence>
        {showStudyPlanner && (
          <div className="fixed inset-0 z-[100] overflow-y-auto flex justify-center items-start pt-16 pb-8 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStudyPlanner(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm z-40"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-surface border-3 border-foreground p-6 brutal-shadow-lg z-50 text-foreground flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between mb-4 border-b-2 border-[#333] pb-4">
                <h3 className="font-black text-lg uppercase tracking-wider text-foreground flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent-yellow" />
                  AI Study Planner
                </h3>
                <button
                  onClick={() => setShowStudyPlanner(false)}
                  className="p-1 border-2 border-transparent hover:border-foreground text-slate-400 hover:text-foreground transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status indicator */}
              {typeof window !== "undefined" && !window.localStorage.getItem("avoriq_calibration_csv") && (
                <div className="mb-4 p-3 bg-bauhaus-yellow/10 border border-bauhaus-yellow/30 text-bauhaus-yellow text-[10px] font-bold uppercase tracking-wider leading-relaxed">
                  ⚠️ Note: For highly personalized recommendations, complete the AI Study Calibration on the Dashboard.
                </div>
              )}

              {/* Content Panel */}
              <div className="flex-1 overflow-y-auto p-6 bg-surface-2 border-2 border-foreground text-slate-300 font-sans text-sm leading-relaxed min-h-[350px] max-h-[55vh] rounded-none brutal-shadow-sm scrollbar-hide space-y-4">
                {plannerOutput ? (
                  parseMarkdown(plannerOutput)
                ) : isGeneratingPlanner ? (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-6">
                    <div className="flex gap-2 items-center justify-center h-8">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="w-3.5 h-6 bg-bauhaus-red brutal-shadow-xs"
                          animate={{ opacity: [0.15, 1, 0.15], scaleY: [0.8, 1.2, 0.8] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            delay: i * 0.12,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center">
                      <span className="font-mono text-xs uppercase tracking-widest font-black text-slate-400 animate-pulse">Calibrating Study Roadmap...</span>
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest max-w-xs leading-relaxed">
                        Analyzing your calibration parameters to build the best study plan for you. Please be patient, this might take a moment.
                      </span>
                    </div>
                  </div>
                ) : plannerError ? (
                  <div className="text-bauhaus-red font-bold p-4 bg-bauhaus-red/10 border-2 border-bauhaus-red uppercase tracking-wider text-xs">
                    Error generating plan: {plannerError}
                  </div>
                ) : (
                  <div className="text-slate-500 italic py-10 text-center">
                    Ready to generate study recommendations.
                  </div>
                )}
                {isGeneratingPlanner && (
                  <span className="inline-block ml-1 animate-pulse text-bauhaus-red">█</span>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={generateStudyPlan}
                  disabled={isGeneratingPlanner}
                  className={`flex-1 min-w-[140px] py-3 text-xs font-black uppercase tracking-widest border-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isGeneratingPlanner
                      ? "bg-surface-2 border-[#333] text-slate-500 cursor-not-allowed"
                      : "bg-bauhaus-red text-white border-bauhaus-red hover:bg-transparent hover:text-bauhaus-red"
                  }`}
                >
                  {isGeneratingPlanner ? (
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-background rounded-full animate-ping" />
                      Generating...
                    </span>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </>
                  )}
                </button>

                {plannerOutput && !isGeneratingPlanner && (
                  <button
                    onClick={downloadStudyPlan}
                    className="flex-1 min-w-[140px] py-3 bg-accent-emerald text-white border-2 border-accent-emerald hover:bg-transparent hover:text-accent-emerald text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download (.MD)
                  </button>
                )}

                <button
                  onClick={() => setShowStudyPlanner(false)}
                  className="px-6 py-3 border-2 border-[#333] text-slate-400 hover:border-foreground hover:text-foreground text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="fixed md:static inset-y-0 left-0 z-40 md:z-30 h-full bg-navy-card border-r border-white/5 flex flex-col shadow-2xl md:shadow-none"
          >
            {/* New Chat Button & Close Button */}
            <div className="p-4 flex items-center gap-2">
              <button 
                onClick={() => createThread()}
                className="flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 hover:border-accent-blue/30 transition-all group cursor-pointer"
              >
                <Plus className="w-5 h-5 text-accent-blue" />
                <span className="font-semibold text-sm">New Chat</span>
              </button>
              {isMobile && (
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-3 border border-white/10 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
                  title="Close Sidebar"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Main Navigation Links (Only for logged-in users) */}
            {user && (
              <div className="px-3 pb-3 space-y-1 border-b border-white/5">
                <Link href="/dashboard" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-all text-sm font-medium">
                  <LayoutDashboard className="w-4 h-4 text-accent-blue" />
                  <span>Dashboard</span>
                </Link>
                <Link href="/scholarships" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-all text-sm font-medium">
                  <GraduationCap className="w-4 h-4 text-accent-purple" />
                  <span>Scholarships</span>
                </Link>
                <Link href="/saved" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-all text-sm font-medium">
                  <Bookmark className="w-4 h-4 text-accent-emerald" />
                  <span>Saved Matches</span>
                </Link>
                <button
                  onClick={() => setShowStudyPlanner(true)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-all text-sm font-medium cursor-pointer text-left"
                >
                  <BookOpen className="w-4 h-4 text-accent-yellow" />
                  <span>AI Study Planner</span>
                </button>
              </div>
            )}

            {/* History List */}
            <div className="flex-1 overflow-y-auto px-2 space-y-1 py-2 scrollbar-hide">
              <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
                <span>Recent Chats</span>
                {!loading && threads.length > 1 && (
                  <button 
                    onClick={() => {
                      if (confirm("Clear all chat history?")) {
                        clearAllThreads();
                      }
                    }}
                    className="hover:text-rose-400 transition-colors cursor-pointer normal-case text-[9px] font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-8 text-slate-500 gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-accent-blue" />
                  <span className="text-[9px] uppercase tracking-wider font-semibold">Loading...</span>
                </div>
              ) : (
                threads.map((chat) => (
                  <div
                    key={chat.id}
                    className={`group relative w-full flex items-center justify-between rounded-lg transition-all ${
                      chat.id === activeThreadId 
                        ? "bg-white/5 border border-white/10" 
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <button
                      onClick={() => setActiveThreadId(chat.id)}
                      className="flex-1 flex items-center gap-3 px-3 py-2.5 text-left truncate cursor-pointer"
                    >
                      <MessageSquare className={`w-4 h-4 shrink-0 ${chat.id === activeThreadId ? "text-accent-blue" : "text-slate-400 group-hover:text-accent-blue"}`} />
                      <span className={`text-sm truncate ${chat.id === activeThreadId ? "text-white font-medium" : "text-slate-300 group-hover:text-white"}`}>
                        {chat.title}
                      </span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete chat "${chat.title}"?`)) {
                          deleteThread(chat.id);
                        }
                      }}
                      className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-rose-400 transition-all cursor-pointer mr-1.5 shrink-0"
                      title="Delete Chat"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* User Section */}
            <div className="p-4 border-t border-white/5 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 p-2">
                    <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple border border-accent-purple/30 shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate" title={user.displayName || user.email || "User"}>
                        {user.displayName || user.email?.split("@")[0] || "User"}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate" title={user.email || ""}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => logout()}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-rose-500/10 text-rose-400 transition-all text-sm cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="w-full">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-accent-blue/10 border border-accent-blue/20 text-accent-blue hover:bg-accent-blue hover:text-white transition-all text-sm font-bold cursor-pointer">
                    <Sparkles className="w-4 h-4" />
                    Sign in to Save History
                  </button>
                </Link>
              )}
              
              <button 
                onClick={() => setShowSettingsModal(true)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all text-sm cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Toggle Sidebar Button (Desktop Only) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`hidden md:block fixed bottom-6 left-6 z-40 p-2 rounded-xl bg-navy-card/80 border border-white/10 text-slate-400 hover:text-white backdrop-blur-md transition-all cursor-pointer ${
          !isSidebarOpen ? "translate-x-0" : "translate-x-[240px] opacity-0 pointer-events-none"
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col h-full overflow-hidden">
        {/* Chat Header */}
        <header className="h-14 border-b border-white/5 flex items-center px-4 md:px-8 justify-between bg-navy-deep/50 backdrop-blur-md relative z-20">
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center animate-fade-in"
              title={isSidebarOpen ? "Hide History" : "Show History"}
             >
               <History className={`w-5 h-5 transition-colors ${isSidebarOpen ? "text-accent-blue" : "text-slate-400"}`} />
             </button>
             <Link href="/" className="flex items-center gap-2 ml-1">
                <span className="font-bold text-lg tracking-tight">Avor<span className="text-accent-purple">IQ</span></span>
             </Link>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Model Selector Mock */}
             <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-accent-blue" />
                AvorIQ v4.2
             </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-hidden relative">
           {children}
        </div>
      </main>
    </div>
  );
}

// ── Markdown Parser Helpers for AI Study Planner ──
function parseMarkdown(text: string) {
  const lines = text.split("\n");
  return lines.map((line, index) => {
    // Empty line
    if (line.trim() === "") {
      return <div key={index} className="h-3" />;
    }

    // Horizontal Rule
    if (line.trim() === "---" || line.trim() === "***" || line.trim() === "___") {
      return <hr key={index} className="my-4 border-foreground/20" />;
    }

    // Headers
    if (line.startsWith("# ")) {
      return (
        <h1 key={index} className="text-xl sm:text-2xl font-black uppercase text-foreground mt-5 mb-2 tracking-tight border-b-2 border-foreground pb-2 flex items-center gap-2">
          {formatBoldText(line.slice(2))}
        </h1>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h2 key={index} className="text-base sm:text-lg font-black uppercase text-bauhaus-red mt-4 mb-2 tracking-wide">
          {formatBoldText(line.slice(3))}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      return (
        <h3 key={index} className="text-xs sm:text-sm font-black uppercase text-bauhaus-yellow mt-3 mb-1.5 tracking-wider">
          {formatBoldText(line.slice(4))}
        </h3>
      );
    }

    // Bullet Lists
    const bulletMatch = line.match(/^(\s*)([-*+])\s+(.*)/);
    if (bulletMatch) {
      const indent = bulletMatch[1].length * 4;
      return (
        <div key={index} className="flex gap-2 items-start py-0.5" style={{ paddingLeft: `${indent}px` }}>
          <span className="text-bauhaus-red font-black select-none mt-1">•</span>
          <span className="flex-1 text-slate-300">{formatBoldText(bulletMatch[3])}</span>
        </div>
      );
    }

    // Numbered Lists
    const numberMatch = line.match(/^(\s*)(\d+)\.\s+(.*)/);
    if (numberMatch) {
      const indent = numberMatch[1].length * 4;
      return (
        <div key={index} className="flex gap-2 items-start py-0.5" style={{ paddingLeft: `${indent}px` }}>
          <span className="text-accent-purple font-mono font-bold select-none">{numberMatch[2]}.</span>
          <span className="flex-1 text-slate-300">{formatBoldText(numberMatch[3])}</span>
        </div>
      );
    }

    // Blockquotes
    if (line.startsWith("> ")) {
      return (
        <blockquote key={index} className="pl-4 border-l-4 border-accent-blue bg-surface-2 p-3 text-slate-400 italic my-2">
          {formatBoldText(line.slice(2))}
        </blockquote>
      );
    }

    // Normal paragraph
    return (
      <p key={index} className="text-slate-300 my-1 leading-relaxed">
        {formatBoldText(line)}
      </p>
    );
  });
}

function formatBoldText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-black bg-white/5 px-1 py-0.5 border border-white/10">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
