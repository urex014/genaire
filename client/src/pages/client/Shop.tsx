import type { Product } from "@/types/Product";
import TiltedCard from "@/components/TiltedCard";
import { useCart } from "@/utils/CartContext";
import { useEffect, useState } from "react";
import FuzzyText from "@/components/FuzzyText";

function Shop() {
  const api = import.meta.env.VITE_API_URL
  const {addToCart} = useCart();
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    const fetchProducts = async()=>{console.log(api)
      try{
        
        if (!api) {
          throw new Error("PRODUCT_API environment variable is not defined");
        }
        const response = await fetch(`${api}/api/products`,{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          }
        })
        console.log(response)
        if(!response.ok){
          throw new Error("Failed to fetch products")
        }

        const data:Product[] = await response.json()
        console.info(data)
        setProducts(data)
      }catch(err){
        setError((err as Error).message)
      } finally{
        setLoading(false)
      }
    };
    fetchProducts();
  }, [])

  if(products.length==0 && !loading && !error){
    return(
      <div className="h-screen flex justify-center items-center pt-20 px-6">
        <FuzzyText>
          WE OUT OF FITS
        </FuzzyText>
      </div>
    )
  }

  if(loading){
    return(
      <div className="flex pt-20  flex-col">
        <div className="h-10 w-36 ml-16 bg-gray-300 dark:bg-gray-700 mb-2 rounded"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4 px-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center m-4 p-4 bg-gray-200 dark:bg-transparent rounded animate-pulse"
                >
                  {/* Image placeholder */}
                  <div className="w-full aspect-[1/1] bg-gray-300 dark:bg-gray-700 mb-4 rounded"></div>
                  {/* Title placeholder */}
                  <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 mb-2 rounded"></div>
                  {/* Price placeholder */}
                  <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 mb-4 rounded"></div>
                  {/* Button placeholder */}
                  <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
    </div>
    )
  }
  if(error){
    return(
      <div className="h-screen flex justify-center items-center pt-20 px-6">
        <FuzzyText>
          something went wrong
        </FuzzyText>
      </div>
    )
  }


  return (
    <div className="py-10 dark:bg-[#000] pt-20 px-6">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>

      {/* Grid of product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div className="justify-center  flex m-4 flex-col"
            key={product._id}
          >
            
            <TiltedCard
              imageSrc={product.image}
              altText={''}
              captionText={product.title}
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
                <p className="tilted-card-text text-center">
                  {product.title}
                </p>
              }
            />
            {/* Product Info */}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">N {product.price.toFixed(2)}</p>
              <p className="text-gray-600 dark:text-gray-300">{product.quantity} in stock</p>

              <button onClick={()=>{addToCart(product)}} className="mt-3 shadow-[0_0_20px_4px_#3b82f6] hover:shadow-[0_0_30px_6px_#3b82f6] w-[60%] bg-blue-600 text-white py-3 px-5 rounded-xl hover:bg-blue-700 font-bold shadow-blue-500/50 transition ">
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
