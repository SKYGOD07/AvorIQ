"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import ChatEngine from "../../components/ChatEngine";
import ScholarshipDetailModal from "../../components/ScholarshipDetailModal";
import { Scholarship } from "../../types/scholarship";
import { Menu, Plus, MessageSquare, Bookmark, Settings, LogOut, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScholarshipsChatPage() {
  const router = useRouter();
  const [authToken, setAuthToken] = useLocalStorage<string | null>("avoriq_auth_token", null);
  const [savedIds, setSavedIds] = useLocalStorage<string[]>("avoriq_saved", []);
  
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  if (typeof window !== "undefined" && !authToken) {
    router.push("/login");
    return null;
  }

  const handleToggleSave = (id: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((x) => x !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden pt-12 md:pt-16">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 flex flex-col w-72 h-full bg-navy-card border-r border-white/5 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Mobile Close */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white md:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-4">
          <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors cursor-pointer border border-white/5">
            <Plus className="w-5 h-5" />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Recent Chats</span>
            <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] text-slate-300 text-sm font-medium transition-colors text-left truncate cursor-pointer">
              <MessageSquare className="w-4 h-4 shrink-0 text-slate-400" />
              <span className="truncate">Engineering scholarships for girls in MP</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/[0.05] text-slate-400 text-sm font-medium transition-colors text-left truncate cursor-pointer">
              <MessageSquare className="w-4 h-4 shrink-0 text-slate-500" />
              <span className="truncate">SC/ST central sector schemes</span>
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Saved</span>
            <button className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-white/[0.05] text-slate-400 text-sm font-medium transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4 text-accent-blue" />
                <span>My Bookmarks</span>
              </div>
              <span className="text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded-full">{savedIds.length}</span>
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/[0.05] text-slate-400 text-sm font-medium transition-colors cursor-pointer">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-rose-500/10 text-rose-400 text-sm font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-navy-deep/80 backdrop-blur-md">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-300 hover:text-white cursor-pointer">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-white tracking-tight">Avor<span className="text-accent-purple">IQ</span> Chat</span>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Chat Engine Container */}
        <div className="flex-1 p-0 md:p-6 pb-0 overflow-hidden h-full">
          <div className="max-w-4xl mx-auto h-full w-full">
            <ChatEngine
              onOpenDetails={setSelectedScholarship}
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
            />
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedScholarship && (
        <ScholarshipDetailModal
          scholarship={selectedScholarship}
          isOpen={true}
          onClose={() => setSelectedScholarship(null)}
          isSaved={savedIds.includes(selectedScholarship.id)}
          onToggleSave={() => handleToggleSave(selectedScholarship.id)}
        />
      )}
    </div>
  );
}
