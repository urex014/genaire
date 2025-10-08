import TextPressure from './TextPressure';

import LiquidEther from './LiquidEther';
import SplitText from "./SplitText";
import TextType from './TextType';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/utils/ThemeContext';

export default function Hero(){
const navigate = useNavigate()
const theme = useTheme();


  return (
    // background
    <div className="w-full h-screen relative ">
      <div className="absolute inset-0 z-0">
      <LiquidEther
    colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
    mouseForce={20}
    cursorSize={100}
    isViscous={false}
    viscous={30}
    iterationsViscous={32}
    iterationsPoisson={32}
    resolution={0.5}
    isBounce={false}
    autoDemo={true}
    autoSpeed={0.5}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={1000}
    autoRampDuration={0.6}
  />
      </div>
      {/* content */}
      <div className="relative flex flex-col items-center justify-center w-full h-screen text-center space-y-8 backdrop-blur-sm">
        <div className='mt-10' style={{ height: '100px' }}>
          {/* navbar */}
</div>
  {/* Tagline */}
  <SplitText
  text="Wear the future"
  className="text-3xl text-black dark:text-white font-semibold text-center"
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
    textColor={theme?.theme === 'dark' ? '#FFFFFF' : '#000000'}
    strokeColor="#ff0000"
    minFontSize={20} // smaller minimum on mobile
  />
</div>


  {/* Optional Call-to-Action */}
  <button onClick={()=>{navigate("/shop")}} className="px-8 py-4 mb-5 bg-white rounded-full tracking-wide shadow-lg hover:bg-gray-200 transition">
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
