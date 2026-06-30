import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold text-green-600">
        🎉 Order Placed!
      </h1>

      <p className="mt-4 text-lg">
        Thank you for shopping with us.
      </p>

      <Link href="/">
        <button className="mt-8 bg-black text-white px-6 py-3 rounded">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}


