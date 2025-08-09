import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number; // Price in base currency
}

interface ExchangeRateConverterProps {
  baseCurrency?: string;
  products: Product[];
}

const ExchangeRateConverter: React.FC<ExchangeRateConverterProps> = ({
  baseCurrency = "NGN",
  products = [],
}) => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [targetCurrency, setTargetCurrency] = useState("NGN");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch exchange rates once on mount or baseCurrency change
  useEffect(() => {
    async function fetchRates() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/21e782ea8cdaba64e46ce9dd/latest/${baseCurrency}`
        );
        const data = await res.json();
        if (data.result === "success") {
          setRates(data.conversion_rates);
        } else {
          setError("Failed to fetch exchange rates");
        }
      } catch (err) {
        setError("Network error");
      }
      setLoading(false);
    }
    fetchRates();
  }, [baseCurrency]);

  const currencies = Object.keys(rates);

  function convertPrice(price: number): string {
    if (!rates[targetCurrency]) return price.toFixed(2);
    const converted = price * rates[targetCurrency];
    return converted.toFixed(2);
  }

  if (loading) return <div>Loading exchange rates...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <label htmlFor="currency-select" className="block mb-2 font-semibold">
        Select Currency:
      </label>
      <select
        id="currency-select"
        value={targetCurrency}
        onChange={(e) => setTargetCurrency(e.target.value)}
        className="border p-2 rounded"
      >
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>

      
    </div>
  );
};

export default ExchangeRateConverter;
