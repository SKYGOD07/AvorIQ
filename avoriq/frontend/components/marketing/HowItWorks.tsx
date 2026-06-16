"use client";

import { User, Sparkles, Bell, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "../ui";
import { Button } from "../ui";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Tell Us About Yourself",
    description: "Fill a 2-minute profile: your class level, state, family income, category, field of study, and scholarship preferences.",
    icon: User,
    color: "from-terracotta to-violet",
    details: [
      "Class level (Class 6 to Postgrad)",
      "State & domicile",
      "Family income bracket",
      "Category (General/OBC/SC/ST/EWS)",
      "Field of study & interests",
    ],
  },
  {
    num: "02",
    title: "Discover Matching Scholarships",
    description: "Our intelligent engine matches your profile against 1000+ verified scholarships from government, private, NGO, and international sources.",
    icon: Sparkles,
    color: "from-violet to-accent-emerald",
    details: [
      "Real-time eligibility scoring",
      "Ranked by match % & deadline",
      "Filter by category, amount, level",
      "Save favorites to your dashboard",
      "Export results for reference",
    ],
  },
  {
    num: "03",
    title: "Never Miss an Opportunity",
    description: "Track deadlines, manage documents, and get reminded before dates pass. Simulate your application pipeline from saved to disbursed.",
    icon: Bell,
    color: "from-accent-emerald to-terracotta",
    details: [
      "Deadline countdown & alerts",
      "Document checklist per scholarship",
      "Application progress tracker",
      "Saved scholarships dashboard",
      "Weekly digest email (coming soon)",
    ],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <span className="text-terracotta text-xs font-bold uppercase tracking-wider block mb-4 font-mono">
            How It Works
          </span>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
            Three Steps to Your{" "}
          </h2>
          <span className="heading-editorial text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-violet">
            Scholarships
          </span>
          <p className="text-slate-400 text-lg leading-relaxed mt-6">
            From profile to payout — AvorIQ guides you through the entire scholarship journey with intelligent matching and deadline tracking.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-20 left-1/2 w-0.5 h-[calc(100%-5rem)] bg-gradient-to-b from-terracotta/30 via-violet/30 to-accent-emerald/30 -translate-x-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Step Card */}
                  <Card variant="glass" hover padding="lg" className="h-full relative overflow-hidden">
                    {/* Number Badge */}
                    <div className="absolute -top-4 left-6">
                      <span className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl font-extrabold text-white text-lg bg-gradient-to-br ${step.color} shadow-lg shadow-terracotta/15`}>
                        {step.num}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative">
                      <Icon className="w-7 h-7 text-terracotta" />
                    </div>

                    {/* Content */}
                    <h3 className="text-white text-xl font-bold mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <ul className="space-y-3 mb-8">
                      {step.details.map((detail, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                          className="flex items-center gap-3 text-slate-300 text-sm"
                        >
                          <div className="w-5 h-5 rounded-lg bg-terracotta/15 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </Card>

                  {/* Step Indicator Dot on Line (desktop) */}
                  <div className="hidden lg:block absolute left-1/2 top-20 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background bg-gradient-to-br z-20" style={{ background: step.color }} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 md:mt-20"
        >
          <Link href="/scholarships">
            <Button variant="gradient" size="xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Start Finding Scholarships
            </Button>
          </Link>
          <p className="text-slate-500 text-sm mt-4">
            Takes 2 minutes. No account required. 1000+ scholarships indexed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}