import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

let razorpayInstance: any = null;
if (keyId && keySecret) {
  try {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
    console.log("Razorpay SDK initialized successfully with credentials in Next.js.");
  } catch (error) {
    console.error("Failed to initialize Razorpay SDK in Next.js:", error);
  }
} else {
  console.log("Razorpay credentials not found in environment. Using demo mock fallback mode.");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency } = body;

    if (!amount) {
      return NextResponse.json(
        { success: false, message: "Amount is required" },
        { status: 400 }
      );
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
        return NextResponse.json({
          success: true,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          keyId: keyId,
          isMock: false,
        });
      } catch (err: any) {
        console.error("Razorpay order creation failed:", err);
        return NextResponse.json(
          { success: false, error: err.message },
          { status: 500 }
        );
      }
    }

    // Fallback: Mock Razorpay Order for demo mode
    return NextResponse.json({
      success: true,
      orderId: `order_mock_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      amount: amountInPaisa,
      currency: currency || "INR",
      keyId: "rzp_test_mockKeyId122001",
      isMock: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Invalid request payload", error: error.message },
      { status: 400 }
    );
  }
}
