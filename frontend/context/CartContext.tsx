"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext<any>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error("Error parsing cart data", e);
      }
    }
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (e) {
        console.error("Error parsing wishlist data", e);
      }
    }
    setIsMounted(true);
  }, []);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const updated = [...prev, product];
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
    toast.success(`${product.name} added to cart!`, {
      icon: "🛒",
      style: {
        borderRadius: "12px",
        background: "#0f172a",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "500",
      },
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
    toast.success("Item removed from cart.", {
      style: {
        borderRadius: "12px",
        background: "#0f172a",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "500",
      },
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const addToWishlist = (product: any) => {
    setWishlist((prev) => {
      // Avoid duplicates
      if (prev.some((item) => item.id === product.id)) {
        toast(`${product.name} is already in wishlist!`, {
          icon: "❤️",
          style: {
            borderRadius: "12px",
            background: "#0f172a",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "500",
          },
        });
        return prev;
      }
      const updated = [...prev, product];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      toast.success(`${product.name} added to wishlist!`, {
        icon: "❤️",
        style: {
          borderRadius: "12px",
          background: "#0f172a",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "500",
        },
      });
      return updated;
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
    toast.success("Removed from wishlist.", {
      style: {
        borderRadius: "12px",
        background: "#0f172a",
        color: "#fff",
        fontSize: "14px",
        fontWeight: "500",
      },
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart: isMounted ? cart : [],
        wishlist: isMounted ? wishlist : [],
        addToCart,
        removeFromCart,
        clearCart,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
