"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    setOrders(storedOrders.reverse());
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-6 mb-6"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Order #{order.id}
            </h2>

            <p>Date: {order.date}</p>

            <p>Status: {order.status}</p>

            <p>Payment: {order.payment}</p>

            <p className="font-bold mt-2">
              Total: ₹{order.total}
            </p>

            <div className="mt-4">

              <h3 className="font-semibold mb-2">
                Items:
              </h3>

              {order.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="border rounded p-3 mb-2"
                >
                  <p>{item.name}</p>

                  <p>₹{item.price}</p>
                </div>
              ))}

            </div>

          </div>
        ))
      )}

    </div>
  );
}


