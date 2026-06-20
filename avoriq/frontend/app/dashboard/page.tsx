"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Award,
  GraduationCap,
  Compass,
  MessageSquare,
  ClipboardList,
  Flame,
  Target,
  TrendingUp,
  Brain,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Bookmark,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { mockScholarships } from "../../data/scholarships";

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Calculate profile calibration percentage */
function getCalibration(profile: any): number {
  if (!profile) return 0;
  const fields = [
    "name",
    "educationLevel",
    "gender",
    "familyIncomeMax",
    "state",
    "caste",
    "targetExam",
    "careerInterest",
  ];
  let filled = 0;
  for (const f of fields) {
    if (profile[f] !== undefined && profile[f] !== null && profile[f] !== "") filled++;
  }
  return Math.round((filled / fields.length) * 100);
}

/** Get color class for readiness score */
function getScoreColor(score: number): { ring: string; text: string; glow: string; bg: string } {
  if (score >= 70) return { ring: "#22C55E", text: "text-green-400", glow: "shadow-[0_0_40px_rgba(34,197,94,0.3)]", bg: "bg-green-500/10" };
  if (score >= 40) return { ring: "#EAB308", text: "text-yellow-400", glow: "shadow-[0_0_40px_rgba(234,179,8,0.3)]", bg: "bg-yellow-500/10" };
  return { ring: "#D92A2A", text: "text-red-400", glow: "shadow-[0_0_40px_rgba(217,42,42,0.3)]", bg: "bg-red-500/10" };
}

/** Get study data from localStorage or generate default zeros */
function getWeeklyStudyData(): number[] {
  if (typeof window === "undefined") return [0, 0, 0, 0, 0, 0, 0];
  const stored = localStorage.getItem("avoriq_weekly_study");
  if (stored) {
    try { return JSON.parse(stored); } catch { /* fall through */ }
  }
  return [0, 0, 0, 0, 0, 0, 0];
}

function getStudyStreak(): number {
  if (typeof window === "undefined") return 0;
  const stored = localStorage.getItem("avoriq_study_streak");
  if (stored) return parseInt(stored, 10) || 0;
  return 0;
}

/* ═══════════════════════════════════════════
   FEATURE MODULES
   ═══════════════════════════════════════════ */

const featureModules = [
  {
    id: "study-planner",
    title: "AI Study Planner",
    desc: "Adaptive roadmaps tailored to your target syllabus and exam timeline.",
    icon: Calendar,
    href: "/chat",
    color: "#22C55E",
    badge: "ACTIVE",
  },
  {
    id: "exam-prep",
    title: "Exam Prep Assistant",
    desc: "Mock papers, instant grading, and performance analytics.",
    icon: Award,
    href: "/chat",
    color: "#EAB308",
    badge: "ACTIVE",
  },
  {
    id: "scholarship-matcher",
    title: "Scholarship Matcher",
    desc: "AI-powered discovery for 1,000+ verified scholarships.",
    icon: GraduationCap,
    href: "/scholarships",
    color: "#D92A2A",
    badge: "ACTIVE",
  },
  {
    id: "career-navigator",
    title: "Career Navigator",
    desc: "Pathways from High School to Postgraduate with skills mapping.",
    icon: Compass,
    href: "/chat",
    color: "#8B5CF6",
    badge: "ACTIVE",
  },
  {
    id: "app-tracker",
    title: "Application Tracker",
    desc: "Track deadlines, auto-fill forms, and manage submissions.",
    icon: ClipboardList,
    href: "/chat",
    color: "#06B6D4",
    badge: "ACTIVE",
  },
  {
    id: "ai-chat",
    title: "AI Chat Assistant",
    desc: "Your personal AI companion for any academic question.",
    icon: MessageSquare,
    href: "/chat",
    color: "#F97316",
    badge: "ACTIVE",
  },
];

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

