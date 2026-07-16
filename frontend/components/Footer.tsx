"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ShoppingBag, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-24 border-t border-slate-800">
      
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand details and social links */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-2 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold text-white">
              ShopEase
            </span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            Discover a curated collection of premium electronic gear, gaming hardware, and ergonomic accessories designed to elevate your daily grind.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-slate-800 hover:bg-indigo-600 hover:text-white rounded-lg transition-all duration-200 text-slate-400" title="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-indigo-600 hover:text-white rounded-lg transition-all duration-200 text-slate-400" title="Twitter/X">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-indigo-600 hover:text-white rounded-lg transition-all duration-200 text-slate-400" title="Instagram">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links section */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-6">
            Quick Links
          </h3>
          <ul className="space-y-3.5 text-sm">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-white hover:translate-x-1 transition duration-200">
                <ChevronRight className="w-3 h-3 text-indigo-500" /> Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="flex items-center gap-1 hover:text-white hover:translate-x-1 transition duration-200">
                <ChevronRight className="w-3 h-3 text-indigo-500" /> About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="flex items-center gap-1 hover:text-white hover:translate-x-1 transition duration-200">
                <ChevronRight className="w-3 h-3 text-indigo-500" /> Contact
              </Link>
            </li>
            <li>
              <Link href="/orders" className="flex items-center gap-1 hover:text-white hover:translate-x-1 transition duration-200">
                <ChevronRight className="w-3 h-3 text-indigo-500" /> Track Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact details */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-6">
            Customer Support
          </h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-300 font-medium">Email Us</p>
                <a href="mailto:support@shopease.com" className="hover:text-white text-xs">support@shopease.com</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-300 font-medium">Call Us</p>
                <a href="tel:+919876543210" className="hover:text-white text-xs">+91 9876543210</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-300 font-medium">Our Headquarter</p>
                <span className="text-xs">Gurgaon, Haryana, India</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription section */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-6">
            Newsletter
          </h3>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
            Subscribe to our newsletter to receive updates on new arrivals, deals, and exclusive offers.
          </p>
          <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2.5 text-sm font-semibold shadow transition-all duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Footer copyright */}
      <div className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 ShopEase. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
