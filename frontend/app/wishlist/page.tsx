"use client";

import { useEffect, useState } from "react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    setWishlist(storedWishlist);
  }, []);

  const removeItem = (index: number) => {
    const updatedWishlist = wishlist.filter((_, i) => i !== index);

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlist.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 mb-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">
                {item.name}
              </h2>

              <p className="text-green-600">
                ₹{item.price}
              </p>
            </div>

            <button
              onClick={() => removeItem(index)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

