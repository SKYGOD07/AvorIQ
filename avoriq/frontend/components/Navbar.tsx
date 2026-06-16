"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import { siteContent } from "../data/siteContent";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user, userProfile, logout } = useAuth();

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-3 border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={user ? "/scholarships" : "/"} className="flex items-center gap-3 group">
            <div className="w-8 h-8 border-2 border-foreground flex items-center justify-center bg-bauhaus-red">
              <Image src="/logo.svg" alt="AvorIQ" width={20} height={20} className="invert" />
            </div>
            <span className="text-foreground font-black text-lg uppercase tracking-wider">
              AVOR<span className="text-bauhaus-red">IQ</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {siteContent.navLinks
              .filter((link) => !(user && link.href === "/"))
              .map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all border-2 ${
                    isActive(link.href)
                      ? "text-bauhaus-red border-bauhaus-red bg-bauhaus-red/5"
                      : "text-slate-400 border-transparent hover:text-foreground hover:border-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/chat">
                  <button className="px-5 py-2 bg-foreground text-background text-[11px] font-black uppercase tracking-widest border-2 border-foreground hover:bg-transparent hover:text-foreground transition-all cursor-pointer">
                    Go to Chat
                  </button>
                </Link>
                
                {/* Profile Badge Button - Redesigned to fit the Bauhaus design system */}
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-foreground bg-bauhaus-yellow text-black hover:bg-transparent hover:text-bauhaus-yellow transition-all cursor-pointer text-[11px] font-black uppercase tracking-widest"
                  title="View Profile"
                >
                  <div className="w-5 h-5 bg-black text-bauhaus-yellow flex items-center justify-center text-[10px] font-black shrink-0">
                    {user.displayName?.substring(0, 1) || user.email?.substring(0, 1).toUpperCase() || "U"}
                  </div>
                  <span>
                    Profile
                  </span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={() => logout()}
                  className="px-4 py-2 bg-bauhaus-red text-white text-[11px] font-black uppercase tracking-widest border-2 border-bauhaus-red hover:bg-transparent hover:text-bauhaus-red transition-all cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="hidden md:block">
                <button className="px-5 py-2 bg-bauhaus-red text-white text-[11px] font-black uppercase tracking-widest border-2 border-bauhaus-red hover:bg-transparent hover:text-bauhaus-red transition-all cursor-pointer">
                  Join Now
                </button>
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-foreground border-2 border-foreground hover:bg-foreground hover:text-background transition-all"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden border-t-2 border-[#333] bg-background overflow-hidden"
          >
            <div className="py-4 px-4 space-y-1">
              {siteContent.navLinks
                .filter((link) => !(user && link.href === "/"))
                .map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 text-sm font-black uppercase tracking-widest transition-all border-l-3 ${
                      isActive(link.href)
                        ? "text-bauhaus-red border-bauhaus-red bg-bauhaus-red/5"
                        : "text-slate-400 border-transparent hover:text-foreground hover:border-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              
              {user ? (
                <>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setShowProfileModal(true);
                    }}
                    className="w-full text-left block px-4 py-3 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-foreground border-l-3 border-transparent"
                  >
                    View Profile
                  </button>
                  <Link
                    href="/chat"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-foreground border-l-3 border-transparent"
                  >
                    Go to Chat
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      logout();
                    }}
                    className="w-full mt-4 px-4 py-3 bg-bauhaus-red text-white text-sm font-black uppercase tracking-widest text-center border-2 border-bauhaus-red cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block mt-4 px-4 py-3 bg-bauhaus-red text-white text-sm font-black uppercase tracking-widest text-center border-2 border-bauhaus-red"
                >
                  Join Now
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile Modal */}
      <AnimatePresence>
        {showProfileModal && user && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfileModal(false)}
              className="absolute inset-0 bg-black/85 z-40"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-surface border-3 border-foreground p-6 brutal-shadow-lg z-50 text-foreground"
            >
              <div className="flex items-center justify-between mb-6 border-b-2 border-[#333] pb-4">
                <h3 className="font-black text-lg uppercase tracking-wider text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-bauhaus-yellow" />
                  Your Profile
                </h3>
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="p-1 border-2 border-transparent hover:border-foreground text-slate-400 hover:text-foreground transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Fields */}
              <div className="space-y-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                <div className="p-3 bg-surface-2 border-2 border-[#333] flex justify-between items-center">
                  <span>Email</span>
                  <span className="text-foreground text-right truncate max-w-[200px]" title={user.email}>{user.email}</span>
                </div>
                
                {userProfile ? (
                  <>
                    <div className="p-3 bg-surface-2 border-2 border-[#333] flex justify-between items-center">
                      <span>Education Level</span>
                      <span className="text-foreground">{userProfile.educationLevel}</span>
                    </div>
                    <div className="p-3 bg-surface-2 border-2 border-[#333] flex justify-between items-center">
                      <span>Gender</span>
                      <span className="text-foreground">{userProfile.gender}</span>
                    </div>
                    <div className="p-3 bg-surface-2 border-2 border-[#333] flex justify-between items-center">
                      <span>State of Domicile</span>
                      <span className="text-foreground">{userProfile.state}</span>
                    </div>
                    <div className="p-3 bg-surface-2 border-2 border-[#333] flex justify-between items-center">
                      <span>Category / Caste</span>
                      <span className="text-foreground">{userProfile.caste}</span>
                    </div>
                    <div className="p-3 bg-surface-2 border-2 border-[#333] flex justify-between items-center">
                      <span>Family Income</span>
                      <span className="text-foreground">₹{userProfile.familyIncomeMax?.toLocaleString("en-IN")}</span>
                    </div>
                    {userProfile.collegeName && (
                      <div className="p-3 bg-surface-2 border-2 border-[#333] flex flex-col gap-1 items-start">
                        <span>College / University</span>
                        <span className="text-foreground text-left leading-normal">{userProfile.collegeName}</span>
                      </div>
                    )}
                    {userProfile.enrollmentNumber && (
                      <div className="p-3 bg-surface-2 border-2 border-[#333] flex justify-between items-center">
                        <span>Enrollment No</span>
                        <span className="text-foreground">{userProfile.enrollmentNumber}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-4 bg-bauhaus-yellow/5 border-2 border-bauhaus-yellow text-bauhaus-yellow text-center">
                    Profile questionnaire not completed yet.
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-8 pt-4 border-t-2 border-[#333] flex gap-3">
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    router.push("/questionnaire");
                  }}
                  className="flex-1 py-3 bg-bauhaus-yellow border-2 border-bauhaus-yellow text-black text-xs font-black uppercase tracking-widest hover:bg-transparent hover:text-bauhaus-yellow transition-all cursor-pointer brutal-shadow-sm active:translate-x-[1px] active:translate-y-[1px]"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    logout();
                  }}
                  className="flex-1 py-3 bg-bauhaus-red border-2 border-bauhaus-red text-white text-xs font-black uppercase tracking-widest hover:bg-transparent hover:text-bauhaus-red transition-all cursor-pointer brutal-shadow-sm active:translate-x-[1px] active:translate-y-[1px]"
                >
                  Logout
                </button>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-3 border-2 border-[#333] text-slate-400 hover:border-foreground hover:text-foreground text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
