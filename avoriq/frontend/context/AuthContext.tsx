"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "../lib/firebase";
import { fetchUserProfile, saveUserProfile } from "../lib/api";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<any>;
  signUpWithEmail: (email: string, password: string) => Promise<any>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isFirebaseConfigured: boolean;
  isQuestionnaireCompleted: boolean;
  userProfile: any | null;
  completeQuestionnaire: (profileData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isQuestionnaireCompleted, setIsQuestionnaireCompleted] = useState(false);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      if (typeof window !== "undefined") {
        const storedToken = window.localStorage.getItem("avoriq_auth_token");
        if (storedToken) {
          try {
            let parsed: any = null;
            try {
              parsed = JSON.parse(storedToken);
            } catch {
              parsed = storedToken;
            }

            let uid = "mock-uid-stored";
            let email = "STUDENT@EXAMPLE.COM";
            let displayName = "MOCK STUDENT";

            if (parsed && typeof parsed === "object" && parsed.email) {
              uid = parsed.uid || uid;
              email = parsed.email || email;
              displayName = parsed.displayName || displayName;
              setUser(parsed);
            } else if (typeof parsed === "string") {
              uid = parsed;
              setUser({ email, uid, displayName });
            } else {
              setUser({ email, uid, displayName });
            }

            fetchUserProfile(uid).then((profile) => {
              if (profile) {
                setUserProfile(profile);
                setIsQuestionnaireCompleted(true);
              } else {
                setUserProfile(null);
                setIsQuestionnaireCompleted(false);
              }
              setLoading(false);
            });
            return;
          } catch (e) {
            console.error("Error setting mock user:", e);
          }
        }
      }
      setLoading(false);
      return;
    }

    // Handle redirect results on page load
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Redirect login successful:", result.user);
        }
      })
      .catch((error) => {
        console.error("Error processing redirect login result:", error);
      });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          window.localStorage.setItem("avoriq_auth_token", JSON.stringify(token));
        } catch (e) {
          console.error("Error fetching Firebase ID token:", e);
          window.localStorage.setItem("avoriq_auth_token", JSON.stringify(currentUser.uid));
        }

        try {
          const profile = await fetchUserProfile(currentUser.uid);
          if (profile) {
            setUserProfile(profile);
            setIsQuestionnaireCompleted(true);
          } else {
            setUserProfile(null);
            setIsQuestionnaireCompleted(false);
          }
        } catch (e) {
          console.error("Error fetching user profile:", e);
          setUserProfile(null);
          setIsQuestionnaireCompleted(false);
        }
      } else {
        window.localStorage.removeItem("avoriq_auth_token");
        setIsQuestionnaireCompleted(false);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    if (!isFirebaseConfigured) {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (password.length < 6) {
        const error = new Error("Password should be at least 6 characters.");
        (error as any).code = "auth/weak-password";
        throw error;
      }
      const mockUser = {
        email: email.toUpperCase(),
        uid: `mock-uid-${Date.now()}`,
        displayName: email.split("@")[0].toUpperCase(),
      };
      setUser(mockUser);
      window.localStorage.setItem("avoriq_auth_token", JSON.stringify(mockUser.uid));
      
      // Load mock questionnaire details from database
      const profile = await fetchUserProfile(mockUser.uid);
      if (profile) {
        setUserProfile(profile);
        setIsQuestionnaireCompleted(true);
      } else {
        setUserProfile(null);
        setIsQuestionnaireCompleted(false);
      }
      
      return { user: mockUser };
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (email: string, password: string) => {
    if (!isFirebaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (password.length < 6) {
        const error = new Error("Password should be at least 6 characters.");
        (error as any).code = "auth/weak-password";
        throw error;
      }
      const mockUser = {
        email: email.toUpperCase(),
        uid: `mock-uid-${Date.now()}`,
        displayName: email.split("@")[0].toUpperCase(),
      };
      setUser(mockUser);
      window.localStorage.setItem("avoriq_auth_token", JSON.stringify(mockUser.uid));
      setIsQuestionnaireCompleted(false);
      setUserProfile(null);
      return { user: mockUser };
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockUser = {
        email: "STUDENT.GOOGLE@AVORIQ.COM",
        uid: `mock-google-${Date.now()}`,
        displayName: "GOOGLE STUDENT",
      };
      setUser(mockUser);
      window.localStorage.setItem("avoriq_auth_token", JSON.stringify(mockUser.uid));
      
      const profile = await fetchUserProfile(mockUser.uid);
      if (profile) {
        setUserProfile(profile);
        setIsQuestionnaireCompleted(true);
      } else {
        setUserProfile(null);
        setIsQuestionnaireCompleted(false);
      }
      
      return;
    }
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      // If browser blocks popups, fallback immediately to redirect
      if (error?.code === "auth/popup-blocked") {
        console.warn("Popup blocked. Falling back to signInWithRedirect...");
        await signInWithRedirect(auth, provider);
      } else {
        throw error;
      }
    }
  };

  const logout = async () => {
    if (!isFirebaseConfigured) {
      setUser(null);
      window.localStorage.removeItem("avoriq_auth_token");
      setIsQuestionnaireCompleted(false);
      setUserProfile(null);
      return;
    }
    await signOut(auth);
  };

  const completeQuestionnaire = async (profileData: any) => {
    if (!user) return;
    const success = await saveUserProfile(user.uid, user.email || "student@example.com", profileData);
    if (success) {
      setUserProfile(profileData);
      setIsQuestionnaireCompleted(true);
    } else {
      console.error("Failed to save profile to PostgreSQL database");
      // Fallback state update to not block UI
      setUserProfile(profileData);
      setIsQuestionnaireCompleted(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithEmail,
        signUpWithEmail,
        loginWithGoogle,
        logout,
        isFirebaseConfigured,
        isQuestionnaireCompleted,
        userProfile,
        completeQuestionnaire,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
