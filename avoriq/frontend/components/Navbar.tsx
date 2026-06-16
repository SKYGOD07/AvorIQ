"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteContent } from "../data/siteContent";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-3 border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border-2 border-foreground flex items-center justify-center bg-bauhaus-red">
              <Image src="/logo.svg" alt="AvorIQ" width={20} height={20} className="invert" />
            </div>
            <span className="text-foreground font-black text-lg uppercase tracking-wider">
              AVOR<span className="text-bauhaus-red">IQ</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {siteContent.navLinks.map((link) => (
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
            <Link href="/login" className="hidden md:block">
              <button className="px-5 py-2 bg-bauhaus-red text-white text-[11px] font-black uppercase tracking-widest border-2 border-bauhaus-red hover:bg-transparent hover:text-bauhaus-red transition-all cursor-pointer">
                Join Now
              </button>
            </Link>

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
              {siteContent.navLinks.map((link) => (
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
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block mt-4 px-4 py-3 bg-bauhaus-red text-white text-sm font-black uppercase tracking-widest text-center border-2 border-bauhaus-red"
              >
                Join Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
