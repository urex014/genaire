import { useNavigate } from "react-router-dom"
import { useCart } from "@/utils/CartContext";
import { MessageCircleIcon } from "lucide-react";


function Checkout() {
  const {cart }= useCart()
  const navigate = useNavigate()
  function WAredirect() {
  // Access the items array from the cart context
  const message = encodeURIComponent(
    `Hi. I would love to purchase:\n\n${cart
      .map(
        (item) =>
          `• ${item.title} (Qty: ${item.quantity}, Price: ₦${item.price.toLocaleString()})`
      )
      .join("\n")}\n\nTotal: ₦${cart
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toLocaleString()}`
  );

  
  window.open(`https://wa.me/2349067762949?text=${message}`, "_blank");
}

  return (
  <div className="min-h-screen flex items-center justify-center bg-black px-4">
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 text-center max-w-md w-full">
      <h1 className="text-3xl font-semibold text-white mb-4">
        Proceed to WhatsApp Checkout?
      </h1>
      <p className="text-gray-400 mb-8">
        You’re about to place your order via WhatsApp. Confirm to continue or cancel to go back to the shop.
      </p>

      <div className="flex justify-center gap-6">
        <button
          onClick={WAredirect}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]"
        >
          <MessageCircleIcon size={20} color="#fff" />
          Confirm
        </button>

        <button
          onClick={() => navigate('/shop')}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

}

export default Checkout