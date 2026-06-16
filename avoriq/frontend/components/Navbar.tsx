"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "../data/siteContent";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Button } from "./ui";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [authToken, setAuthToken] = useLocalStorage<string | null>("avoriq_auth_token", null);

  // Instead of an effect, compute this during render
  const showNavbar = !pathname?.startsWith("/chat");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showNavbar) {
    return null;
  }

  const navLinks = siteContent.navLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full pt-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div
        className={`
          mx-auto max-w-5xl rounded-full transition-all duration-300 pointer-events-auto
          flex items-center justify-between px-4 sm:px-6 h-14 md:h-16
          ${scrolled
            ? "bg-surface/70 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20"
            : "bg-transparent border border-transparent"
          }
        `}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="AvorIQ Home">
          <div className="relative w-7 h-7 md:w-8 md:h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.svg"
              alt="AvorIQ Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(232,113,90,0.5)]"
              priority
            />
          </div>
          <span className="hidden sm:block font-bold text-lg md:text-xl tracking-tight text-white flex items-baseline">
            Avor<span className="text-terracotta">IQ</span>
          </span>
        </Link>

        {/* Desktop Nav Links - Centered */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href.startsWith("/#") && pathname === "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  relative px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "text-white bg-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                  }
                `}
                aria-current={isActive ? "page" : undefined}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* CTA / Auth Button - Right aligned */}
        <div className="flex items-center gap-2 md:gap-3">
          {authToken ? (
            <>
              <Link href="/scholarships" className="hidden sm:inline-flex">
                <Button variant="ghost" size="sm" className="rounded-full">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full"
                leftIcon={<LogOut className="w-4 h-4" />}
                onClick={() => setAuthToken(null)}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/scholarships" className="hidden sm:block">
              <Button
                variant="primary"
                size="sm"
                className="rounded-full"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Get Started
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-4 right-4 z-40 bg-surface/95 border border-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
          >
            <div className="px-4 py-6">
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="space-y-1"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      block px-4 py-3 rounded-xl text-base font-medium transition-all
                      ${pathname === link.href
                        ? "text-white bg-white/10"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.nav>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                {authToken ? (
                  <>
                    <Link href="/scholarships" onClick={() => setIsOpen(false)} className="block">
                      <Button variant="secondary" size="lg" fullWidth className="rounded-xl">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="lg"
                      fullWidth
                      className="rounded-xl"
                      leftIcon={<LogOut className="w-4 h-4" />}
                      onClick={() => {
                        setAuthToken(null);
                        setIsOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/scholarships" onClick={() => setIsOpen(false)} className="block">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      className="rounded-xl"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Get Started
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
