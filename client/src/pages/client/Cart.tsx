import { useCart } from "@/utils/CartContext";
import { useNavigate } from "react-router-dom";
import FuzzyText from "@/components/FuzzyText"
import { useTheme } from "@/utils/ThemeContext";
import { Trash } from 'lucide-react';




function Cart() {
  const {theme} = useTheme()
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate()



  
// {id: '1', name: 'Denim Jacket', price: 60, image: '/img/jacket.jpg', description: 'Classic fit denim jacket', …}
  if (cart.length==0) {
    return(
      <div className="pt-20 w-screen flex-col dark:bg-black flex h-screen justify-center items-center">
        <FuzzyText 
        color={theme==='light'?"#000":"#fff"}
        baseIntensity={0.2} 
        hoverIntensity={0.18} 
        enableHover={true}
      >
      
  NO ITEMS FOUND!
</FuzzyText>
        <button className="mt-9 shadow-[0_0_20px_4px_#3b82f6] hover:shadow-[0_0_30px_6px_#3b82f6] w-fit bg-blue-600 text-white py-3 px-5 rounded-xl hover:bg-blue-700 font-bold shadow-blue-500/50 transition" 
        onClick={()=>{
          navigate('/shop')
        }}
        
        >Shop for Items</button>
      </div>
    )
  }

  return (
   <div className="pt-20 p-6  dark:bg-black w-screen">
  <h2 className="text-3xl font-bold mb-20">Your Cart</h2>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Cart Items */}
    <div className="lg:col-span-2 space-y-4">
      {cart.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center border-b pb-2"
        >
          <div className="border mr-4 rounded-lg p-2 h-fit shadow-lg border-gray-400">
          <img
              className="mr-5 h-30 w-30 object-cover rounded"
              alt={item.title}
              src={
                `${import.meta.env.VITE_API_URL}/uploads/${item.image}`
              }
            />
            </div>
          <div className="flex w-full flex-row items-center">
            <div className="flex flex-col">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">
                {item.quantity} × ${item.price}
              </p>
              <div className="flex flex-col items-center mt-2">
                <div className="flex border border-gray-400 p-1 rounded-lg px-2 shadow-lg flex-row items-center">
                <button className="" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                <span className="font-bold mx-3">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-500 hover:underline"
          >
            <Trash  color={'red'} />
          </button>
          
        </div>
      ))}
    </div>

    {/* Cart Summary Box */}
    <div className="border rounded-lg p-6 h-fit shadow-lg">
      <h3 className="text-xl font-bold mb-4">Summary</h3>
      <div className="flex-justify-between mb-2">
        <span className="font-semibold">Total</span>
        <span>
          ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </span>
      </div>
      
      <button
      onClick={() => navigate("/checkout")}
      className="mt-3 shadow-md hover:shadow-[0_0_30px_6px_#3b82f6] w-full bg-blue-600 text-white py-3 px-5 rounded-xl hover:bg-blue-700 font-bold shadow-blue-500/50 transition"
    >
      Proceed to Checkout
    </button>
      <button
        onClick={clearCart}
        className="mt-3 shadow-md hover:shadow-[0_0_30px_6px_#EF444466] w-full bg-red-600 text-white py-3 px-5 rounded-xl hover:bg-red-700 font-bold shadow-red-500/50 transition"
      >
        Clear Cart
      </button>
    </div>
  </div>
</div>

  );
}

export default Cart;