/** Animated Readiness Score Ring */
function ReadinessRing({ score, size = 200 }: { score: number; size?: number }) {
  const colors = getScoreColor(score);
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 200);
    return () => clearTimeout(timer);
  }, [score]);

  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${colors.glow} rounded-full`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1A1A1A"
          strokeWidth={strokeWidth}
        />
        {/* Animated score arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.ring}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-[1.5s] ease-out"
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={animatedScore}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`text-5xl font-black ${colors.text}`}
        >
          {animatedScore}
        </motion.span>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">
          Readiness
        </span>
      </div>
    </div>
  );
}

/** KPI Metric Card */
function MetricCard({
  icon: Icon,
  label,
  value,
  suffix,
  color,
  delay,
  onIncrement,
  onDecrement,
}: {
  icon: any;
  label: string;
  value: string | number;
  suffix?: string;
  color: string;
  delay: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="bg-surface border-2 border-[#333] p-5 relative group hover:border-foreground/40 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="p-2 border-2 border-[#333] group-hover:border-current transition-colors"
          style={{ color }}
        >
          <Icon className="w-4 h-4" />
        </div>
        {(onIncrement || onDecrement) ? (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onDecrement && (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDecrement(); }}
                className="w-5 h-5 flex items-center justify-center border border-[#333] bg-surface hover:bg-foreground hover:text-background text-[10px] font-black transition-all cursor-pointer select-none"
                title="Decrease"
              >
                -
              </button>
            )}
            {onIncrement && (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onIncrement(); }}
                className="w-5 h-5 flex items-center justify-center border border-[#333] bg-surface hover:bg-foreground hover:text-background text-[10px] font-black transition-all cursor-pointer select-none"
                title="Increase"
              >
                +
              </button>
            )}
          </div>
        ) : (
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
        )}
      </div>
      <div className="text-2xl font-black text-foreground">
        {value}
        {suffix && <span className="text-sm font-bold text-slate-500 ml-0.5">{suffix}</span>}
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">
        {label}
      </div>
    </motion.div>
  );
}

/** Feature Module Card */
function FeatureCard({
  module,
  delay,
}: {
  module: (typeof featureModules)[0];
  delay: number;
}) {
  const Icon = module.icon;
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link href={module.href} className="block group">
        <div className="bg-surface border-2 border-[#333] p-6 h-full relative overflow-hidden hover:border-foreground/40 transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#F0F0F0] cursor-pointer">
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px] opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: module.color }}
          />

          {/* Badge */}
          <div className="flex items-center justify-between mb-4">
            <div
              className="p-2.5 border-2 transition-colors"
              style={{ borderColor: module.color + "40", color: module.color }}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span
              className="text-[8px] font-black uppercase tracking-widest px-2 py-1 border"
              style={{ borderColor: module.color + "40", color: module.color }}
            >
              {module.badge}
            </span>
          </div>

          <h3 className="text-foreground font-black text-sm uppercase tracking-wider mb-2 group-hover:text-bauhaus-red transition-colors">
            {module.title}
          </h3>
          <p className="text-slate-500 text-xs font-medium leading-relaxed mb-4">
            {module.desc}
          </p>

          <div className="flex items-center gap-1 text-slate-500 group-hover:text-foreground transition-colors">
            <span className="text-[10px] font-black uppercase tracking-widest">Launch</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   DASHBOARD PAGE
   ═══════════════════════════════════════════ */

export default function DashboardPage() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [weeklyData, setWeeklyData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [streak, setStreak] = useState<number>(0);
  const [examPrepScore, setExamPrepScore] = useState<number>(0);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const [logDay, setLogDay] = useState<number>(0);
  const [logHours, setLogHours] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    setLogDay(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);

    // Load weekly study data
    const storedStudy = localStorage.getItem("avoriq_weekly_study");
    if (storedStudy) {
      try {
        setWeeklyData(JSON.parse(storedStudy));
      } catch {
        // Fall back to zeros
      }
    } else {
      localStorage.setItem("avoriq_weekly_study", JSON.stringify([0, 0, 0, 0, 0, 0, 0]));
    }

    // Load study streak
    const storedStreak = localStorage.getItem("avoriq_study_streak");
    if (storedStreak) {
      setStreak(parseInt(storedStreak, 10) || 0);
    } else {
      localStorage.setItem("avoriq_study_streak", "0");
    }

    // Load exam prep score
    const storedScore = localStorage.getItem("avoriq_exam_prep_score");
    if (storedScore) {
      setExamPrepScore(parseInt(storedScore, 10) || 0);
    } else {
      const initialScore = userProfile?.targetExam ? 45 : 0;
      setExamPrepScore(initialScore);
      localStorage.setItem("avoriq_exam_prep_score", String(initialScore));
    }

    // Load saved scholarships ids (using same key 'avoriq_saved' as scholarships page)
    const storedSaved = localStorage.getItem("avoriq_saved");
    if (storedSaved) {
      try {
        setSavedIds(JSON.parse(storedSaved));
      } catch {
        // Fall back to empty
      }
    }
  }, [userProfile]);

  const calibration = useMemo(() => getCalibration(userProfile), [userProfile]);
  const readinessScore = calibration;
  const scoreColors = getScoreColor(readinessScore);
  const maxStudy = Math.max(...weeklyData, 1);
  const totalWeekHours = weeklyData.reduce((a, b) => a + b, 0).toFixed(1);

  const userName = userProfile?.name || user?.displayName || "Student";
  const greeting = getGreeting();
  const dateStr = getFormattedDate();

  // Saved scholarships from localStorage filtered by savedIds
  const savedScholarships = useMemo(() => {
    return mockScholarships
      .filter((s) => savedIds.includes(s.id))
      .slice(0, 3);
  }, [savedIds]);

  const matchedCount = savedScholarships.length;

  // Calibration fields check
  const isFullyCalibrated = calibration >= 100;

  const handleUpdateStreak = (increment: boolean) => {
    const newStreak = increment ? streak + 1 : Math.max(0, streak - 1);
    setStreak(newStreak);
    localStorage.setItem("avoriq_study_streak", String(newStreak));
  };

  const handleUpdateExamPrep = (increment: boolean) => {
    const change = 5;
    const newScore = increment 
      ? Math.min(100, examPrepScore + change) 
      : Math.max(0, examPrepScore - change);
    setExamPrepScore(newScore);
    localStorage.setItem("avoriq_exam_prep_score", String(newScore));
  };

  const handleLogHours = () => {
    const hrs = Math.min(24, Math.max(0, parseFloat(logHours) || 0));
    const updated = [...weeklyData];
    updated[logDay] = hrs;
    setWeeklyData(updated);
    localStorage.setItem("avoriq_weekly_study", JSON.stringify(updated));
    setLogHours("");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-bauhaus-red border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Calibration Banner ── */}
        <AnimatePresence>
          {!isFullyCalibrated && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-bauhaus-yellow/5 border-2 border-bauhaus-yellow p-5 relative overflow-hidden">
                {/* Animated progress bar background */}
                <div
                  className="absolute bottom-0 left-0 h-1 bg-bauhaus-yellow transition-all duration-1000"
                  style={{ width: `${calibration}%` }}
                />
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 border-2 border-bauhaus-yellow text-bauhaus-yellow">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-black text-xs uppercase tracking-widest">
                        Calibration In Progress — {calibration}%
                      </h3>
                      <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold mt-1">
                        Complete your profile to unlock full AI personalization and accuracy.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/questionnaire"
                    className="px-5 py-2.5 bg-bauhaus-yellow text-background font-black text-[10px] uppercase tracking-widest border-2 border-bauhaus-yellow hover:bg-transparent hover:text-bauhaus-yellow transition-all shrink-0 brutal-shadow-yellow hover:translate-x-[-2px] hover:translate-y-[-2px]"
                  >
                    Complete Setup
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Welcome Header ── */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                {dateStr}
              </p>
              <h1 className="text-foreground text-3xl sm:text-4xl font-black uppercase tracking-wider">
                {greeting},{" "}
                <span className="text-bauhaus-red">{userName.split(" ")[0]}</span>
              </h1>
            </div>
            {isFullyCalibrated && (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Fully Calibrated
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Readiness + Metrics Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          {/* Readiness Ring */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-4 bg-surface border-2 border-[#333] p-8 flex flex-col items-center justify-center relative overflow-hidden"
          >
            {/* Decorative corner marks */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-foreground/10" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-foreground/10" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-foreground/10" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-foreground/10" />

            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">
              Student Readiness Score
            </div>
            <ReadinessRing score={readinessScore} size={180} />
            <div className="mt-6 text-center">
              <span className={`text-xs font-black uppercase tracking-widest ${scoreColors.text}`}>
                {readinessScore >= 70 ? "Optimal" : readinessScore >= 40 ? "Building" : "Needs Attention"}
              </span>
              <p className="text-slate-600 text-[10px] uppercase tracking-wider font-bold mt-1">
                Based on profile calibration
              </p>
            </div>
          </motion.div>

          {/* KPI Metrics Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MetricCard
              icon={Flame}
              label="Study Streak"
              value={streak}
              suffix={streak === 1 ? " day" : " days"}
              color="#F97316"
              delay={0.2}
              onIncrement={() => handleUpdateStreak(true)}
              onDecrement={() => handleUpdateStreak(false)}
            />
            <MetricCard
              icon={GraduationCap}
              label="Matched"
              value={matchedCount}
              suffix={matchedCount === 1 ? " scholarship" : " scholarships"}
              color="#D92A2A"
              delay={0.3}
            />
            <MetricCard
              icon={Target}
              label="Exam Prep"
              value={examPrepScore}
              suffix="%"
              color="#EAB308"
              delay={0.4}
              onIncrement={() => handleUpdateExamPrep(true)}
              onDecrement={() => handleUpdateExamPrep(false)}
            />
            <MetricCard
              icon={TrendingUp}
              label="Career Clarity"
              value={calibration}
              suffix="%"
              color="#22C55E"
              delay={0.5}
            />
          </div>
        </div>

        {/* ── Feature Modules Grid ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-bauhaus-red" />
              <h2 className="text-foreground font-black text-sm uppercase tracking-widest">
                Your AI Suite
              </h2>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              {featureModules.length} modules
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureModules.map((mod, i) => (
              <FeatureCard key={mod.id} module={mod} delay={0.15 * i} />
            ))}
          </div>
        </div>

        {/* ── Weekly Activity + Saved Scholarships Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Weekly Activity Chart */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-7 bg-surface border-2 border-[#333] p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 border-2 border-[#333] text-bauhaus-yellow">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-foreground font-black text-xs uppercase tracking-widest">
                    Weekly Study Activity
                  </h3>
                  <p className="text-slate-600 text-[10px] uppercase tracking-wider font-bold mt-0.5">
                    {totalWeekHours} hours this week
                  </p>
                </div>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Hours
              </div>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end gap-3 h-40">
              {weeklyData.map((hours, i) => {
                const heightPct = (hours / maxStudy) * 100;
                const isToday = i === new Date().getDay() - 1 || (new Date().getDay() === 0 && i === 6);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-black text-slate-500">
                      {hours.toFixed(1)}h
                    </span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPct}%` }}
                      transition={{ duration: 0.8, delay: 0.7 + i * 0.08, ease: "easeOut" }}
                      className={`w-full border-2 relative ${
                        isToday
                          ? "bg-bauhaus-red/20 border-bauhaus-red"
                          : "bg-surface-2 border-[#333] hover:border-foreground/30"
                      } transition-colors`}
                      style={{ minHeight: "8px" }}
                    >
                      {isToday && (
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-bauhaus-red rounded-full" />
                      )}
                    </motion.div>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${
                      isToday ? "text-bauhaus-red" : "text-slate-600"
                    }`}>
                      {dayLabels[i]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Logging controls */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#333]">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Log Study Hours:
              </span>
              <div className="flex items-center gap-2">
                <select
                  value={logDay}
                  onChange={(e) => setLogDay(parseInt(e.target.value, 10))}
                  className="bg-surface-2 border-2 border-[#333] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-foreground outline-none cursor-pointer"
                >
                  {dayLabels.map((lbl, idx) => (
                    <option key={idx} value={idx}>{lbl.toUpperCase()}</option>
                  ))}
                </select>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  placeholder="Hours"
                  value={logHours}
                  onChange={(e) => setLogHours(e.target.value)}
                  className="w-16 bg-surface-2 border-2 border-[#333] px-2 py-1 text-[10px] font-black text-foreground outline-none text-center"
                />
                <button
                  type="button"
                  onClick={handleLogHours}
                  className="px-3 py-1 bg-bauhaus-red border-2 border-bauhaus-red text-white text-[10px] font-black uppercase tracking-widest hover:bg-transparent hover:text-bauhaus-red transition-all cursor-pointer brutal-shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  Log
                </button>
              </div>
            </div>
          </motion.div>

          {/* Saved Scholarships Preview */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="lg:col-span-5 bg-surface border-2 border-[#333] p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 border-2 border-[#333] text-bauhaus-red">
                  <Bookmark className="w-4 h-4" />
                </div>
                <h3 className="text-foreground font-black text-xs uppercase tracking-widest">
                  Saved Scholarships
                </h3>
              </div>
              <Link
                href="/scholarships"
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-bauhaus-red transition-colors flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {savedScholarships.length > 0 ? (
                savedScholarships.map((scholarship, i) => (
                  <motion.div
                    key={scholarship.id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                    className="border-2 border-[#333] p-4 hover:border-foreground/30 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="text-foreground font-black text-[11px] uppercase tracking-wider truncate group-hover:text-bauhaus-red transition-colors">
                          {scholarship.name}
                        </h4>
                        <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold mt-1">
                          {scholarship.provider}
                        </p>
                      </div>
                      <span className="text-bauhaus-yellow text-[10px] font-black uppercase tracking-wider shrink-0">
                        {scholarship.amountFormatted}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {scholarship.deadline}
                      </span>
                      <span
                        className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 border ${
                          scholarship.category === "Government"
                            ? "border-green-500/30 text-green-400"
                            : scholarship.category === "Private"
                            ? "border-blue-400/30 text-blue-400"
                            : "border-purple-400/30 text-purple-400"
                        }`}
                      >
                        {scholarship.category}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Bookmark className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                    No saved scholarships yet
                  </p>
                  <Link
                    href="/scholarships"
                    className="inline-flex items-center gap-1 mt-3 text-bauhaus-red text-[10px] font-black uppercase tracking-widest hover:underline"
                  >
                    Browse Scholarships <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Quick Actions Footer Bar ── */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-10 bg-surface border-2 border-[#333] p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-bauhaus-yellow" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Quick Actions
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/chat"
              className="px-4 py-2 bg-bauhaus-red text-white font-black text-[10px] uppercase tracking-widest border-2 border-bauhaus-red hover:bg-transparent hover:text-bauhaus-red transition-all"
            >
              Start AI Chat
            </Link>
            <Link
              href="/scholarships"
              className="px-4 py-2 bg-surface-2 text-foreground font-black text-[10px] uppercase tracking-widest border-2 border-[#333] hover:border-foreground transition-all"
            >
              Browse Scholarships
            </Link>
            <Link
              href="/questionnaire"
              className="px-4 py-2 bg-surface-2 text-foreground font-black text-[10px] uppercase tracking-widest border-2 border-[#333] hover:border-foreground transition-all"
            >
              Edit Profile
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
