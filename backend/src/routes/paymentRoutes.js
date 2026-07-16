const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const router = express.Router();

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

let razorpayInstance = null;
if (keyId && keySecret) {
  try {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
    console.log("Razorpay SDK initialized successfully with credentials.");
  } catch (error) {
    console.error("Failed to initialize Razorpay SDK:", error);
  }
} else {
  console.log("Razorpay credentials not found in environment. Using demo mock fallback mode.");
}

// Route to create a Razorpay Order
router.post("/order", async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount) {
    return res.status(400).json({ success: false, message: "Amount is required" });
  }

  const amountInPaisa = Math.round(Number(amount) * 100);

  // If Razorpay API is configured, create a real order
  if (razorpayInstance) {
    const options = {
      amount: amountInPaisa,
      currency: currency || "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    try {
      const order = await razorpayInstance.orders.create(options);
      return res.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: keyId,
        isMock: false,
      });
    } catch (err) {
      console.error("Razorpay order creation failed:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // Fallback: Mock Razorpay Order for demo mode
  return res.json({
    success: true,
    orderId: `order_mock_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    amount: amountInPaisa,
    currency: currency || "INR",
    keyId: "rzp_test_mockKeyId122001",
    isMock: true,
  });
});

// Route to verify Razorpay Payment Signature
router.post("/verify", (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  if (razorpayInstance && keySecret) {
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing required verification parameters" });
    }

    try {
      const shasum = crypto.createHmac("sha256", keySecret);
      shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const digest = shasum.digest("hex");

      if (digest === razorpay_signature) {
        return res.json({ success: true, message: "Payment verified successfully" });
      } else {
        return res.status(400).json({ success: false, message: "Invalid payment signature verification failed" });
      }
    } catch (error) {
      console.error("Signature verification error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // Fallback: Auto-verify mock transactions in demo mode
  return res.json({
    success: true,
    message: "Demo payment verified successfully (Mock Signature verification bypassed)",
    isMock: true,
  });
});

module.exports = router;
