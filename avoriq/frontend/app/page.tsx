"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Award, Layers, Users, Clock, GraduationCap, BookOpen, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Aurora from "../components/reactbits/Aurora";
import StarBorder from "../components/reactbits/StarBorder";
import ShinyText from "../components/reactbits/ShinyText";
import AnimatedContent from "../components/reactbits/AnimatedContent";
import CountUp from "../components/reactbits/CountUp";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

const stats = [
  { value: 1000, suffix: "+", label: "Scholarships Indexed", icon: Award },
  { value: 50, suffix: "+", label: "Categories Covered", icon: Layers },
  { value: 6, suffix: "–PG", label: "Class Levels", icon: Users },
  { value: 24, suffix: "×7", label: "AI Guidance", icon: Clock },
];

const features = [
  {
    icon: <Target className="w-6 h-6 text-terracotta" />,
    title: "Smart Matching",
    description: "AI-driven eligibility scoring matches your profile against 1000+ scholarships instantly."
  },
  {
    icon: <BookOpen className="w-6 h-6 text-violet" />,
    title: "Complete Database",
    description: "Government, private, NGO, and international scholarships — all verified and updated."
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-accent-emerald" />,
    title: "Class 6 to PG",
    description: "Whether you're in middle school or postgrad, find opportunities designed for your level."
  },
  {
    icon: <Zap className="w-6 h-6 text-accent-amber" />,
    title: "Deadline Alerts",
    description: "Never miss an application window. Track, bookmark, and get reminded before dates pass."
  }
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background selection:bg-terracotta/20">
      {/* Background Aurora */}
      <div className="absolute inset-0 -z-10 opacity-25">
        <Aurora colorStops={["#E8715A", "#A78BFA", "#1A1A1A"]} amplitude={1.0} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-24">
          <AnimatedContent distance={40} direction="vertical">
            {/* Version Badge */}
            <Badge variant="outline" className="mb-8 px-4 py-1.5 backdrop-blur-md bg-white/5 border-white/10 gap-2">
              <Sparkles className="w-4 h-4 text-terracotta" />
              <span className="tracking-wide font-mono text-[11px] uppercase">Version 1.0 — Scholarship Intelligence</span>
            </Badge>

            {/* Editorial Headline */}
            <h1 className="text-white font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-4 max-w-5xl mx-auto">
              Find Scholarships
            </h1>
            <h2 className="heading-editorial text-5xl sm:text-7xl lg:text-8xl mb-8 max-w-4xl mx-auto">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta via-terracotta-light to-violet">
                Meant For You.
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed mb-12">
              AvorIQ helps Indian students discover scholarships they actually qualify for before deadlines pass. Answer a few questions → get tailored matches instantly.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/scholarships">
                <StarBorder as="div" color="#E8715A" className="w-full sm:w-auto rounded-2xl">
                  <button className="w-full sm:w-64 px-8 py-4 bg-surface/80 backdrop-blur-xl hover:bg-surface transition-all text-white text-lg font-bold flex items-center justify-center gap-3 cursor-pointer rounded-xl">
                    <span>Explore Scholarships</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </StarBorder>
              </Link>
              
              <Link href="/chat">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md text-white text-lg font-semibold rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Try AI Chat
                </motion.button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                Verified official sources only
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                No account needed to start
              </span>
            </div>

            <div className="mt-4">
              <ShinyText text="Free to use. 1000+ scholarships indexed." speed={3} className="text-sm font-medium text-slate-500" />
            </div>
          </AnimatedContent>
        </div>

        {/* Stats Bar */}
        <div className="mt-32">
          <AnimatedContent distance={40} direction="vertical" className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8 border-t border-white/5">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
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
            </div>
          </AnimatedContent>
        </div>

        {/* Features Grid */}
        <div className="mt-32">
          <AnimatedContent distance={40} direction="vertical" className="w-full">
            <div className="text-center mb-12">
              <span className="text-terracotta text-xs font-bold uppercase tracking-wider font-mono">Why AvorIQ</span>
              <h3 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
                Intelligent Scholarship <span className="heading-editorial text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-violet">Discovery</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full bg-surface/40 border-white/5 hover:border-terracotta/20 hover:bg-surface/60 transition-colors group">
                    <CardContent className="p-6 flex flex-col items-start text-left">
                      <div className="mb-4 p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatedContent>
        </div>
        
        {/* Showcase Chat Mockup */}
        <div className="mt-32 relative mx-auto max-w-5xl">
          <AnimatedContent distance={40} direction="vertical">
            <div className="relative rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-md p-2 shadow-2xl overflow-hidden aspect-video">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
              <div className="w-full h-full rounded-xl bg-[#1e1e1e] border border-white/5 flex flex-col">
                {/* Mockup Header */}
                <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-terracotta/80"></div>
                  <div className="w-3 h-3 rounded-full bg-accent-amber/80"></div>
                  <div className="w-3 h-3 rounded-full bg-accent-emerald/80"></div>
                  <div className="mx-auto text-xs text-slate-500 font-mono">avoriq.ai</div>
                </div>
                {/* Mockup Body */}
                <div className="flex-1 p-6 flex flex-col gap-4 overflow-hidden relative">
                   <div className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-terracotta to-violet flex-shrink-0"></div>
                     <div className="space-y-2 flex-1">
                       <div className="h-4 bg-white/10 rounded w-1/4"></div>
                       <div className="h-4 bg-white/5 rounded w-3/4"></div>
                       <div className="h-4 bg-white/5 rounded w-2/4"></div>
                     </div>
                   </div>
                   <div className="flex items-start gap-4 justify-end mt-4">
                     <div className="space-y-2 flex-1 items-end flex flex-col">
                       <div className="h-10 bg-terracotta/10 rounded-xl w-2/3 border border-terracotta/20"></div>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-surface-3 flex-shrink-0"></div>
                   </div>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </div>
  );
}
