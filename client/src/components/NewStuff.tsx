import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number; // price in base currency (NGN)
}

const mockProduct: Product[] = [
  {
    id: "1",
    name: "Genaire Classic Tee",
    imageUrl: "https://picsum.photos/200",
    price: 12000, // example NGN price
  },
  {
    id: "2",
    name: "Genaire Denim Jacket",
    imageUrl: "https://picsum.photos/200",
    price: 35000,
  },
  {
    id: "3",
    name: "Genaire Summer Dress",
    imageUrl: "https://picsum.photos/200",
    price: 22000,
  },
];

export default function NewStuff() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Currency state
  const [rates, setRates] = useState<Record<string, number>>({});
  const [targetCurrency, setTargetCurrency] = useState("NGN");
  const [currencyLoading, setCurrencyLoading] = useState(true);
  const [currencyError, setCurrencyError] = useState<string | null>(null);

  useEffect(() => {
    // Mock fetch products
    const timer = setTimeout(() => {
      setProducts(mockProduct);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchRates() {
      setCurrencyLoading(true);
      setCurrencyError(null);
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/21e782ea8cdaba64e46ce9dd/latest/NGN`
        );
        const data = await res.json();
        if (data.result === "success") {
          setRates(data.conversion_rates);
        } else {
          setCurrencyError("Failed to fetch exchange rates");
        }
      } catch (err) {
        setCurrencyError("Network error");
      }
      setCurrencyLoading(false);
    }
    fetchRates();
  }, []);

  function convertPrice(price: number) {
    if (!rates[targetCurrency]) return price.toFixed(2);
    return (price * rates[targetCurrency]).toFixed(2);
  }

  if (loading || currencyLoading)
    return (
      <div className="flex my-5 items-center justify-center w-full">
        <Loading />
      </div>
    );

  if (error)
    return <p className="text-red-600">Error loading products: {error}</p>;

  if (currencyError)
    return <p className="text-red-600">Currency Error: {currencyError}</p>;

  if (products.length === 0)
    return (
      <div className="w-full flex items-center justify-center">
        <p className="font-bold">No products found</p>
      </div>
    );

  return (
    <section className="my-12 max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">New Arrivals</h2>

        <select
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          {Object.keys(rates).map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-medium">{product.name}</h3>
            <p className="text-indigo-600 font-semibold mt-2">
              {convertPrice(product.price)} {targetCurrency}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
