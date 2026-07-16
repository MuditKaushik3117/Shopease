"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingCart, Eye } from "lucide-react";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
  category = "Tech",
}: ProductCardProps) {
  const { cart, wishlist, addToCart, addToWishlist, removeFromWishlist } = useCart();

  const isFavorited = wishlist.some((item: any) => item.id === id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorited) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, image, category });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image, category });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col h-full relative">
      
      {/* Product Image + Overlays */}
      <div className="overflow-hidden bg-slate-50 relative aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          loading="lazy"
        />
        
        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {category}
        </span>

        {/* Wishlist Button Overlay */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-4 right-4 p-2 rounded-full border shadow-sm transition duration-200 cursor-pointer ${
            isFavorited
              ? "bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100"
              : "bg-white/90 backdrop-blur-sm border-slate-100 text-slate-500 hover:bg-white hover:text-rose-500"
          }`}
          title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4.5 h-4.5 ${isFavorited ? "fill-current" : ""}`} />
        </button>

        {/* Hover Action Overlay Grid */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link href={`/products/${id}`}>
            <div className="p-3 bg-white hover:bg-indigo-600 hover:text-white text-slate-800 rounded-full shadow-lg transition duration-200 cursor-pointer transform translate-y-4 group-hover:translate-y-0 duration-300">
              <Eye className="w-5 h-5" />
            </div>
          </Link>
          <button
            onClick={handleAddToCart}
            className="p-3 bg-white hover:bg-indigo-600 hover:text-white text-slate-800 rounded-full shadow-lg transition duration-200 cursor-pointer transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition mb-1 text-ellipsis overflow-hidden line-clamp-1">
          {name}
        </h3>
        
        <p className="text-slate-500 text-xs mb-4 line-clamp-2">
          Premium gear crafted for daily high performance.
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-slate-50">
          <span className="text-xl font-black text-slate-900">
            ₹{price.toLocaleString()}
          </span>

          <Link href={`/products/${id}`} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition flex items-center gap-1">
            Details →
          </Link>
        </div>
      </div>

    </div>
  );
}
