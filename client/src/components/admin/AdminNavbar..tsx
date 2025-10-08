
import { useTheme } from '@/utils/ThemeContext'

function AdminNavbar() {
  const { theme } = useTheme();
  return (
     <nav className="w-full border-b border-gray-300 dark:border-black bg-white/80 dark:bg-black dark:backdrop-blur-xl mb-10 backdrop-blur-md fixed top-0 left-0 z-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex-shrink-0 text-2xl font-bold cursor-pointer">
            <a href="/" className={theme==='dark'?"#fff":"#000"}>Bobyx</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar