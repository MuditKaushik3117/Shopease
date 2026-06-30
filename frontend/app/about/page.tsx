import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-16 min-h-screen">
        <h1 className="text-5xl font-bold mb-8">
          About ShopEase
        </h1>

        <p className="text-lg leading-8 text-gray-700">
          ShopEase is a modern e-commerce platform built using
          Next.js, React, Tailwind CSS and Express.js.
        </p>

        <p className="mt-6 text-lg leading-8 text-gray-700">
          This project demonstrates a complete shopping workflow
          including product browsing, wishlist, cart management,
          checkout, authentication and order history.
        </p>

        <p className="mt-6 text-lg leading-8 text-gray-700">
          It was developed as a portfolio project to showcase
          full-stack web development skills.
        </p>
      </main>

      <Footer />
    </>
  );
}

