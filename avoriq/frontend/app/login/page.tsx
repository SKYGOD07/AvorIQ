"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Mail, Lock, ArrowRight, GitMerge, Globe, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setAuthToken] = useLocalStorage<string | null>("avoriq_auth_token", null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthToken(`mock-token-${Date.now()}`);
    router.push("/chat");
  };

  const handleSocialLogin = () => {
    setAuthToken(`mock-token-social-${Date.now()}`);
    router.push("/chat");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center pt-20">
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-surface border-2 border-foreground brutal-shadow-lg p-8 sm:p-10 relative">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-bauhaus-red text-white flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h1 className="text-foreground text-xl font-black uppercase tracking-wider">
              {isLogin ? "Sign In" : "Create Account"}
            </h1>
            <p className="text-slate-500 text-xs uppercase tracking-wider mt-2 font-bold">
              {isLogin ? "Access your AI scholarship companion." : "Join AvorIQ to find opportunities."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-foreground text-[10px] font-black uppercase tracking-widest">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-600" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="STUDENT@EXAMPLE.COM"
                  className="w-full pl-10 pr-4 py-3 bg-surface-2 border-2 border-[#333] text-foreground text-sm font-bold uppercase tracking-wider focus:border-bauhaus-red focus:shadow-[3px_3px_0px_0px_#D92A2A] transition-all outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-foreground text-[10px] font-black uppercase tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-600" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-surface-2 border-2 border-[#333] text-foreground text-sm focus:border-bauhaus-red focus:shadow-[3px_3px_0px_0px_#D92A2A] transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-sm font-black uppercase tracking-widest text-white bg-bauhaus-red border-2 border-bauhaus-red hover:bg-transparent hover:text-bauhaus-red transition-all flex items-center justify-center gap-2 cursor-pointer brutal-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#D92A2A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mt-6"
            >
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-[2px] bg-[#333] flex-1" />
            <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Or</span>
            <div className="h-[2px] bg-[#333] flex-1" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-0">
            <button
              type="button"
              onClick={handleSocialLogin}
              className="flex items-center justify-center gap-2 py-3 bg-surface-2 border-2 border-[#333] text-foreground text-xs font-black uppercase tracking-widest hover:border-foreground transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              Google
            </button>
            <button
              type="button"
              onClick={handleSocialLogin}
              className="flex items-center justify-center gap-2 py-3 bg-surface-2 border-2 border-[#333] border-l-0 text-foreground text-xs font-black uppercase tracking-widest hover:border-foreground transition-all cursor-pointer"
            >
              <GitMerge className="w-4 h-4" />
              GitHub
            </button>
          </div>

          {/* Toggle */}
          <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-wider mt-8">
            {isLogin ? "No account?" : "Have one?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-bauhaus-red font-black hover:text-foreground transition-colors cursor-pointer"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
