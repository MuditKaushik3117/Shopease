"use client";

export default function AddToWishlistButton({
  product,
}: {
  product: any;
}) {

  const addToWishlist = () => {

    const wishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    wishlist.push(product);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    alert("Added to Wishlist ❤️");
  };

  return (
    <button
      onClick={addToWishlist}
      className="mt-4 bg-pink-500 text-white px-6 py-3 rounded"
    >
      ❤️ Add to Wishlist
    </button>
  );
}

