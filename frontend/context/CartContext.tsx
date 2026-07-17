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
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
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
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
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
    // Avoid duplicates
    if (wishlist.some((item) => item.id === product.id)) {
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
      return;
    }
    const updated = [...wishlist, product];
    setWishlist(updated);
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
  };

  const removeFromWishlist = (id: number) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
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
