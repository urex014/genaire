import { useCart } from "@/utils/CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length==0) {
    return(
      <div>
        
      </div>
    )
  }

  return (
    <div className="p-6 h-screen w-screen">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">
                {item.quantity} × ${item.price}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="font-bold">
          Total: $
          {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        </p>
        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
