"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, ChevronDown, ChevronUp, Package, Calendar, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    const storedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );
    setOrders(storedOrders.reverse());
  }, []);

  const toggleExpand = (orderId: number) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-emerald-50 border-emerald-100 text-emerald-700";
      case "processing":
      case "confirmed":
      default:
        return "bg-indigo-50 border-indigo-150 text-indigo-700";
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:py-12 min-h-[70vh]">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">My Orders</h1>
        <p className="text-slate-500 text-sm">
          {orders.length === 0 
            ? "You haven't placed any orders yet." 
            : `Track and review your past ${orders.length} orders.`
          }
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-sm max-w-lg mx-auto mt-6">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400 border border-slate-100">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-950 mb-2">No orders found</h3>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            You don't have any order records in this account. Once you buy something from the store, it will show up here.
          </p>
          <Link href="/">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-md shadow-indigo-100">
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        /* Orders Accordion List */
        <div className="space-y-6">
          {orders.map((order) => {
            const isExpanded = expandedOrder === order.id;
            return (
              <div
                key={order.id}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-200"
              >
                {/* Header Card Summary */}
                <div 
                  onClick={() => toggleExpand(order.id)}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none bg-slate-50/30"
                >
                  <div className="grid grid-cols-2 sm:flex sm:items-center gap-x-6 gap-y-2">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Order Number</p>
                      <span className="text-sm font-extrabold text-slate-900">#{order.id}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Date Placed</p>
                      <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> {order.date.split(",")[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Grand Total</p>
                      <span className="text-sm font-black text-slate-950">₹{order.total.toLocaleString()}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Item Qty</p>
                      <span className="text-xs font-semibold text-slate-700">
                        {order.items.length} {order.items.length === 1 ? "item" : "items"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-slate-100 pt-3 sm:pt-0 sm:border-0">
                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                    <button className="text-slate-400 hover:text-slate-650 transition">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Details Body */}
                {isExpanded && (
                  <div className="border-t border-slate-100 p-5 sm:p-6 bg-white space-y-6 animate-fadeIn">
                    
                    {/* Grid columns */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                      
                      {/* Products items summary (col-8) */}
                      <div className="md:col-span-7 space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Purchased Items</h4>
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex items-center justify-center p-1.5 border border-slate-100 shrink-0">
                              <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="flex-grow">
                              <p className="text-xs font-bold text-slate-900 line-clamp-1">{item.name}</p>
                              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Category: {item.category || "Tech"}</p>
                            </div>
                            <span className="text-sm font-extrabold text-slate-800">₹{item.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      {/* Delivery address details (col-5) */}
                      <div className="md:col-span-5 bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4 text-xs text-slate-600">
                        <div>
                          <h4 className="font-extrabold text-slate-900 mb-2 uppercase text-[10px] tracking-wider">Shipping Destination</h4>
                          <p className="font-bold text-slate-850">{order.customer}</p>
                          <p className="text-slate-500 mt-1 leading-relaxed">{order.address}, {order.city}</p>
                        </div>
                        <div className="pt-3 border-t border-slate-200">
                          <h4 className="font-extrabold text-slate-900 mb-1.5 uppercase text-[10px] tracking-wider">Payment Details</h4>
                          <p className="font-semibold text-slate-700">Method: {order.payment}</p>
                          <p className="font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                            <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-50 text-emerald-600" /> Transaction Verified
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
