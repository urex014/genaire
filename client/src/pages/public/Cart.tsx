import { useCart } from "@/lib/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="font-bold text-xl my-12">Your Cart is Empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(({ id, name, price, quantity, image }) => (
              <div
                key={id}
                className="flex items-center border p-3 rounded shadow"
              >
                <img src={image} alt={name} className="w-24 h-24 object-cover" />
                <div className="flex-1 ml-4">
                  <h2 className="text-xl font-semibold">{name}</h2>
                  <p className="text-indigo-600 font-bold">
                    NGN {(price * quantity).toFixed(2)}
                  </p>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      updateQuantity(id, Number(e.target.value))
                    }
                    className="border rounded px-2 py-1 w-20 mt-1"
                  />
                </div>
                <button
                  onClick={() => removeFromCart(id)}
                  className="ml-4 bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right text-xl font-bold">
            Total: NGN {totalPrice.toFixed(2)}
          </div>
          <button
            onClick={clearCart}
            className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        </>
      )}
    </section>
  );
};

export default Cart;
