import { LayoutGrid, Cpu, Gamepad2, MousePointer } from "lucide-react";

type CategoriesProps = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
};

export default function Categories({
  activeCategory,
  setActiveCategory,
  categories,
}: CategoriesProps) {
  
  // Icon and theme mapping
  const getCategoryTheme = (name: string) => {
    switch (name.toLowerCase()) {
      case "all":
        return {
          icon: <LayoutGrid className="w-5 h-5" />,
          color: "border-slate-200 text-slate-800 bg-slate-50 hover:bg-slate-100 hover:border-slate-300",
          activeColor: "border-indigo-600 text-indigo-700 bg-indigo-50/50 shadow-sm",
        };
      case "electronics":
        return {
          icon: <Cpu className="w-5 h-5" />,
          color: "border-blue-100 text-blue-700 bg-blue-50/20 hover:bg-blue-50/50 hover:border-blue-200",
          activeColor: "border-blue-600 text-blue-800 bg-blue-50 shadow-sm",
        };
      case "gaming":
        return {
          icon: <Gamepad2 className="w-5 h-5" />,
          color: "border-purple-100 text-purple-700 bg-purple-50/20 hover:bg-purple-50/50 hover:border-purple-200",
          activeColor: "border-purple-600 text-purple-800 bg-purple-50 shadow-sm",
        };
      case "accessories":
      default:
        return {
          icon: <MousePointer className="w-5 h-5" />,
          color: "border-amber-100 text-amber-700 bg-amber-50/20 hover:bg-amber-50/50 hover:border-amber-200",
          activeColor: "border-amber-600 text-amber-800 bg-amber-50 shadow-sm",
        };
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
          Shop by Category
        </h2>
        <div className="w-12 h-1 bg-indigo-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const theme = getCategoryTheme(category);
          const isActive = activeCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center justify-center gap-3 border rounded-2xl p-5 text-base font-bold transition duration-300 cursor-pointer ${
                isActive ? theme.activeColor : theme.color
              }`}
            >
              <div className={`p-2 rounded-xl transition ${isActive ? "bg-white" : "bg-white/70"}`}>
                {theme.icon}
              </div>
              <span>{category}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}