import Link from "next/link";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group">

      <div className="overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
        />
      </div>

      <div className="p-5">

        <h3 className="text-xl font-semibold mb-2">
          {name}
        </h3>

        <p className="text-2xl font-bold text-green-600 mb-5">
          ₹{price}
        </p>

        <Link href={`/products/${id}`}>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">
            View Details
          </button>
        </Link>

      </div>

    </div>
  );
}

