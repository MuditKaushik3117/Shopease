import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28 text-white">
      {/* Decorative Radial Gradients */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Copywriting */}
        <div className="lg:col-span-7 text-left space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider animate-pulse">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen Hardware Available
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Elevate Your Setup With
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
              Premium Tech Gear
            </span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
            Explore carefully curated mechanical keyboards, precise gaming mice, and ergonomic items built to boost productivity and gaming efficiency.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="#featured-products">
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98]">
                Explore Catalog <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link href="/about">
              <button className="bg-slate-900 border border-slate-800 text-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-800 hover:border-slate-700 transition active:scale-[0.98]">
                Learn More
              </button>
            </Link>
          </div>

          {/* Feature highlights bar */}
          <div className="pt-8 border-t border-slate-900 grid grid-cols-3 gap-4 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-slate-900 rounded-lg text-indigo-400">
                <Truck className="w-4 h-4" />
              </div>
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-slate-900 rounded-lg text-indigo-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>1 Year Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-slate-900 rounded-lg text-indigo-400">
                <RotateCcw className="w-4 h-4" />
              </div>
              <span>30-Day Returns</span>
            </div>
          </div>

        </div>

        {/* Right Column: Hero Image container */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <div className="relative group">
            {/* Glowing Backdrop behind image */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-500 opacity-20 blur-lg group-hover:opacity-30 transition duration-1000"></div>
            
            {/* Main Hero Image */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-850 shadow-2xl bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700"
                alt="Tech Gaming Setup"
                className="w-full max-w-[480px] object-cover aspect-[4/3] group-hover:scale-102 transition duration-500"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
