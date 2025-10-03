import { products } from "@/utils/fakeData";
import TiltedCard from "@/components/TiltedCard";
import { useCart } from "@/utils/CartContext";

function Shop() {
  const {addToCart} = useCart();
  return (
    <div className="py-10 pt-10 px-6">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>

      {/* Grid of product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
          >
            
            <TiltedCard
              imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
              altText={product.name}
              captionText={product.name}
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text">
                  {product.name}
                </p>
              }
            />
            {/* Product Info */}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">${product.price.toFixed(2)}</p>

              <button onClick={()=>{addToCart(product)}} className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
