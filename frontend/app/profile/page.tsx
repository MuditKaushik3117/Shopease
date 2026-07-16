"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, Package, Heart, ShoppingCart, ChevronRight } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(userData);
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    toast.success("Successfully logged out.", {
      style: {
        borderRadius: "12px",
        background: "#0f172a",
        color: "#fff",
      },
    });
    // Redirect to home and refresh so Navbar updates state
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-650"></div>
      </div>
    );
  }

  // Get initials for profile avatar
  const getInitials = (fullName: string) => {
    if (!fullName) return "U";
    return fullName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-[70vh]">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Account Dashboard</h1>
        <p className="text-slate-500 text-sm">Manage your profile details and track your store activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Profile Card Container (col-5) */}
        <div className="md:col-span-5 bg-white border border-slate-100/80 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
          {/* Large Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg shadow-indigo-150 mb-4 border-4 border-white">
            {getInitials(user.name)}
          </div>
          
          <h2 className="text-xl font-extrabold text-slate-900">{user.name}</h2>
          <p className="text-xs font-semibold text-slate-400 mt-1">{user.email}</p>

          <div className="w-full h-[1px] bg-slate-100 my-6"></div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-3 rounded-2xl transition duration-200 cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5" /> Log Out
          </button>
        </div>

        {/* Quick Links Menu Container (col-7) */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white border border-slate-100/80 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-4">
              Dashboard Actions
            </h3>
            
            <div className="divide-y divide-slate-50">
              {/* Link: Orders */}
              <Link 
                href="/orders" 
                className="flex items-center justify-between py-4 hover:text-indigo-650 group transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition duration-300">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-800">My Orders</p>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">View receipt logs and shipping status</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-350 group-hover:translate-x-1 transition duration-200" />
              </Link>

              {/* Link: Wishlist */}
              <Link 
                href="/wishlist" 
                className="flex items-center justify-between py-4 hover:text-indigo-650 group transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-50 text-rose-650 rounded-xl group-hover:bg-rose-500 group-hover:text-white transition duration-300">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-800">My Wishlist</p>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Browse favorited items saved for later</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-350 group-hover:translate-x-1 transition duration-200" />
              </Link>

              {/* Link: Shopping Cart */}
              <Link 
                href="/cart" 
                className="flex items-center justify-between py-4 hover:text-indigo-650 group transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition duration-300">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-800">Shopping Cart</p>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Verify pending items and proceed to checkout</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-350 group-hover:translate-x-1 transition duration-200" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
