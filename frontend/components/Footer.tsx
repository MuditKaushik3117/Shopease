import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-3xl font-bold text-blue-500">
            ShopEase
          </h2>

          <p className="mt-4 text-gray-400 leading-7">
            A modern e-commerce platform built using
            Next.js, React, Tailwind CSS and Express.js.
          </p>
        </div>

        <div>

          <h3 className="text-xl font-semibold mb-5">
            Quick Links
          </h3>

          <div className="space-y-3">

            <Link href="/" className="block hover:text-blue-400">
              Home
            </Link>

            <Link href="/about" className="block hover:text-blue-400">
              About
            </Link>

            <Link href="/contact" className="block hover:text-blue-400">
              Contact
            </Link>

            <Link href="/orders" className="block hover:text-blue-400">
              Orders
            </Link>

          </div>

        </div>

        <div>

          <h3 className="text-xl font-semibold mb-5">
            Contact
          </h3>

          <p>📧 support@shopease.com</p>

          <p className="mt-2">
            📞 +91 9876543210
          </p>

          <p className="mt-2">
            📍 Gurgaon, India
          </p>

        </div>

      </div>

      <div className="border-t border-gray-800 text-center py-5 text-gray-500">
        © 2026 ShopEase. All Rights Reserved.
      </div>

    </footer>
  );
}

