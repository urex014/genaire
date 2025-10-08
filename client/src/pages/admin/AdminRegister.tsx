import SlideToUnlock from "@/components/SlideToUnlock"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function AdminRegister() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const[phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  interface RegisterResponse {
    message?: string
    [key: string]: any
  }

  interface RegisterEvent extends React.FormEvent<HTMLFormElement> {}
  const api = import.meta.env.VITE_API_URL

  async function register(e: RegisterEvent): Promise<void> {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const response: Response = await fetch(`${api}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email,phone, password }),
      })

      const data: RegisterResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      toast.success("Registration successful. You can now log in.")
      setFullName("")
      setEmail("")
      setPhone("")
      setPassword("")
    } catch (err: any) {
      toast.error(err.message)
      setError(err.message)
    } finally {
      setLoading(false)
      navigate('/admin/login')
    }
  }

  return (
  <div className="flex items-center justify-center min-h-screen w-full bg-black px-4 sm:px-6 lg:px-8 py-8">
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white/10 dark:bg-gray-800/70 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700 transition-all">
      
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-center text-white">
        Admin Registration
      </h2>

      <form onSubmit={register} className="space-y-5 sm:space-y-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-semibold text-gray-300 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-2 sm:py-3 border border-gray-700 rounded-lg bg-transparent 
              text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-300 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 sm:py-3 border border-gray-700 rounded-lg bg-transparent 
              text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="admin@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-300 mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-2 sm:py-3 border border-gray-700 rounded-lg bg-transparent 
              text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="+2349047762536"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-300 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 sm:py-3 border border-gray-700 rounded-lg bg-transparent 
              text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a strong password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 sm:py-4 text-white font-bold rounded-lg transition 
            ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Slide To Login */}
      <div className="mt-6 text-center text-sm text-gray-400">
        <SlideToUnlock
          onUnlock={() => (window.location.href = "/admin/login")}
          text="Slide to login"
        />
      </div>
    </div>
  </div>
);

}

export default AdminRegister
