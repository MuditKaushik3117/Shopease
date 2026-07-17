"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShieldCheck, ArrowLeft, Truck, Landmark, Wallet, CreditCard, Loader2, CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Helper function to dynamically load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState("Razorpay Secure Payment");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock Modal States
  const [showMockModal, setShowMockModal] = useState(false);
  const [mockOrderId, setMockOrderId] = useState("");
  const [mockAmount, setMockAmount] = useState(0);

  // Load user name and email if logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (isLoggedIn) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.name) setName(user.name);
      if (user.email) setEmail(user.email);
    }
  }, []);

  // Calculations
  const subtotal = cart.reduce((sum: number, item: any) => sum + item.price, 0);
  const shippingCost = subtotal > 2000 || subtotal === 0 ? 0 : 99;
  const estimatedTax = Math.round(subtotal * 0.18);
  const total = subtotal + shippingCost + estimatedTax;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !city) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty. Cannot place an order.");
      return;
    }

    setIsProcessing(true);

    if (payment === "Cash on Delivery") {
      placeOfflineOrder();
    } else {
      await handleRazorpayPayment();
    }
  };

  const placeOfflineOrder = () => {
    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const order = {
      id: Date.now(),
      customer: name,
      address,
      city,
      payment: "Cash on Delivery",
      items: cart,
      total: total,
      date: new Date().toLocaleString(),
      status: "Confirmed",
    };

    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
    
    clearCart();
    setIsProcessing(false);

    toast.success("Order Placed Successfully!", {
      icon: "🎉",
      duration: 4000,
    });

    router.push("/orders");
  };

  const handleRazorpayPayment = async () => {
    try {
      // 1. Create order on the backend
      const orderResponse = await fetch(`${API_URL}/api/payments/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create order on the payment server.");
      }

      const orderData = await orderResponse.json();
      if (!orderData.success) {
        throw new Error(orderData.message || "Order creation returned failure status.");
      }

      const { orderId, amount, keyId, isMock } = orderData;

      // 2. Intercept mock orders to show custom local mock UI to avoid SDK Key ID verification errors
      if (isMock) {
        setMockOrderId(orderId);
        setMockAmount(amount);
        setShowMockModal(true);
        setIsProcessing(false);
        return;
      }

      // 3. Official Razorpay SDK Flow (if keys exist)
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load Razorpay payment SDK. Please check your internet connection.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: keyId,
        amount: amount,
        currency: "INR",
        name: "ShopEase Store",
        description: "Payment for Order Items",
        order_id: orderId,
        handler: async function (response: any) {
          setIsProcessing(true);
          await verifyPaymentOnBackend(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature
          );
        },
        prefill: {
          name: name,
          email: email || "customer@example.com",
        },
        theme: {
          color: "#4f46e5",
        },
        modal: {
          ondismiss: function () {
            toast.error("Payment flow cancelled by user.");
            setIsProcessing(false);
          },
        },
      };

      const razorpayObject = new (window as any).Razorpay(options);
      razorpayObject.open();

    } catch (error: any) {
      console.error("Payment initiation failed:", error);
      toast.error(error.message || "Could not connect to payment gateway. Please try again.");
      setIsProcessing(false);
    }
  };

  // Helper to verify payment details on the backend
  const verifyPaymentOnBackend = async (paymentId: string, orderId: string, signature: string) => {
    try {
      const verifyResponse = await fetch(`${API_URL}/api/payments/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
          razorpay_signature: signature,
        }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyData.success) {
        const existingOrders = JSON.parse(
          localStorage.getItem("orders") || "[]"
        );

        const order = {
          id: Date.now(),
          customer: name,
          address,
          city,
          payment: `Razorpay (${paymentId})`,
          items: cart,
          total: total,
          date: new Date().toLocaleString(),
          status: "Confirmed",
        };

        existingOrders.push(order);
        localStorage.setItem("orders", JSON.stringify(existingOrders));

        clearCart();

        toast.success("Payment Verified! Order Placed Successfully.", {
          icon: "🎉",
          duration: 4000,
        });

        router.push("/orders");
      } else {
        toast.error(verifyData.message || "Payment signature verification failed.");
      }
    } catch (verifyError) {
      console.error("Verification endpoint failed:", verifyError);
      toast.error("Payment verification failed. Please contact support.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Simulate payment actions from Mock Modal
  const simulatePaymentSuccess = async () => {
    setShowMockModal(false);
    setIsProcessing(true);
    
    // Simulate a random payment ID
    const randomPayId = "pay_mock_" + Math.random().toString(36).substring(2, 10).toUpperCase();
    
    await verifyPaymentOnBackend(
      randomPayId,
      mockOrderId,
      "mock_signature_digest_122001"
    );
  };

  const simulatePaymentCancel = () => {
    setShowMockModal(false);
    toast.error("Payment cancelled by user.");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:py-12 min-h-[70vh]">
      
      {/* Back link */}
      <div className="mb-6">
        <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition">
          <ArrowLeft className="w-4 h-4" /> Back to shopping cart
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Checkout</h1>
        <p className="text-slate-500 text-sm">Please verify your shipping details and select a payment method.</p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-sm max-w-lg mx-auto mt-6">
          <h3 className="text-xl font-bold text-slate-950 mb-2">No items to checkout</h3>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            You don't have any items in your cart to checkout.
          </p>
          <Link href="/">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-md shadow-indigo-100">
              Go Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Grid: Shipping Form & Payment */}
          <form onSubmit={handleCheckout} className="lg:col-span-8 space-y-6">
            
            {/* Shipping Details Block */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4 border-b border-slate-50 pb-2">
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-slate-50/50 focus:bg-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="Suite, apartment, street name"
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-slate-50/50 focus:bg-white"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    City / Town
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gurgaon"
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-slate-50/50 focus:bg-white"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Postal Code (ZIP)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 122001"
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-slate-50/50 focus:bg-white"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Details Block */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4 border-b border-slate-50 pb-2">
                Payment Method
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Razorpay Gateway Option */}
                <button
                  type="button"
                  onClick={() => setPayment("Razorpay Secure Payment")}
                  className={`flex flex-col items-center justify-center p-5 rounded-xl border text-center transition cursor-pointer ${
                    payment === "Razorpay Secure Payment"
                      ? "border-indigo-600 bg-indigo-50/30 text-indigo-700 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-650"
                  }`}
                >
                  <CreditCard className="w-6 h-6 mb-2 text-indigo-600" />
                  <span className="text-xs">Razorpay Secure Checkout</span>
                  <span className="text-[9px] text-slate-400 font-medium mt-1">UPI, Cards, NetBanking</span>
                </button>

                {/* Cash option */}
                <button
                  type="button"
                  onClick={() => setPayment("Cash on Delivery")}
                  className={`flex flex-col items-center justify-center p-5 rounded-xl border text-center transition cursor-pointer ${
                    payment === "Cash on Delivery"
                      ? "border-indigo-600 bg-indigo-50/30 text-indigo-700 font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-650"
                  }`}
                >
                  <Wallet className="w-6 h-6 mb-2 text-indigo-650" />
                  <span className="text-xs">Cash on Delivery</span>
                  <span className="text-[9px] text-slate-400 font-medium mt-1">Pay when item is delivered</span>
                </button>

              </div>
            </div>

            {/* Confirm button */}
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 hover:shadow-xl hover:shadow-indigo-200 active:scale-[0.99] transition duration-200 cursor-pointer text-center flex items-center justify-center gap-2 ${
                isProcessing ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing Payment...
                </>
              ) : (
                <>Confirm and Place Order</>
              )}
            </button>

          </form>

          {/* Right Grid: Order Summary Panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900 mb-6">Review Order</h2>

              {/* Items List */}
              <div className="max-h-48 overflow-y-auto mb-6 divide-y divide-slate-50 pr-1">
                {cart.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center py-3 text-xs">
                    <div className="flex gap-2.5 items-center">
                      <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg overflow-hidden flex items-center justify-center p-1">
                        <img src={item.image} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 line-clamp-1">{item.name}</p>
                        <p className="text-[9px] text-slate-400 font-medium">Qty: 1</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-700">₹{item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-3.5 text-sm border-t border-b border-slate-100 py-5">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-slate-850">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Shipping Cost</span>
                  <span className="text-slate-850">
                    {shippingCost === 0 
                      ? <span className="text-emerald-600 font-bold">Free</span> 
                      : `₹${shippingCost}`
                    }
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Estimated GST (18%)</span>
                  <span className="text-slate-850">₹{estimatedTax.toLocaleString()}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-baseline pt-5 mb-1">
                <span className="text-sm font-bold text-slate-950">Total Amount</span>
                <span className="text-2xl font-black text-slate-950">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              {/* Security Banner */}
              <div className="mt-6 flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-indigo-650 shrink-0" />
                <p className="text-[10px] text-slate-400 leading-normal font-medium">
                  Your payment data is fully encrypted. Orders are protected by direct seller verification.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* RAZORPAY MOCK PAYMENT DIALOG OVERLAY */}
      {showMockModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl border border-slate-100 overflow-hidden shadow-2xl animate-scaleIn">
            
            {/* Modal Header */}
            <div className="bg-indigo-600 text-white p-6 relative flex flex-col items-center">
              <button 
                onClick={simulatePaymentCancel}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="bg-white/10 p-2 rounded-xl mb-3">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-base font-extrabold uppercase tracking-wider">Razorpay Checkout</h3>
              <p className="text-[10px] text-indigo-200 mt-0.5">SECURE SANDBOX ENVIRONMENT</p>
              
              <div className="mt-4 bg-white/15 px-4 py-1.5 rounded-full text-xs font-bold">
                Order ID: <span className="font-extrabold text-indigo-100">{mockOrderId.substring(0, 18)}...</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              
              {/* Payment Summary */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center text-sm">
                <div>
                  <p className="text-xs text-slate-500 font-semibold mb-0.5">Payable Amount</p>
                  <p className="text-xs font-bold text-slate-800">ShopEase E-Commerce Order</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-indigo-650">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Demo Notice */}
              <div className="bg-indigo-50/50 border border-indigo-100 text-indigo-850 p-4.5 rounded-2xl text-xs space-y-1.5 leading-relaxed font-semibold">
                <div className="flex items-center gap-1.5 text-indigo-700 font-bold mb-1 uppercase tracking-wider text-[10px]">
                  <CheckCircle2 className="w-4 h-4 fill-indigo-100 text-indigo-700" /> Prototyping Mode Active
                </div>
                <p className="text-slate-500 leading-normal">
                  No merchant keys are active in the configuration. Use the actions below to simulate payment operations.
                </p>
              </div>

              {/* Simulation Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={simulatePaymentSuccess}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-md shadow-emerald-100 transition cursor-pointer text-center text-sm"
                >
                  Simulate Payment SUCCESS
                </button>
                <button
                  onClick={simulatePaymentCancel}
                  className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-bold py-3.5 rounded-2xl transition cursor-pointer text-center text-sm"
                >
                  Cancel / Decline Payment
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
