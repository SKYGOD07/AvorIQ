import { BookOpen, Compass, GraduationCap, MessageSquare, ShieldCheck, Users, Zap } from "lucide-react";

export const siteContent = {
  navLinks: [
    { name: "Home", href: "/" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About", href: "/about" },
    { name: "Coming Soon", href: "/coming-soon" },
  ],
  hero: {
    tagline: "AI-Powered Opportunity Intelligence",
    headingLine1: "Find Scholarships",
    headingLine2: "Meant For You.",
    description: "AvorIQ helps Indian students discover scholarships they actually qualify for before deadlines pass. No more manual searching on outdated sites.",
    primaryCta: "Explore Scholarships",
    secondaryCta: "Watch Demo",
  },
  stats: [
    { value: "1,000+", label: "Scholarships Indexed" },
    { value: "50+", label: "Categories Covered" },
    { value: "Class 6 to PG", label: "Academic Coverage" },
    { value: "24×7", label: "AI Match Guidance" },
  ],
  howItWorks: {
    badge: "Simplified Pipeline",
    title: "How AvorIQ Works",
    description: "Discovering and applying for student aid is now simplified down to three streamlined steps.",
    steps: [
      {
        num: "01",
        title: "Tell Us About Yourself",
        desc: "Input your academic level, family income, state domicile, and social category in our simple Finder form.",
        icon: Users,
      },
      {
        num: "02",
        title: "Instant AI Matching",
        desc: "Our engine scans hundreds of options to find the specific scholarships you are 100% eligible for.",
        icon: Zap,
      },
      {
        num: "03",
        title: "Never Miss a Deadline",
        desc: "Save your favorite scholarships, monitor deadline status, and get notifications when portals open.",
        icon: ShieldCheck,
      },
    ]
  },
  aboutPreview: {
    badge: "Our Mission",
    title: "Ensuring No Student Misses Opportunities Due to Lack of Information.",
    paragraphs: [
      "Hundreds of crores of scholarship funds lapse every year in India simply because deserving students in Tier-2/3 cities and rural villages are unaware they qualify, or fail to complete complex applications before deadlines.",
      "AvorIQ is built to bridge this gap. Starting with our Scholarship Intelligence Platform, we aggregate, translate, and match verified opportunities specifically to your academic profile."
    ],
    cta: "Read the Full Story",
    highlights: [
      { title: "Accessibility", desc: "Available for Class 6 to Graduation anywhere." },
      { title: "Trust", desc: "Directly linking only to verified official platforms." },
      { title: "Equity", desc: "Prioritizing support for low-income backgrounds." },
      { title: "Empowerment", desc: "Helping you finance your educational dreams." }
    ]
  },
  comingSoon: {
    badge: "Future Roadmap",
    title: "Next-Gen Modules Coming Soon",
    description: "AvorIQ will soon expand into a complete AI educational companion for student life. Here's what we are building next.",
    cta: "View Full Coming Soon Roadmap",
    modules: [
      {
        title: "AI Study Planner",
        desc: "Generate personalized study schedules tailored to your exams and learning habits.",
        icon: BookOpen,
      },
      {
        title: "Career Guidance",
        desc: "Input your interests to receive step-by-step career path roadmaps and skill requirements.",
        icon: Compass,
      },
      {
        title: "WhatsApp Chatbot",
        desc: "Get scholarship alerts and ask questions directly from your phone on WhatsApp.",
        icon: MessageSquare,
      },
    ]
  },
  footer: {
    description: "Adaptive Vision for Opportunity and Resources Intelligence Quotient.",
    slogan: "\"Built for students. Designed for opportunity.\"",
    email: "support@avoriq.in",
    location: "Based in Madhya Pradesh, India.",
    newsletterTitle: "Subscribe to Deadlines",
    newsletterDesc: "Get notified of matching national & private scholarships directly in your inbox before deadlines close.",
  }
} as const;
