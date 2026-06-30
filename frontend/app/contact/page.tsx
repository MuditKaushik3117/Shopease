import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16 min-h-screen">

        <h1 className="text-5xl font-bold mb-8">
          Contact Us
        </h1>

        <div className="space-y-5 text-lg">

          <p>
            📧 Email: support@shopease.com
          </p>

          <p>
            📞 Phone: +91 9876543210
          </p>

          <p>
            📍 Gurgaon, Haryana, India
          </p>

        </div>

      </main>

      <Footer />
    </>
  );
}

