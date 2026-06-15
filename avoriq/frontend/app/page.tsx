"use client";

import Link from "next/link";
import { ArrowRight, Play, Sparkles, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { siteContent } from "../data/siteContent";

// React Bits Components
import Aurora from "../components/reactbits/Aurora";
import SpotlightCard from "../components/reactbits/SpotlightCard";
import GradientText from "../components/reactbits/GradientText";
import CountUp from "../components/reactbits/CountUp";
import AnimatedContent from "../components/reactbits/AnimatedContent";
import StarBorder from "../components/reactbits/StarBorder";
import ShinyText from "../components/reactbits/ShinyText";
import Stepper from "../components/reactbits/Stepper";

export default function LandingPage() {
  const [showDemo, setShowDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  const handleWatchDemo = () => {
    setShowDemo(true);
    setDemoStep(0);
  };

  const handleNextDemoStep = () => {
    if (demoStep < 2) {
      setDemoStep(demoStep + 1);
    } else {
      setShowDemo(false);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="relative overflow-hidden pt-20">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Animated Aurora Background specifically for Hero */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <Aurora colorStops={["#2563EB", "#7C3AED", "#10B981"]} amplitude={1.2} />
        </div>

        {/* Hero Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl text-left space-y-6 lg:w-1/2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{siteContent.hero.tagline}</span>
          </div>

          <h1 className="text-white font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.1]">
            {siteContent.hero.headingLine1} <br />
            <GradientText colors={["#3B82F6", "#8B5CF6", "#EC4899", "#3B82F6"]} animationSpeed={6} className="!text-5xl sm:!text-6xl lg:!text-7xl !font-extrabold !justify-start !mx-0">
              {siteContent.hero.headingLine2}
            </GradientText>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl leading-relaxed">
            {siteContent.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link href="/scholarships" className="w-full sm:w-auto block">
              <StarBorder as="div" color="#2563EB" className="w-full">
                <button className="w-full px-8 py-4 bg-navy-card/50 hover:bg-navy-card/80 transition-colors text-white text-base font-bold flex items-center justify-center gap-2 cursor-pointer">
                  <span>{siteContent.hero.primaryCta}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </StarBorder>
            </Link>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWatchDemo}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/5 hover:bg-white/10 text-white text-base font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 text-accent-purple fill-accent-purple" />
              <span>{siteContent.hero.secondaryCta}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Right Visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative lg:w-1/2 flex justify-center w-full"
        >
          {/* Main Visual Card Mock */}
          <div className="w-[85%] sm:w-[380px] h-[340px] rounded-3xl bg-gradient-to-tr from-accent-purple/10 to-accent-blue/10 border border-white/10 p-6 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute inset-0 bg-navy-card/85 backdrop-blur-xl rounded-3xl -z-10" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-blue/20 flex items-center justify-center text-accent-blue">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-white text-sm font-bold block">AvorIQ Match Dashboard</span>
                <span className="text-slate-500 text-2xs uppercase tracking-wider font-bold">Client Profiler</span>
              </div>
            </div>

            <div className="space-y-4 my-6">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-xs block">National Eligibility</span>
                  <span className="text-white text-sm font-bold">Government of India</span>
                </div>
                <span className="text-emerald-400 text-xs font-bold px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/25 rounded-md">
                  98% Match
                </span>
              </div>

              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-xs block">Next Deadline</span>
                  <span className="text-white text-sm font-bold">Ending in 12 Days</span>
                </div>
                <span className="text-amber-400 text-xs font-bold px-2 py-0.5 bg-amber-500/10 border border-amber-500/25 rounded-md">
                  Open
                </span>
              </div>
            </div>

            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: ["0%", "98%", "98%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                className="h-full bg-gradient-to-r from-accent-blue to-accent-purple"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <AnimatedContent distance={30} direction="vertical" delay={0.2}>
        <section className="relative z-10 border-y border-white/5 bg-navy-card/45 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {siteContent.stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <span className="block text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                    {index === 0 ? <CountUp to={1000} suffix="+" separator="," /> :
                     index === 1 ? <CountUp to={50} suffix="+" /> :
                     stat.value}
                  </span>
                  <span className="block text-slate-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedContent>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 scroll-mt-20">
        <AnimatedContent distance={40} direction="vertical">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-accent-purple text-xs font-bold uppercase tracking-wider block">{siteContent.howItWorks.badge}</span>
            <h2 className="text-white text-3xl font-extrabold sm:text-4xl">{siteContent.howItWorks.title}</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              {siteContent.howItWorks.description}
            </p>
          </div>
        </AnimatedContent>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteContent.howItWorks.steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <AnimatedContent key={index} distance={30} direction="vertical" delay={index * 0.15}>
                <SpotlightCard className="h-full p-8 group transition-all duration-300">
                  <div className="absolute top-6 right-6 text-6xl font-extrabold text-white/[0.02] group-hover:text-accent-purple/10 transition-colors duration-300 select-none font-mono z-0">
                    {step.num}
                  </div>
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue flex items-center justify-center mb-6 group-hover:bg-accent-blue group-hover:text-white transition-all duration-300">
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <h3 className="relative z-10 text-white text-lg font-bold mb-3">{step.title}</h3>
                  <p className="relative z-10 text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </SpotlightCard>
              </AnimatedContent>
            );
          })}
        </div>
      </section>

      {/* About Preview Section */}
      <AnimatedContent distance={40} direction="vertical">
        <section className="relative z-10 bg-navy-card/30 border-y border-white/5 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <span className="text-accent-blue text-xs font-bold uppercase tracking-wider block">{siteContent.aboutPreview.badge}</span>
              <h2 className="text-white text-3xl font-extrabold sm:text-4xl">
                {siteContent.aboutPreview.title}
              </h2>
              {siteContent.aboutPreview.paragraphs.map((para, i) => (
                <p key={i} className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {para}
                </p>
              ))}
              <div className="pt-2">
                <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-accent-blue hover:text-accent-purple transition-colors">
                  <span>{siteContent.aboutPreview.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
              {siteContent.aboutPreview.highlights.map((v, i) => (
                <SpotlightCard key={i} spotlightColor="rgba(37, 99, 235, 0.15)" className="p-5 space-y-1.5">
                  <h4 className="text-white font-bold text-sm">{v.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{v.desc}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>
      </AnimatedContent>

      {/* Coming Soon Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <AnimatedContent distance={40} direction="vertical">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-accent-purple text-xs font-bold uppercase tracking-wider block">{siteContent.comingSoon.badge}</span>
            <h2 className="text-white text-3xl font-extrabold">{siteContent.comingSoon.title}</h2>
            <p className="text-slate-400 text-sm">
              {siteContent.comingSoon.description}
            </p>
          </div>
        </AnimatedContent>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {siteContent.comingSoon.modules.map((p, i) => (
            <AnimatedContent key={i} distance={30} direction="vertical" delay={i * 0.1}>
              <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent-purple/10 rounded-full blur-xl group-hover:bg-accent-purple/20 transition-all pointer-events-none" />
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-accent-purple relative z-10">
                  <p.icon className="w-5 h-5" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-white font-semibold text-base mb-1">{p.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
                </div>
                <span className="inline-block px-2.5 py-0.5 border border-accent-purple/20 bg-accent-purple/10 rounded-full relative z-10">
                  <ShinyText text="Coming Soon" speed={4} className="text-[10px] font-bold tracking-wider uppercase text-accent-purple" />
                </span>
              </div>
            </AnimatedContent>
          ))}
        </div>

        <div className="text-center">
          <Link href="/coming-soon">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/25 text-white text-sm font-semibold transition-all cursor-pointer"
            >
              {siteContent.comingSoon.cta}
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Demo Modal Simulator */}
      <AnimatePresence>
        {showDemo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDemo(false)}
              className="absolute inset-0 bg-navy-deep/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-navy-card border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between h-[400px] z-10 overflow-hidden"
            >
              {/* Decorative gradient for modal */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent-blue via-accent-purple to-emerald-400" />

              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Sparkles className="w-4.5 h-4.5 text-accent-purple" />
                  AvorIQ Platform Walkthrough
                </h3>
                <button 
                  onClick={() => setShowDemo(false)}
                  className="p-1 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Stepper Component */}
              <div className="pt-6 px-4">
                <Stepper currentStep={demoStep} totalSteps={3} />
              </div>

              {/* Steps of Demo */}
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={demoStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center space-y-4"
                  >
                    {demoStep === 0 && (
                      <>
                        <div className="w-16 h-16 bg-accent-blue/15 text-accent-blue rounded-2xl flex items-center justify-center font-bold text-2xl shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                          1
                        </div>
                        <h4 className="text-white font-bold text-lg">Input Your Credentials</h4>
                        <p className="text-slate-400 text-sm max-w-md">
                          Answer a few basic academic and financial questions on our form. Your data is processed fully on the client for safety.
                        </p>
                      </>
                    )}
                    {demoStep === 1 && (
                      <>
                        <div className="w-16 h-16 bg-accent-purple/15 text-accent-purple rounded-2xl flex items-center justify-center font-bold text-2xl shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                          2
                        </div>
                        <h4 className="text-white font-bold text-lg">Scan Custom Matches</h4>
                        <p className="text-slate-400 text-sm max-w-md">
                          See instant eligibility scores (e.g. 98% Eligible) with custom breakdown cards mapping why you qualify.
                        </p>
                      </>
                    )}
                    {demoStep === 2 && (
                      <>
                        <div className="w-16 h-16 bg-emerald-500/15 text-emerald-400 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                          3
                        </div>
                        <h4 className="text-white font-bold text-lg">Simulate Application!</h4>
                        <p className="text-slate-400 text-sm max-w-md">
                          Open full details, review document requirements, click 'Apply Online' and secure your education funding.
                        </p>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-xs text-slate-500 font-medium">
                  Step {demoStep + 1} of 3
                </span>
                <button
                  onClick={handleNextDemoStep}
                  className="px-6 py-2.5 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-xl text-sm font-bold shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/40 transition-shadow"
                >
                  {demoStep === 2 ? "Finish Walkthrough" : "Next Step"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
