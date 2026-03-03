import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://blog-application-vh8n.onrender.com/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <div className="flex justify-center mb-6">
          <img
            src="/logo192.png" // Replace with your brand logo if you have
            alt="Maverick Dev"
            className="h-12 w-12"
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Sign into <span className="text-blue-600">Blog</span>
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Your daily dose of Tech world 💻
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your email</label>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
          <p className="text-sm mt-2">
            <Link to="/" className="text-gray-500 hover:underline">
              Back to Home
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          Made with 💙 by Abdulla
        </div>
      </div>
    </div>
  );
}

export default Login;
