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
  User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [authToken, setAuthToken] = useLocalStorage<string | null>("avoriq_auth_token", null);

  // Mock chat history
  const recentChats = [
    { id: "1", title: "Engineering Scholarships in India" },
    { id: "2", title: "Study Abroad Roadmap" },
    { id: "3", title: "AI Second Brain Research" },
  ];

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
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all group">
                <Plus className="w-5 h-5 text-accent-blue" />
                <span className="font-semibold text-sm">New Chat</span>
              </button>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto px-2 space-y-1 py-2">
              <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Recent Chats
              </div>
              {recentChats.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all text-left group"
                >
                  <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-accent-blue" />
                  <span className="text-sm text-slate-300 truncate group-hover:text-white">
                    {chat.title}
                  </span>
                </button>
              ))}
            </div>

            {/* User Section */}
            <div className="p-4 border-t border-white/5 space-y-2">
              {authToken ? (
                <>
                  <div className="flex items-center gap-3 p-2">
                    <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple border border-accent-purple/30">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">Premium User</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setAuthToken(null)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-rose-500/10 text-rose-400 transition-all text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="w-full">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-accent-blue/10 border border-accent-blue/20 text-accent-blue hover:bg-accent-blue hover:text-white transition-all text-sm font-bold">
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
