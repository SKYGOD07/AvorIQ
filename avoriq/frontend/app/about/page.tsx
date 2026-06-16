"use client";

import { Award, Compass, ShieldCheck, Heart, Users, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedContent from "../../components/reactbits/AnimatedContent";

export default function AboutPage() {
  const values = [
    {
      title: "Accessibility",
      desc: "Providing equal opportunity details for students in rural villages and metropolitan cities alike. Available 24/7 on web and mobile.",
      icon: Users,
    },
    {
      title: "Trust",
      desc: "Aggregating only officially verified opportunities. We link directly to official board domains (.gov.in, CSR trust portals).",
      icon: ShieldCheck,
    },
    {
      title: "Equity",
      desc: "Building specialized matching boosts for low-income families, minority groups, differently-abled students, and girls in STEM.",
      icon: Heart,
    },
    {
      title: "Empowerment",
      desc: "Removing financial barriers so students can continue secondary school, diploma streams, and professional UG/PG courses.",
      icon: Award,
    },
    {
      title: "Innovation",
      desc: "Applying cutting-edge client matching and cognitive RAG processes to turn complex, fragmented data into structured action.",
      icon: Compass,
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        
        {/* Intro Story */}
        <AnimatedContent distance={40} direction="vertical">
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <span className="text-terracotta text-xs font-bold uppercase tracking-wider block font-mono">
            Who We Are
          </span>
          <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight">
            About Avor<span className="text-terracotta">IQ</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            AvorIQ stands for <strong className="text-slate-300">Adaptive Vision for Opportunity and Resources Intelligence Quotient</strong>. 
            We are an AI-powered education companion designed specifically for Indian students from Class 6 to Graduation.
          </p>
        </section>
        </AnimatedContent>

        {/* Mission & Vision Section */}
        <AnimatedContent distance={40} direction="vertical" delay={0.1}>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-terracotta/5 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-white text-xl font-bold flex items-center gap-2">
              <span className="text-terracotta">🎯</span> Our Mission
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              To ensure no deserving Indian student misses educational opportunities because of lack of information. 
              We want to democratize access to financial support, helping students cross secondary school and graduation lines without debt or dropouts.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet/5 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-white text-xl font-bold flex items-center gap-2">
              <span className="text-violet">👁</span> Our Vision
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              To serve as an AI companion for every Indian student from Class 6 to Graduation. Today, we assist you in discovering scholarships effortlessly. 
              Tomorrow, we will guide every aspect of your educational journey—from career roadmaps to adaptive learning plans.
            </p>
          </div>
        </section>
        </AnimatedContent>

        {/* Core Values Section */}
        <AnimatedContent distance={40} direction="vertical" delay={0.2}>
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-white text-2xl sm:text-3xl font-extrabold">
              Our Core <span className="heading-editorial text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-violet">Values</span>
            </h2>
            <p className="text-slate-400 text-sm">
              The fundamental principles guiding how we compile, match, and present opportunities to Indian students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const ValueIcon = v.icon;
              return (
                <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-terracotta group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                    <ValueIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-base">{v.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
        </AnimatedContent>

        {/* Final CTA */}
        <AnimatedContent distance={40} direction="vertical" delay={0.3}>
        <section className="glass-panel p-8 md:p-12 rounded-3xl text-center space-y-6 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-terracotta/8 to-violet/8 pointer-events-none" />
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white mx-auto">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-white text-2xl md:text-3xl font-extrabold max-w-lg mx-auto">
            Ready to find your matching scholarships?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            Spend 2 minutes filling in your profile and see instantly which national, state, and corporate programs are waiting for you.
          </p>
          <div className="pt-2">
            <Link href="/scholarships">
              <button className="px-8 py-3.5 bg-gradient-to-r from-terracotta to-violet text-white text-sm font-bold rounded-xl shadow-lg hover:opacity-95 flex items-center gap-2 mx-auto cursor-pointer">
                <span>Start Match Engine</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </Link>
          </div>
        </section>
        </AnimatedContent>

      </div>
    </div>
  );
}
