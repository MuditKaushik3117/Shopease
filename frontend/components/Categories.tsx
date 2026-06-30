export default function Categories() {
    const categories = [
      "💻 Electronics",
      "🎮 Gaming",
      "⌨️ Accessories",
      "🖥️ Office",
    ];
  
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
  
        <h2 className="text-4xl font-bold text-center mb-12">
          Shop by Category
        </h2>
  
        <div className="grid md:grid-cols-4 gap-6">
  
          {categories.map((category) => (
            <div
              key={category}
              className="border rounded-xl p-8 text-center shadow hover:shadow-xl hover:-translate-y-2 transition cursor-pointer"
            >
              <h3 className="text-2xl font-semibold">
                {category}
              </h3>
            </div>
          ))}
  
        </div>
  
      </section>
    );
  }


  