import Link from "next/link";
import { GraduationCap, Mail, Code, Briefcase, Globe, Heart } from "lucide-react";
import { siteContent } from "../data/siteContent";

export default function Footer() {
  return (
    <footer className="bg-navy-deep border-t border-white/5 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white/[0.02] border border-white/10 flex items-center justify-center">
                <img src="/logo.png" alt="AvorIQ Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-lg text-white">
                Avor<span className="text-accent-purple">IQ</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {siteContent.footer.description}
            </p>
            <p className="text-slate-400 text-sm font-medium italic">
              {siteContent.footer.slogan}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Navigation</h3>
            <ul className="space-y-2.5">
              {siteContent.navLinks.filter(link => link.name !== 'How It Works').map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link.name === 'Scholarships' ? 'Find Scholarships' : link.name === 'About' ? 'About Us' : link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Get in Touch</h3>
            <ul className="space-y-2.5">
              <li className="text-slate-400 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-blue" />
                <span>{siteContent.footer.email}</span>
              </li>
              <li className="text-slate-400 text-sm">
                {siteContent.footer.location}
              </li>
            </ul>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all" aria-label="Twitter">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all" aria-label="LinkedIn">
                <Briefcase className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all" aria-label="GitHub">
                <Code className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter / Mock CTA */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">{siteContent.footer.newsletterTitle}</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              {siteContent.footer.newsletterDesc}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 text-sm rounded-lg glass-input text-white focus:outline-none"
              />
              <button className="px-3 py-2 bg-accent-blue text-white rounded-lg text-sm font-semibold hover:bg-accent-blue/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} AvorIQ. All rights reserved. Made with{" "}
            <Heart className="w-3.5 h-3.5 inline-block text-rose-500 fill-rose-500 mx-0.5" /> for Indian students.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-500 hover:text-slate-400 text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-400 text-xs transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
