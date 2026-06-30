"use client";

export default function AddToCartButton({
  product,
}: {
  product: any;
}) {
  const addToCart = () => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    cart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Product added to cart!");
  };

  return (
    <button
      onClick={addToCart}
      className="mt-6 bg-black text-white px-6 py-3 rounded"
    >
      Add To Cart
    </button>
  );
}

