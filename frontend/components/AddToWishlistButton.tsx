"use client";

import { useCart } from "@/context/CartContext";
import { Heart } from "lucide-react";

export default function AddToWishlistButton({
  product,
}: {
  product: any;
}) {
  const { wishlist, addToWishlist, removeFromWishlist } = useCart();

  const isFavorited = wishlist.some((item: any) => item.id === product.id);

  const toggleWishlist = () => {
    if (isFavorited) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`flex-grow md:flex-none flex items-center justify-center gap-2 border px-8 py-4 rounded-xl font-bold transition duration-200 cursor-pointer ${
        isFavorited
          ? "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100"
          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
      }`}
    >
      <Heart className={`w-4.5 h-4.5 ${isFavorited ? "fill-current" : ""}`} />
      <span>{isFavorited ? "Saved in Wishlist" : "Add to Wishlist"}</span>
    </button>
  );
}
