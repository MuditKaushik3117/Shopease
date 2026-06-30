"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");

  const placeOrder = () => {
    if (!name || !address || !city) {
      alert("Please fill all fields");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const order = {
      id: Date.now(),
      customer: name,
      address,
      city,
      payment,
      items: cart,
      total: cart.reduce(
        (sum: number, item: any) => sum + item.price,
        0
      ),
      date: new Date().toLocaleString(),
      status: "Confirmed",
    };

    existingOrders.push(order);

    localStorage.setItem(
      "orders",
      JSON.stringify(existingOrders)
    );

    localStorage.removeItem("cart");

    router.push("/orders");
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Address"
          className="w-full border p-3 rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="text"
          placeholder="City"
          className="w-full border p-3 rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <select
          className="w-full border p-3 rounded"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        >
          <option>Cash on Delivery</option>
          <option>UPI</option>
          <option>Credit Card</option>
        </select>

        <button
          onClick={placeOrder}
          className="w-full bg-green-600 text-white py-3 rounded"
        >
          Place Order
        </button>

      </div>
    </div>
  );
}

