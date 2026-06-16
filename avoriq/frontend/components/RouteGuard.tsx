"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isQuestionnaireCompleted } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    console.log("[RouteGuard] Evaluating path:", pathname, {
      isAuthenticated: !!user,
      isQuestionnaireCompleted,
    });

    // 1. Gating logged-in users who have NOT completed the questionnaire
    const isLoginOrHomeOrQuestionnaire = pathname === "/questionnaire" || pathname === "/login" || pathname === "/";
    if (user && !isQuestionnaireCompleted && !isLoginOrHomeOrQuestionnaire) {
      console.log("[RouteGuard] Gating user to /questionnaire");
      router.replace("/questionnaire");
      return;
    }

    // 2. Protect authenticated paths from anonymous users
    const isProtectedRoute = 
      pathname?.startsWith("/chat") || 
      pathname?.startsWith("/saved") || 
      pathname === "/questionnaire";
      
    if (!user && isProtectedRoute) {
      console.log("[RouteGuard] Protecting route, redirecting to /login");
      router.replace("/login");
      return;
    }

    // 3. Redirect logged-in users away from / and /login to the app dashboard
    if (user && (pathname === "/" || pathname === "/login")) {
      if (isQuestionnaireCompleted) {
        console.log("[RouteGuard] Authenticated user on auth/home path, redirecting to /scholarships");
        router.replace("/scholarships");
      } else {
        console.log("[RouteGuard] Authenticated user on auth/home path with incomplete profile, redirecting to /questionnaire");
        router.replace("/questionnaire");
      }
    }
  }, [user, loading, isQuestionnaireCompleted, pathname, router]);

  // Premium Neo-Brutalist loading spinner during session initialization
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground">
        <div className="w-12 h-12 border-4 border-bauhaus-red border-t-transparent animate-spin mb-4" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Loading Session...</span>
      </div>
    );
  }

  return <>{children}</>;
}
