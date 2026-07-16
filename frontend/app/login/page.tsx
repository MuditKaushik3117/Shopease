"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ShoppingBag, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (isLoggedIn) {
      router.push("/profile");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const registeredUsersStr = localStorage.getItem("registeredUsers");
    let loginSuccess = false;
    let userDetails = null;

    if (registeredUsersStr) {
      try {
        const registeredUsers = JSON.parse(registeredUsersStr);
        const matchedUser = registeredUsers.find(
          (u: any) => u.email === email && u.password === password
        );
        if (matchedUser) {
          loginSuccess = true;
          userDetails = matchedUser;
        }
      } catch (err) {
        console.error("Error parsing registered users data:", err);
      }
    }

    // Fallback/Demo user login
    if (!loginSuccess && email === "demo@example.com" && password === "password123") {
      loginSuccess = true;
      userDetails = { name: "Demo User", email: "demo@example.com" };
      
      try {
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        if (!registeredUsers.some((u: any) => u.email === "demo@example.com")) {
          registeredUsers.push(userDetails);
          localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
        }
      } catch (e) {}
    }

    if (loginSuccess && userDetails) {
      localStorage.setItem("user", JSON.stringify(userDetails));
      localStorage.setItem("loggedIn", "true");
      window.location.href = "/profile";
    } else {
      setError("Invalid email or password. You can register a new account or use the demo credentials (demo@example.com / password123).");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 relative">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-indigo-500/5 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-purple-500/5 blur-[80px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-white border border-slate-100/80 rounded-3xl p-8 shadow-xl relative z-10">
        
        {/* Logo and title */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="bg-indigo-600 text-white p-2.5 rounded-2xl shadow-md shadow-indigo-100 mb-4">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Welcome Back</h1>
          <p className="text-slate-400 text-sm mt-1">Please log in to your ShopEase account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-rose-50 text-rose-600 border border-rose-100 p-3.5 rounded-2xl text-xs font-semibold leading-relaxed">
              {error}
            </div>
          )}

          {/* Email input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
              <input
                type="email"
                placeholder="demo@example.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-bold transition shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.99] cursor-pointer mt-2"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>

          {/* Switch page link */}
          <p className="text-center text-xs text-slate-500 font-semibold mt-6 pt-4 border-t border-slate-50">
            New to ShopEase?{" "}
            <Link href="/register" className="text-indigo-600 hover:underline">
              Create a free account
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
}
