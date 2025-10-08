// import Carousel from "@/components/Carousel"
import CircularGallery from "@/components/CircularGallery"
import Folder from "@/components/Folder"
import { useTheme } from "@/utils/ThemeContext"
import ScrollFloat from "@/components/ScrollFloat"
import { useNavigate } from "react-router-dom"

function Gallery() {
  const navigate = useNavigate()
  const folderItems = [
    {card:<div className="bg-white rounded-lg"></div>},
    {card:<div className="bg-white rounded-lg"></div>},
    {card:<div className="bg-white rounded-lg"></div>}
  ]
  const {theme} = useTheme()
  const screenWidth = window.innerWidth
  console.log(screenWidth)
  return (
    <div className='p-y-20 dark:bg-black w-screen'>
      <div className="w-screen/1.3" style={{  width:screenWidth , marginBottom:"13px", height: '800px' }}>
  <CircularGallery bend={0.5} textColor={theme === 'light'?"#000":"#fff"} borderRadius={0.05} scrollEase={0.1}/>
  
</div>
<div className="pt-8 pl-18 w-full mt-20 ">
<ScrollFloat
  animationDuration={1}
  ease='back.inOut(2)'
  scrollStart='center bottom+=50%'
  scrollEnd='bottom bottom-=40%'
  stagger={0.03}
>
  Collections
</ScrollFloat>
</div>
<div className="mt-3 w-full p-5 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-6">
  
  <div className="flex items-center flex-col" style={{ height: '100px', position: 'relative' }}
  onClick={()=>{navigate('/male')}}
  >
    <Folder
      size={0.8}
      color="#5227FF"
      className="custom-folder"
      items={folderItems.map((item) => item.card)}
    />
    <p>Male wears</p>
  </div>

  <div className="flex items-center flex-col" style={{ height: '300px', position: 'relative' }}
  onClick={()=>{navigate('/female')}}>
    <Folder
      size={0.8}
      color="#5227FF"
      className="custom-folder"
      items={folderItems.map((item) => item.card)}
    />
    <p>Female wears</p>
  </div>

  <div className="flex items-center flex-col" style={{ height: '300px', position: 'relative' }}
  onClick={()=>{navigate('/unisex')}}
  >
    <Folder
      size={0.8}
      color="#5227FF"
      className="custom-folder"
      items={folderItems.map((item) => item.card)}
    />
    <p>Unisex</p>
  </div>
</div>

    </div>
  )
}

export default Gallery