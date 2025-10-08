import { Sun, Moon } from 'lucide-react';
import { useTheme } from "@/utils/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <div
              onClick={toggleTheme}
              className="px-3 py-1 flex  justify-center rounded bg-transparent hover:opacity-80 transition"
            >
              {theme === "light" ? <Sun size={20} color='#000' /> : <Moon color='#fff' />}
            </div>
    </div>
  )
}

export default ThemeToggle