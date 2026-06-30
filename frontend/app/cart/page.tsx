"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(storedCart);
  }, []);

  const removeItem = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg">
          Your cart is empty.
        </p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 mb-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  {item.name}
                </h2>

                <p className="text-green-600 font-bold">
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
          ))}

          <div className="mt-8 border-t pt-6">
            <h2 className="text-3xl font-bold mb-6">
              Total: ₹{total}
            </h2>

            <Link href="/checkout">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}


