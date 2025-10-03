import TextPressure from './TextPressure';
import GridMotion from "./GridMotion"
import gridItems from "@/constants/gridItem"
import SplitText from "./SplitText";
import TextType from './TextType';
import { useNavigate } from 'react-router-dom';

export default function Hero(){
const navigate = useNavigate()

const gridItemsType: string[] = Array.isArray(gridItems) ? gridItems : [];

  return (
    // background
    <div className="w-full h-screen relative ">
      <div className="absolute inset-0 -z-10">
      <GridMotion items={gridItemsType} gradientColor="#000000" />
      </div>
      {/* content */}
      <div className="relative flex flex-col items-center justify-center w-full h-screen text-center space-y-8 backdrop-blur-sm">
        <div className='mt-10' style={{ height: '100px' }}>
          {/* navbar */}
</div>
  {/* Tagline */}
  <SplitText
  text="Wear the future"
  className="text-3xl text-white font-semibold text-center"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
/>

  {/* Brand Name */}
  <div className="relative w-[90vw] h-[30vh] sm:w-[80vw] sm:h-[30vh] md:w-[70vw] md:h-[40vh] lg:w-[50vw] lg:h-[70vh] flex items-center justify-center">
  <TextPressure
    text="Bobx"
    flex={true}
    alpha={false}
    stroke={false}
    width={true}
    weight={true}
    italic={false}
    textColor="#ffffff"
    strokeColor="#ff0000"
    minFontSize={20} // smaller minimum on mobile
  />
</div>


  {/* Optional Call-to-Action */}
  <button onClick={()=>{navigate("/shop")}} className="px-8 py-4 bg-white rounded-full tracking-wide shadow-lg hover:bg-gray-200 transition">
    <TextType 
      text={["Explore fits!"]}
      typingSpeed={75}
      pauseDuration={1500}
      showCursor={true}
      textColors={["#000000", "#222"]}
      cursorCharacter="|"
      className='font-bold'
    />
  </button>
      </div>

    </div>
  )
}
