import { useState } from "react";
import axios from "axios";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!isChecked) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://192.168.1.118:5000/auth/register", {
        name,
        email,
        password,
      });
      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => (window.location.href = "/login"), 3000); // Redirect after 3 seconds
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-4 bg-white px-4 py-8 md:py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Create an Account</h1>
        <p className="text-gray-600 mb-4">
          Get started with PantryPals – your cooking community.
        </p>
      </div>
      <form onSubmit={handleRegister} className="w-full max-w-md space-y-6">
        <div>
          <label className="block text-orange-500 font-bold mb-2">Full Name</label>
          <input
            type="text"
            value={name}
            placeholder="e.g. Juan Dela Cruz"
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-orange-500 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-orange-500 font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-orange-500 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-orange-500 font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-orange-500 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-orange-500 font-bold mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-orange-500 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="w-5 h-5 mr-3"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <span className="text-gray-700">Agree to Terms & Conditions</span>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        <button
          type="submit"
          className={`w-full py-2 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isChecked}
        >
          Register
        </button>
      </form>

      {/* OR Separator and Social Icons in One Row */}
      <div className="my-6 flex items-center justify-center w-full max-w-md">
        <span className="h-px bg-gray-300 flex-1"></span>
        <span className="px-4 text-gray-500 text-sm">or</span>
        <span className="h-px bg-gray-300 flex-1"></span>
      </div>

      <div className="w-full max-w-md flex justify-center gap-6">
        <button className="flex items-center justify-center p-4 border rounded-full text-gray-700 hover:bg-gray-100 transition">
          <FaGoogle className="text-red-500" size={24} />
        </button>
        <button className="flex items-center justify-center p-4 border rounded-full text-gray-700 hover:bg-gray-100 transition">
          <FaFacebook className="text-blue-500" size={24} />
        </button>
        <button className="flex items-center justify-center p-4 border rounded-full text-gray-700 hover:bg-gray-100 transition">
          <FaInstagram className="text-pink-500" size={24} />
        </button>
      </div>

      <p className="mt-6 text-gray-700">
        Already have an account?{" "}
        <button
          className="text-orange-500 font-bold underline"
          onClick={() => (window.location.href = "/login")}
        >
          Log In
        </button>
      </p>
    </div>
  );
};

export default RegisterScreen;
