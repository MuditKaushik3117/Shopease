"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn") === "true");
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedIn");
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        <Link
          href="/"
          className="text-3xl font-extrabold text-blue-600"
        >
          ShopEase
        </Link>

        <div className="flex items-center gap-6 font-medium">

          <Link
            href="/"
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            href="/wishlist"
            className="hover:text-blue-600 transition"
          >
            Wishlist
          </Link>

          <Link
            href="/cart"
            className="hover:text-blue-600 transition"
          >
            Cart
          </Link>

          <Link
            href="/orders"
            className="hover:text-blue-600 transition"
          >
            Orders
          </Link>

          <Link
            href="/about"
            className="hover:text-blue-600 transition"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="hover:text-blue-600 transition"
          >
            Contact
          </Link>

          {loggedIn ? (
            <>
              <Link
                href="/profile"
                className="hover:text-blue-600 transition"
              >
                Profile
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}


