"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Aurora from "../../components/reactbits/Aurora";
import StarBorder from "../../components/reactbits/StarBorder";
import { Mail, Lock, ArrowRight, GitMerge, Globe, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setAuthToken] = useLocalStorage<string | null>("avoriq_auth_token", null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    setAuthToken(`mock-token-${Date.now()}`);
    router.push("/scholarships");
  };

  const handleSocialLogin = () => {
    // Mock social authentication
    setAuthToken(`mock-token-social-${Date.now()}`);
    router.push("/scholarships");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Aurora colorStops={["#0B1120", "#1e1b4b", "#0f172a"]} amplitude={0.8} />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-blue/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl mx-auto flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-accent-purple" />
            </div>
            <h1 className="text-white text-2xl font-extrabold tracking-tight">
              {isLogin ? "Welcome back to AvorIQ" : "Join AvorIQ"}
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              {isLogin ? "Enter your details to access your AI second brain." : "Create your account to start finding opportunities."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="space-y-1.5">
              <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider pl-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-white text-sm focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider pl-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-white text-sm focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all outline-none"
                />
              </div>
            </div>

            <StarBorder as="div" color="#7C3AED" className="w-full mt-6">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-navy-card shadow-[0_0_15px_rgba(124,58,237,0.2)] hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:bg-navy-card/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </StarBorder>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6 relative z-10">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Or continue with</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3 relative z-10">
            <button
              type="button"
              onClick={handleSocialLogin}
              className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-white text-sm font-semibold transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              Google
            </button>
            <button
              type="button"
              onClick={handleSocialLogin}
              className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-white text-sm font-semibold transition-all cursor-pointer"
            >
              <GitMerge className="w-4 h-4" />
              GitHub
            </button>
          </div>

          {/* Toggle Login/Signup */}
          <p className="text-center text-slate-400 text-sm mt-8 relative z-10">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent-purple font-semibold hover:text-white transition-colors cursor-pointer"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
