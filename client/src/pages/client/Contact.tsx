import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useTheme } from '@/utils/ThemeContext';
import { Twitter } from 'lucide-react';



export default function Contact() {

  const {theme} = useTheme();
  return (
    <div className="h-screen dark:bg-[#000] w-screen pt-20 pb-40 px-6">
      
      {/* Heading */}
      <h2 className="text-4xl font-bold text-center mb-6">Contact Us</h2>
      <p className="text-center max-w-xl mx-auto mb-12">
        Have questions about our collections or your order? Get in touch and
        we’ll be happy to help.
      </p>

      {/* Layout: Info (left) + Form (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="hidden sm:hidden md:hidden lg:block space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Store</h3>
            <p className="text-gray-600">
              123 Fashion Street<br />
              Lagos, Nigeria
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600">+234 800 123 4567</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600">support@yourbrand.com</p>
          </div>

          {/* Social links */}
          <div className="flex space-x-4 mt-6">
            <a href="#" className=""><Instagram color={theme === 'dark'?"#fff":"#000"} size={20} /></a>
            <a href="#" className=""><Twitter color={theme === 'dark'?"#fff":"#000"} size={20} /></a>
            <a href="#" className=""><Facebook color={theme === 'dark'?"#fff":"#000"} size={20} /></a>
            <a href='#' className=''><MessageCircle color={theme === 'dark'?"#fff":"#000"} size={20} /></a>
          </div>
        </div>

        {/* Contact Form */}
        <form className=" shadow-md backdrop-blur-xl  border-1 rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium ">
              Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              className={theme==='dark'?"mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black bg-transparent backdrop-blur-xl  focus:outline-none":"mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium ">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className={theme==='dark'?"mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black bg-transparent backdrop-blur-xl  focus:outline-none":"mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium ">
              Message
            </label>
            <textarea
              placeholder="Write your message..."
              rows={4}
              className={theme==='dark'?"mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black bg-transparent backdrop-blur-xl  focus:outline-none":"mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"}
            />
          </div>

          <button
            type="submit"
            className={"text-white bg-black w-full py-3 rounded-lg font-semibold hover:bg-gray-800 transition"}
          >
            Send Message
          </button>
        </form>
      </div>
      
    </div>
  )
}
