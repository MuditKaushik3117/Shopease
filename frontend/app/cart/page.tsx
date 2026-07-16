"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2, ArrowLeft, ShieldCheck, Ticket } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  // Financial calculations
  const subtotal = cart.reduce((sum: number, item: any) => sum + item.price, 0);
  const shippingThreshold = 2000;
  const shippingCost = subtotal > shippingThreshold || subtotal === 0 ? 0 : 99;
  const estimatedTax = Math.round(subtotal * 0.18); // 18% GST mock
  const total = subtotal + shippingCost + estimatedTax - discount;

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promo.trim().toLowerCase() === "welcome10") {
      setDiscount(Math.round(subtotal * 0.1)); // 10% discount
    } else {
      alert("Invalid promo code. Try 'WELCOME10' for 10% off!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:py-12 min-h-[70vh]">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Shopping Cart</h1>
        <p className="text-slate-500 text-sm">
          {cart.length === 0 
            ? "Your shopping bag is empty." 
            : `Review your ${cart.length} selected items before check out.`
          }
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-sm max-w-lg mx-auto mt-6">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400 border border-slate-100">
            <Trash2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-950 mb-2">Your cart is empty</h3>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            Looks like you haven't added anything to your cart yet. Head back to the store and check out our new arrivals.
          </p>
          <Link href="/">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-md shadow-indigo-100">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Grid: Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-2xl p-4.5 flex gap-5 items-center justify-between shadow-sm hover:shadow-md transition duration-200"
              >
                {/* Visual Thumbnail */}
                <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-grow">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                    {item.category || "Tech"}
                  </span>
                  <h2 className="text-base font-bold text-slate-800 line-clamp-1 mt-0.5">
                    {item.name}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Qty: 1 (Standard Unit)</p>
                </div>

                {/* Pricing & Removal */}
                <div className="flex items-center gap-6">
                  <span className="text-lg font-black text-slate-900">
                    ₹{item.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="p-2.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50/50 transition cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Back to store shortcut */}
            <div className="pt-2">
              <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition">
                <ArrowLeft className="w-4 h-4" /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right Grid: Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900 mb-6">Order Summary</h2>

              {/* Price Details */}
              <div className="space-y-3.5 text-sm border-b border-slate-100 pb-5">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-slate-850">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Shipping Cost</span>
                  <span className="text-slate-850">
                    {shippingCost === 0 
                      ? <span className="text-emerald-600 font-bold">Free</span> 
                      : `₹${shippingCost}`
                    }
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Estimated GST (18%)</span>
                  <span className="text-slate-850">₹{estimatedTax.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount (Promo)</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Promo Code Form */}
              <form onSubmit={applyPromo} className="py-4 border-b border-slate-100 flex gap-2">
                <div className="relative flex-grow">
                  <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="WELCOME10"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-indigo-500 uppercase font-semibold"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-850 text-white rounded-lg px-4.5 py-2 text-xs font-semibold transition"
                >
                  Apply
                </button>
              </form>

              {/* Total Calculation */}
              <div className="flex justify-between items-baseline py-6">
                <span className="text-base font-bold text-slate-900">Total Price</span>
                <span className="text-3xl font-black text-slate-950">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              {/* Action */}
              <Link href="/checkout">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold transition shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 cursor-pointer">
                  Proceed to Checkout
                </button>
              </Link>

              {/* Security Badge */}
              <div className="mt-4 flex justify-center items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure SSL Checkout
              </div>
            </div>
            
            {/* Free shipping helper badge */}
            {subtotal < shippingThreshold && (
              <div className="bg-indigo-50/50 border border-indigo-100/50 text-indigo-850 p-4 rounded-2xl text-xs font-semibold text-center">
                Add <span className="font-extrabold text-indigo-600">₹{(shippingThreshold - subtotal).toLocaleString()}</span> more to qualify for <span className="font-extrabold text-emerald-600">FREE SHIPPING</span>!
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
