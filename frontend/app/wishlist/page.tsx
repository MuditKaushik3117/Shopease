"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:py-12 min-h-[70vh]">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">My Wishlist</h1>
        <p className="text-slate-500 text-sm">
          {wishlist.length === 0 
            ? "Your wishlist is empty." 
            : `You have saved ${wishlist.length} items for later.`
          }
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-sm max-w-lg mx-auto mt-6">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400 border border-slate-100">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-950 mb-2">Your wishlist is empty</h3>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            Explore our collection and tap the heart icon on any item to save it here for later.
          </p>
          <Link href="/">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-md shadow-indigo-100">
              Discover Products
            </button>
          </Link>
        </div>
      ) : (
        /* Wishlist Items Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition duration-200 overflow-hidden flex flex-col h-full"
            >
              {/* Product Thumbnail */}
              <div className="aspect-square bg-slate-50 overflow-hidden relative border-b border-slate-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Category tag */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {item.category || "Tech"}
                </span>

                {/* Remove shortcut */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-full shadow-sm border border-slate-100 transition duration-200 cursor-pointer"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-slate-900 line-clamp-1 mb-1">
                  {item.name}
                </h2>
                <p className="text-xl font-black text-slate-900 mb-6">
                  ₹{item.price.toLocaleString()}
                </p>

                {/* Actions Grid */}
                <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                  <Link href={`/products/${item.id}`} className="w-full">
                    <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition cursor-pointer">
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="w-full flex items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 rounded-xl transition cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
