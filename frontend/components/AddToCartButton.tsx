"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({
  product,
}: {
  product: any;
}) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="flex-grow md:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-indigo-100 hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition duration-200 cursor-pointer"
    >
      <ShoppingCart className="w-4.5 h-4.5" /> Add To Cart
    </button>
  );
}
