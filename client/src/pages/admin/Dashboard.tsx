import { useState } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const api = import.meta.env.VITE_API_URL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title || !price || !image || !description || !quantity) {
      toast.error("Please fill all fields before submitting.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("image", image);

    try {
      const res = await fetch(`${api}/api/products`, {
        method: "POST",
        body: formData, // send directly, no JSON.stringify
      });

      if (res.ok) {
        toast.success("Product added successfully");
      }

      const data = await res.json();
      toast.success("Product added successfully");
      console.info("Response:", data);
    } catch (err) {
      toast.error("Failed to upload product");
      console.error(`Error: ${(err as Error).message}`);
    }

    console.log([...formData.entries()])

    // Reset form
    setTitle("");
    setPrice("");
    setImage(null);
    setDescription("");
    setQuantity("");
  };


  return (
  <div className="relative pt-20 min-h-screen bg-black dark:bg-black text-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
    <main className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6 sm:mb-8">
        Upload Clothes
      </h1>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        
        {/* Cloth Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Cloth Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-800 border border-gray-600 
              focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition-all outline-none"
            placeholder="Enter cloth name"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-800 border border-gray-600 
              focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition-all outline-none"
            placeholder="Enter quantity"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Price (₦)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-800 border border-gray-600 
              focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition-all outline-none"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-800 border border-gray-600 
              focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition-all outline-none resize-none"
            placeholder="Enter description"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Image
          </label>
          <div className="relative w-full border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 transition-all">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              required
            />
            <p className="text-gray-400 text-sm sm:text-base">
              Click or drag an image here
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 sm:py-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
            hover:from-blue-700 hover:to-indigo-700 font-semibold text-white text-base sm:text-lg 
            transition-all shadow-md hover:shadow-blue-500/40"
        >
          Upload
        </button>

        {/* Message */}
        {/* {message && (
          <div className="text-center mt-4 font-semibold text-green-400 text-sm sm:text-base">
            {message}
          </div>
        )} */}
      </form>
    </main>
  </div>
);


};

export default Dashboard;
