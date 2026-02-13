import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // or "../api/axios" if you’re using custom instance

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Register, 2: Verify OTP

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      setStep(2);
      setError("");
      alert("✅ OTP sent to your email!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Registration failed!");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Invalid OTP!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {step === 1 ? "Register" : "Verify OTP"}
      </h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-center">
          {error}
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full border px-3 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            Enter the OTP sent to <strong>{email}</strong>
          </p>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border px-3 py-2 rounded text-center tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
}

export default Register;
