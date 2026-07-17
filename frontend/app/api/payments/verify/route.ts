import { NextResponse } from "next/server";
import crypto from "crypto";
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
  } catch (error) {
    console.error("Failed to initialize Razorpay SDK in Next.js:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    if (razorpayInstance && keySecret) {
      if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        return NextResponse.json(
          { success: false, message: "Missing required verification parameters" },
          { status: 400 }
        );
      }

      try {
        const shasum = crypto.createHmac("sha256", keySecret);
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = shasum.digest("hex");

        if (digest === razorpay_signature) {
          return NextResponse.json({
            success: true,
            message: "Payment verified successfully",
          });
        } else {
          return NextResponse.json(
            { success: false, message: "Invalid payment signature verification failed" },
            { status: 400 }
          );
        }
      } catch (error: any) {
        console.error("Signature verification error:", error);
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 500 }
        );
      }
    }

    // Fallback: Auto-verify mock transactions in demo mode
    return NextResponse.json({
      success: true,
      message: "Demo payment verified successfully (Mock Signature verification bypassed)",
      isMock: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Invalid request payload", error: error.message },
      { status: 400 }
    );
  }
}
