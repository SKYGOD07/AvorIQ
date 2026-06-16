"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Award, Layers, Users, Clock, GraduationCap, BookOpen, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedContent from "../components/reactbits/AnimatedContent";
import CountUp from "../components/reactbits/CountUp";
import { Badge } from "../components/ui/Badge";

const stats = [
  { value: 1000, suffix: "+", label: "Scholarships", icon: Award },
  { value: 50, suffix: "+", label: "Categories", icon: Layers },
  { value: 6, suffix: "–PG", label: "Class Levels", icon: Users },
  { value: 24, suffix: "×7", label: "AI Support", icon: Clock },
];

const features = [
  {
    icon: <Target className="w-7 h-7" />,
    title: "Smart Matching",
    description: "AI-driven eligibility scoring matches your profile against 1000+ scholarships instantly.",
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Complete Database",
    description: "Government, private, NGO, and international scholarships — all verified and updated.",
  },
  {
    icon: <GraduationCap className="w-7 h-7" />,
    title: "Class 6 to PG",
    description: "Whether you're in middle school or postgrad, find opportunities designed for your level.",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Deadline Alerts",
    description: "Never miss an application window. Track, bookmark, and get reminded before dates pass.",
  }
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* ══ HERO SECTION ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-12 md:mt-20">
          {/* Left: Text */}
          <AnimatedContent distance={40} direction="vertical">
            <div>
              <Badge variant="red" className="mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Version 1.0 — Scholarship Intelligence</span>
              </Badge>

              {/* Bauhaus Giant Typography */}
              <h1 className="text-foreground font-black text-6xl sm:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight mb-2">
                FIND
              </h1>
              <h1 className="text-bauhaus-red font-black text-6xl sm:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight mb-2">
                YOUR
              </h1>
              <h1 className="text-foreground font-black text-6xl sm:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight">
                SCHOLARSHIP
              </h1>

              {/* Thick divider */}
              <div className="w-full h-[3px] bg-foreground my-8" />

              <p className="text-slate-400 text-lg leading-relaxed max-w-lg mb-10">
                AvorIQ helps Indian students discover scholarships they actually qualify for before deadlines pass. Answer a few questions → get tailored matches instantly.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="/scholarships">
                  <button className="px-8 py-4 bg-bauhaus-red text-white font-black text-sm uppercase tracking-widest border-2 border-bauhaus-red brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#D92A2A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer flex items-center gap-3">
                    Explore System
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>

                <Link href="/chat">
                  <button className="px-8 py-4 bg-transparent text-foreground font-black text-sm uppercase tracking-widest border-2 border-foreground hover:bg-foreground hover:text-background transition-all cursor-pointer">
                    Try AI Chat
                  </button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-accent-emerald" />
                  Verified Sources
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-accent-emerald" />
                  No Account Needed
                </span>
              </div>
            </div>
          </AnimatedContent>

          {/* Right: Bauhaus Geometric Composition */}
          <AnimatedContent distance={40} direction="vertical" delay={0.2}>
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main rectangle — Red */}
              <div className="absolute top-0 right-0 w-[85%] h-[45%] bg-bauhaus-red border-3 border-black" />
              
              {/* White block */}
              <div className="absolute bottom-[10%] left-[10%] w-[45%] h-[50%] bg-foreground border-3 border-black" />
              
              {/* Yellow block */}
              <div className="absolute bottom-[10%] right-0 w-[40%] h-[50%] bg-bauhaus-yellow border-3 border-black" />
              
              {/* Circle overlay — dark gray */}
              <div className="absolute top-[30%] right-[20%] w-[40%] aspect-square rounded-full bg-surface-3 border-3 border-black z-10" />
              
              {/* Small accent square */}
              <div className="absolute top-[5%] left-0 w-16 h-16 bg-bauhaus-yellow border-3 border-black" />

              {/* Outer frame */}
              <div className="absolute inset-[8%] border-3 border-black pointer-events-none" />

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 z-20">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Form Follows Function
                </span>
              </div>
            </div>
          </AnimatedContent>
        </div>

        {/* ══ STATS BAR ══ */}
        <div className="mt-32">
          <AnimatedContent distance={40} direction="vertical">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-2 border-[#333]">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className={`text-center p-8 group ${index < 3 ? "border-r-2 border-[#333]" : ""} ${index < 2 ? "md:border-b-0 border-b-2 md:border-b-0 border-[#333]" : ""}`}
                  >
                    <Icon className="w-6 h-6 text-bauhaus-red mx-auto mb-3" />
                    <div className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                      <CountUp to={stat.value} />{stat.suffix}
                    </div>
                    <div className="text-slate-500 text-[10px] uppercase tracking-widest mt-2 font-bold">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedContent>
        </div>

        {/* ══ FEATURES GRID ══ */}
        <div className="mt-32">
          <AnimatedContent distance={40} direction="vertical">
            <div className="mb-12">
              <span className="text-bauhaus-red text-[10px] font-black uppercase tracking-[0.3em] block mb-4">Why AvorIQ</span>
              <h3 className="text-foreground text-3xl sm:text-4xl font-black uppercase tracking-tight">
                INTELLIGENT<br />
                <span className="text-bauhaus-red">SCHOLARSHIP</span> DISCOVERY
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="p-6 border-2 border-[#333] hover:border-bauhaus-red hover:shadow-[4px_4px_0px_0px_#D92A2A] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all group cursor-pointer"
                >
                  <div className="mb-4 text-slate-500 group-hover:text-bauhaus-red transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-foreground mb-2">{feature.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </div>
    </div>
  );
}
