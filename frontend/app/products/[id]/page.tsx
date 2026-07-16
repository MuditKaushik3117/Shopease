import { getProductById } from "@/services/productServices";
import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import { Star, ShieldCheck, Truck, ArrowLeft, RefreshCw, CircleDollarSign } from "lucide-react";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  // Fallback category representation
  const category = product.category || "Technology";

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Back Link */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to store catalog
      </Link>

      {/* Main product columns split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Grid: Visual Showcase */}
        <div className="lg:col-span-6 relative">
          <div className="relative group overflow-hidden rounded-3xl border border-slate-100/80 bg-white p-6 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-2xl w-full h-auto max-h-[500px] object-contain mx-auto"
            />
          </div>
        </div>

        {/* Right Grid: Content Panel */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {category}
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
              product.stock > 3 
                ? "bg-emerald-50 border border-emerald-100 text-emerald-700"
                : "bg-amber-50 border border-amber-100 text-amber-700"
            }`}>
              {product.stock > 0 ? `In Stock (${product.stock} items left)` : "Out of Stock"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {product.name}
          </h1>

          {/* Ratings Summary */}
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <div className="flex text-amber-450 items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-700">4.8 Rating</span>
            <span className="text-slate-350 text-xs">•</span>
            <span className="text-xs text-slate-500 hover:text-indigo-650 cursor-pointer transition">124 reviews verified</span>
          </div>

          {/* Price */}
          <div className="bg-slate-50 p-4.5 rounded-2xl flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-0.5">Total Price (inclusive of tax)</p>
              <p className="text-4xl font-black text-slate-950">
                ₹{product.price.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-indigo-600 bg-white border border-indigo-50 px-3 py-1.5 rounded-lg shadow-sm">
                Top Rated Item
              </span>
            </div>
          </div>

          {/* Product Description */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-base">Key Details</h3>
            <p className="text-slate-650 text-sm leading-relaxed">
              This premium {product.name.toLowerCase()} is designed specifically to optimize efficiency, stability, and aesthetics. Built with raw durability in mind, it utilizes high-end tactile components that excel under heavy office workloads or intensive gaming setups.
            </p>
          </div>

          {/* Specifications Table */}
          <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm">
            <div className="grid grid-cols-2 p-3.5 border-b border-slate-50 text-sm bg-slate-50/50">
              <span className="font-bold text-slate-500">Component Specs</span>
              <span className="font-bold text-slate-900">Description Details</span>
            </div>
            <div className="grid grid-cols-2 p-3.5 border-b border-slate-50 text-xs">
              <span className="font-semibold text-slate-500">Form Factor</span>
              <span className="text-slate-700 font-medium">Ergonomic Desktop Grade</span>
            </div>
            <div className="grid grid-cols-2 p-3.5 border-b border-slate-50 text-xs">
              <span className="font-semibold text-slate-500">Connectivity</span>
              <span className="text-slate-700 font-medium">Next-gen wireless/wire interface</span>
            </div>
            <div className="grid grid-cols-2 p-3.5 text-xs">
              <span className="font-semibold text-slate-500">Materials</span>
              <span className="text-slate-700 font-medium">Premium alloy & recycled polymers</span>
            </div>
          </div>

          {/* Purchase Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            <AddToCartButton product={product} />
            <AddToWishlistButton product={product} />
          </div>

          {/* Support and Commitments Card */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="flex gap-2.5 items-start">
              <Truck className="w-5 h-5 text-indigo-500 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-800">Swift Shipping</h4>
                <p className="text-slate-500 mt-0.5">Delivered in 2-3 business days.</p>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <RefreshCw className="w-5 h-5 text-indigo-500 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-800">Return Guarantee</h4>
                <p className="text-slate-500 mt-0.5">No questions asked 30-day window.</p>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-800">Authentic Gear</h4>
                <p className="text-slate-500 mt-0.5">Direct manufacturer warranty.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}
