"use client";

import { ArrowRight, Sparkles, Award, Layers, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui";
import Link from "next/link";
import CountUp from "../reactbits/CountUp";

const stats = [
  { value: 1000, suffix: "+", label: "Scholarships Indexed", icon: Award },
  { value: 50, suffix: "+", label: "Categories Covered", icon: Layers },
  { value: 6, suffix: "–PG", label: "Class Levels", icon: Users },
  { value: 24, suffix: "×7", label: "AI Guidance", icon: Clock },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/10 via-transparent to-violet/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terracotta/15 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet/15 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-accent-emerald/8 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "4s" }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.3, 0], scale: [0, 1, 0] }}
            transition={{ duration: 8 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-terracotta to-violet"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-8 max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-white/10"
          >
            <motion.span
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 text-terracotta"
            >
              <Sparkles className="w-4 h-4" />
            </motion.span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Version 1.0 — Scholarship Intelligence Module
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
              Find Scholarships
            </h1>
            <span className="heading-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-terracotta via-terracotta-light to-violet">
              Meant For You.
            </span>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-slate-400 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto"
          >
            AvorIQ helps Indian students discover scholarships they actually qualify for
            before deadlines pass. Answer a few questions → get tailored matches instantly.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/scholarships">
              <Button
                variant="gradient"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                Explore Scholarships
              </Button>
            </Link>
            <Link href="/#how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                How It Works
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
              Verified official sources only
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
              Government &amp; CSR portals
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
              No account needed to start
            </span>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12 pt-8 border-t border-white/5"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  className="text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl glass-panel flex items-center justify-center group-hover:bg-terracotta/10 group-hover:border-terracotta/30 transition-all duration-300">
                    <Icon className="w-6 h-6 text-terracotta" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    <CountUp to={stat.value} />{stat.suffix}
                  </div>
                  <div className="text-slate-500 text-xs sm:text-sm uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Floating Illustration Hint */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs"
        >
          <span className="uppercase tracking-wider font-mono">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-5 border-2 border-white/20 border-t-terracotta rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}