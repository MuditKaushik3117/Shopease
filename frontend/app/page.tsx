"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/productServices";
import { Search, ShoppingBag, X } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-slate-50 min-h-screen">
      
      {/* Hero Header */}
      <Hero />

      {/* Interactive Category Selector Grid */}
      <Categories 
        activeCategory={category}
        setActiveCategory={setCategory}
        categories={categories}
      />

      {/* Main Product Catalog Section */}
      <section id="featured-products" className="max-w-7xl mx-auto px-6 py-12 scroll-mt-20">
        
        {/* Controls: Search and Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-slate-100 pb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Discover Products
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Showing {filteredProducts.length} of {products.length} items
            </p>
          </div>

          {/* Search Bar Container */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button 
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400 border border-slate-100">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-950 mb-2">
              No products found
            </h3>
            <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
              We couldn't find anything matching your search. Try resetting filters or search criteria.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>
        )}

      </section>

    </main>
  );
}
