import React, { useEffect, useState, useRef } from "react";
import ExchangeRateConverter from "@/components/ExchangeRateConverter";
import { useCart } from "@/lib/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  dateAdded?: string;
}

type SortOption = "alphabetical" | "priceAsc" | "priceDesc" | "dateAdded";

const mockProducts: Product[] = [
  { id: 1, name: "T-Shirt", price: 20, image: "/img1.jpg", inStock: true },
  { id: 2, name: "Sneakers", price: 50, image: "/img2.jpg", inStock: true },
  { id: 3, name: "Hat", price: 10, image: "/img3.jpg", inStock: false },
];

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceMin, setPriceMin] = useState<number | "">("");
  const [priceMax, setPriceMax] = useState<number | "">("");
  const [sortBy, setSortBy] = useState<SortOption>("alphabetical");

  const { addToCart } = useCart();

  // Quantity state mapped by product ID
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  // Currency state
  const [currency, setCurrency] = useState("NGN");
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({ NGN: 1 });

  // Close panel on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterPanelOpen && panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setFilterPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterPanelOpen]);

  // Initial product load & set default quantities
  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);

    const initialQuantities: Record<number, number> = {};
    mockProducts.forEach((p) => {
      initialQuantities[p.id] = 1;
    });
    setQuantities(initialQuantities);
  }, []);

  // Filtering & sorting logic (with converted prices)
  useEffect(() => {
    let temp = [...products];
    const rate = exchangeRates[currency] ?? 1;

    if (inStockOnly) {
      temp = temp.filter((p) => p.inStock);
    }
    if (priceMin !== "") {
      temp = temp.filter((p) => p.price * rate >= priceMin);
    }
    if (priceMax !== "") {
      temp = temp.filter((p) => p.price * rate <= priceMax);
    }

    switch (sortBy) {
      case "alphabetical":
        temp.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "priceAsc":
        temp.sort((a, b) => a.price * rate - b.price * rate);
        break;
      case "priceDesc":
        temp.sort((a, b) => b.price * rate - a.price * rate);
        break;
      case "dateAdded":
        temp.sort(
          (a, b) =>
            new Date(b.dateAdded ?? 0).getTime() - new Date(a.dateAdded ?? 0).getTime()
        );
        break;
    }

    setFilteredProducts(temp);
  }, [inStockOnly, priceMin, priceMax, sortBy, products, currency, exchangeRates]);

  // Quantity change handler
  const handleQuantityChange = (id: number, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, value),
    }));
  };

  return (
    <section className="max-w-7xl mx-auto p-4 relative">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products ({filteredProducts.length})</h1>

        <div className="flex items-center space-x-4">
          <ExchangeRateConverter
            baseCurrency="NGN"
            selectedCurrency={currency}
            onCurrencyChange={(cur, rates) => {
              setCurrency(cur);
              setExchangeRates(rates);
            }}
          />
          <button
            onClick={() => setFilterPanelOpen(true)}
            className="text-indigo-600 px-3 py-1 border-b-2 border-transparent hover:border-indigo-600 hover:text-indigo-800 transition"
          >
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">No products found.</p>
        ) : (
          filteredProducts.map(({ id, name, price, image, inStock }) => {
            const rate = exchangeRates[currency] ?? 1;
            const convertedPrice = (price * rate).toFixed(2);
            const quantity = quantities[id] ?? 1;

            return (
              <div
                key={id}
                className="border rounded-md overflow-hidden shadow hover:shadow-lg transition relative flex flex-col"
              >
                <img src={image} alt={name} className="w-full h-40 object-cover" />
                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg">{name}</h3>
                  <p className="text-indigo-600 font-bold mt-1 mb-3">
                    {currency} {convertedPrice}
                  </p>
                  {!inStock && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
                      Out of stock
                    </span>
                  )}

                  <label className="flex items-center space-x-2 mt-auto">
                    <span>Qty:</span>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => handleQuantityChange(id, Number(e.target.value))}
                      className="w-16 border rounded px-2 py-1 text-center"
                    />
                  </label>

                  <button
                    onClick={() =>
                      addToCart({
                        id,
                        name,
                        price,
                        quantity,
                        image,
                      })
                    }
                    disabled={!inStock}
                    className={`mt-3 w-full py-2 rounded text-white font-semibold ${
                      inStock ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {filterPanelOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-40 z-40"></div>

          <aside
            ref={panelRef}
            className="fixed right-0 top-0 h-full w-72 bg-white shadow-lg z-50 p-6 flex flex-col"
            aria-label="Filter panel"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={() => setFilterPanelOpen(false)}
                aria-label="Close filters"
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                &#x2715;
              </button>
            </div>

            <label className="flex items-center space-x-2 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span>In Stock Only</span>
            </label>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Price Range ({currency})</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) =>
                    setPriceMin(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  className="border rounded px-3 py-2 w-1/2"
                  min={0}
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) =>
                    setPriceMax(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  className="border rounded px-3 py-2 w-1/2"
                  min={0}
                />
              </div>
            </div>

            <div>
              <label htmlFor="sortBy" className="block mb-1 font-medium">
                Sort by
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="alphabetical">Alphabetically</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="dateAdded">Date Added</option>
              </select>
            </div>
          </aside>
        </>
      )}
    </section>
  );
};

export default Shop;
