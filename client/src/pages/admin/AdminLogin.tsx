import SlideToUnlock from "@/components/SlideToUnlock"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  interface LoginResponse {
    token: string
    message?: string
    [key: string]: any
  }

  interface LoginEvent extends React.FormEvent<HTMLFormElement> {}

  async function login(e: LoginEvent): Promise<void> {
    e.preventDefault() // prevent page reload
    setError("")
    setSuccess("")
    setLoading(true)

    const api = import.meta.env.VITE_API_URL

    try {
      // Replace this URL with your backend endpoint
      const response: Response = await fetch(`${api}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data: LoginResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      toast.success("Login successful. Redirecting...")
      // Example: store token and redirect to dashboard
      localStorage.setItem("adminToken", data.token)
      setTimeout(() => {
        window.location.href = "/admin/dashboard"
      }, 1500)
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
        setError(err.message)
      } else {
        toast.error("An unknown error occurred")
        setError("An unknown error occurred")
      }
    } finally {
      setLoading(false)
      navigate('admin/dashboard')
    }
  }

  return (
  <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-black dark:bg-black transition-colors">
    <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl 
      p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 
      flex flex-col justify-center">
      
      {/* Header */}
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center 
        text-gray-900 dark:text-gray-100">
        Admin Login
      </h2>

      {/* Form */}
      <form onSubmit={login} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 
              dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            placeholder="admin@example.com"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 
              dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            placeholder="Enter your password"
          />
        </div>

        {/* Success or Error messages */}
        {success && (
          <div className="text-green-600 dark:text-green-400 text-sm text-center font-semibold">
            {success}
          </div>
        )}
        {/* Uncomment this block for errors */}
        {/* {error && (
          <div className="text-red-600 dark:text-red-400 text-sm text-center font-semibold">
            {error}
          </div>
        )} */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 font-bold rounded-lg text-white transition-all 
            ${loading 
              ? "bg-blue-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-blue-500/30"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Slide to Unlock */}
        <div className="pt-4">
          <SlideToUnlock onUnlock={() => navigate("/admin/register")} />
        </div>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Admin Portal
      </div>
    </div>
  </div>
);

}

export default AdminLogin
