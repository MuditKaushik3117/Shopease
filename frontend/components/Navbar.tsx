"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Heart, User, LogOut, LogIn, UserPlus, Home, Info, Mail } from "lucide-react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const { cart, wishlist } = useCart();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(isLoggedIn);
    if (isLoggedIn) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setUserName(user.name || "User");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/75 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 text-white p-2 rounded-xl group-hover:bg-indigo-700 transition-all duration-300 shadow-md shadow-indigo-100">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent">
            ShopEase
          </span>
        </Link>

        {/* Central Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link href="/" className="flex items-center gap-1.5 hover:text-indigo-600 transition duration-200">
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link href="/about" className="flex items-center gap-1.5 hover:text-indigo-600 transition duration-200">
            <Info className="w-4 h-4" /> About
          </Link>
          <Link href="/contact" className="flex items-center gap-1.5 hover:text-indigo-600 transition duration-200">
            <Mail className="w-4 h-4" /> Contact
          </Link>
        </div>

        {/* Secondary Actions (Cart, Wishlist, Auth) */}
        <div className="flex items-center gap-5">
          
          {/* Wishlist Icon Link */}
          <Link 
            href="/wishlist" 
            className="relative p-2.5 rounded-full hover:bg-slate-100 text-slate-700 transition duration-200 group"
            title="Wishlist"
          >
            <Heart className="w-5 h-5 group-hover:scale-105 transition" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-white animate-scaleIn">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon Link */}
          <Link 
            href="/cart" 
            className="relative p-2.5 rounded-full hover:bg-slate-100 text-slate-700 transition duration-200 group"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition" />
            {cart.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-white animate-scaleIn">
                {cart.length}
              </span>
            )}
          </Link>

          <div className="w-[1px] h-6 bg-slate-200"></div>

          {/* Authentication Actions */}
          <div className="flex items-center gap-3">
            {loggedIn ? (
              <div className="flex items-center gap-3">
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-indigo-50/50 hover:text-indigo-600 transition duration-200 group"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-100/50">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 hidden lg:inline max-w-[120px] truncate">
                    {userName.split(" ")[0]}
                  </span>
                </Link>

                <button
                  onClick={logout}
                  className="p-2.5 text-slate-400 hover:text-rose-600 rounded-full hover:bg-rose-50/50 transition duration-200"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition duration-200"
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>

                <Link
                  href="/register"
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4.5 py-2 rounded-xl text-sm font-semibold shadow-sm hover:shadow-indigo-100 hover:shadow-lg transition duration-200"
                >
                  <UserPlus className="w-4 h-4" /> Register
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
