"use client";

import { useState } from "react";
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
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const { 
    threads, 
    activeThreadId, 
    setActiveThreadId, 
    createThread, 
    deleteThread,
    clearAllThreads,
    loading
  } = useChat();

  return (
    <div className="flex h-screen bg-navy-deep text-white overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full bg-navy-card border-r border-white/5 flex flex-col z-30"
          >
            {/* New Chat Button */}
            <div className="p-4">
              <button 
                onClick={() => createThread()}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 hover:border-accent-blue/30 transition-all group cursor-pointer"
              >
                <Plus className="w-5 h-5 text-accent-blue" />
                <span className="font-semibold text-sm">New Chat</span>
              </button>
            </div>

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
              
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-slate-400 transition-all text-sm">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed bottom-6 left-6 z-40 p-2 rounded-xl bg-navy-card/80 border border-white/10 text-slate-400 hover:text-white backdrop-blur-md transition-all ${
          !isSidebarOpen ? "translate-x-0" : "translate-x-[240px] opacity-0 pointer-events-none"
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col h-full overflow-hidden">
        {/* Mobile Header (Only visible if sidebar is closed/mobile) */}
        <header className="h-14 border-b border-white/5 flex items-center px-4 md:px-8 justify-between bg-navy-deep/50 backdrop-blur-md relative z-20">
          <div className="flex items-center gap-3">
             {!isSidebarOpen && (
               <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors"
               >
                 <History className="w-5 h-5" />
               </button>
             )}
             <Link href="/" className="flex items-center gap-2">
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
