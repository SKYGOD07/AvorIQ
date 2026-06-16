"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Code, Briefcase, Globe, Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteContent } from "../data/siteContent";

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname?.startsWith("/chat")) {
    return null;
  }

  return (
    <footer className="bg-background border-t-3 border-foreground pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 border-2 border-foreground flex items-center justify-center bg-bauhaus-red">
                <Image src="/logo.svg" alt="AvorIQ" width={20} height={20} className="invert" />
              </div>
              <span className="font-black text-lg uppercase tracking-wider text-foreground">
                AVOR<span className="text-bauhaus-red">IQ</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              {siteContent.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-black text-[10px] uppercase tracking-widest mb-4 border-b-2 border-bauhaus-red pb-2 inline-block">Navigation</h3>
            <ul className="space-y-2.5">
              {siteContent.navLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-500 hover:text-bauhaus-red text-sm font-bold uppercase tracking-wider transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-black text-[10px] uppercase tracking-widest mb-4 border-b-2 border-bauhaus-red pb-2 inline-block">Contact</h3>
            <ul className="space-y-2.5">
              <li className="text-slate-500 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4 text-bauhaus-red" />
                <span>{siteContent.footer.email}</span>
              </li>
              <li className="text-slate-500 text-sm">
                {siteContent.footer.location}
              </li>
            </ul>
            <div className="flex space-x-2 mt-4">
              <a href="#" className="p-2 border-2 border-[#333] text-slate-500 hover:text-foreground hover:border-foreground transition-all" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 border-2 border-[#333] text-slate-500 hover:text-foreground hover:border-foreground transition-all" aria-label="LinkedIn">
                <Briefcase className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 border-2 border-[#333] text-slate-500 hover:text-foreground hover:border-foreground transition-all" aria-label="GitHub">
                <Code className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-foreground font-black text-[10px] uppercase tracking-widest mb-4 border-b-2 border-bauhaus-yellow pb-2 inline-block">Waitlist</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              {siteContent.footer.newsletterDesc}
            </p>
            <div className="flex gap-0">
              <input
                type="email"
                placeholder="EMAIL"
                className="w-full px-3 py-2.5 text-sm font-bold uppercase tracking-wider bg-surface border-2 border-[#333] border-r-0 text-foreground focus:outline-none focus:border-bauhaus-red placeholder:text-slate-600"
              />
              <button className="px-4 py-2.5 bg-bauhaus-red text-white font-black text-xs uppercase tracking-widest border-2 border-bauhaus-red hover:bg-transparent hover:text-bauhaus-red transition-all cursor-pointer whitespace-nowrap">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t-2 border-[#333] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs font-bold uppercase tracking-wider">
            &copy; {new Date().getFullYear()} AVORIQ. ALL RIGHTS RESERVED. MADE WITH{" "}
            <Heart className="w-3.5 h-3.5 inline-block text-bauhaus-red fill-bauhaus-red mx-0.5" /> FOR INDIAN STUDENTS.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-600 hover:text-foreground text-xs font-bold uppercase tracking-wider transition-colors">
              Privacy
            </a>
            <a href="#" className="text-slate-600 hover:text-foreground text-xs font-bold uppercase tracking-wider transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
