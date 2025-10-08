import { useState } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
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
    <div className="relative pt-10 min-h-screen bg-black dark:bg-black overflow-hidden">

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Upload Clothes</h1>

        {/* Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-transparent backdrop-blur-2xl p-6 rounded-xl shadow max-w-lg"
        >
          <div className="mb-4">
            <label className="block font-medium mb-2">Cloth Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              placeholder="Enter cloth name"
            />
          </div>
          {/* quanity */}
          <div className="mb-4">
            <label className="block font-medium mb-2">quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              placeholder="Enter quantity"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              placeholder="Enter price"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-30 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              placeholder="Enter description"
            />
          </div>


          <div className="mb-6">
            <label className="block font-medium mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className=" rounded-2xl bg-gray-600 p-6"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Upload
          </button>
          {message&&<div className="text-white font-bold"><p>{message}</p></div>}
        </form>
      </main>
    </div>
  );
};

export default Dashboard;
