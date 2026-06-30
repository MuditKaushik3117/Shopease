import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <p className="uppercase tracking-widest text-yellow-300 font-semibold mb-4">
            Welcome to ShopEase
          </p>

          <h1 className="text-6xl font-extrabold leading-tight">
            Discover Amazing
            <br />
            Tech Products
          </h1>

          <p className="mt-8 text-lg text-gray-200">
            Shop premium electronics, gaming accessories,
            office essentials and much more with unbeatable
            prices and fast delivery.
          </p>

          <div className="mt-10 flex gap-4">

            <Link href="/">
              <button className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition">
                Shop Now
              </button>
            </Link>

            <Link href="/about">
              <button className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-700 transition">
                Learn More
              </button>
            </Link>

          </div>

          <div className="grid grid-cols-3 gap-6 mt-14">

            <div>
              <h2 className="text-3xl font-bold">
                500+
              </h2>

              <p className="text-gray-200">
                Products
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                10K+
              </h2>

              <p className="text-gray-200">
                Customers
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                4.8★
              </h2>

              <p className="text-gray-200">
                Rating
              </p>
            </div>

          </div>
        </div>

        <div className="flex justify-center">

          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900"
            alt="Hero"
            className="rounded-3xl shadow-2xl"
          />

        </div>

      </div>
    </section>
  );
}


