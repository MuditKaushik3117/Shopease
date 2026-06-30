import { getProductById } from "@/services/productServices";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductById(id);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <img
            src={product.image}
            alt={product.name}
            className="rounded-2xl shadow-xl w-full"
          />

          <div>

            <h1 className="text-5xl font-bold">
              {product.name}
            </h1>

            <p className="text-3xl text-green-600 mt-6 font-bold">
              ₹{product.price}
            </p>

            <p className="mt-8 text-gray-600 leading-8">
              Premium quality product built for durability,
              performance and everyday use. Perfect for home,
              office and gaming setups.
            </p>

            <div className="flex gap-4 mt-10">

              <AddToCartButton product={product} />

              <AddToWishlistButton product={product} />

            </div>

          </div>

        </div>

      </main>

      <Footer />

    </>
  );
}


