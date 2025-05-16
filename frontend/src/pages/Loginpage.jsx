import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {user, setUser} = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const userData = {
      email:email,
      password:password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData);
    if(response.status === 200){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token);
      navigate('/homepage');
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-200"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Other Login Options */}
        <div className="mt-6 space-y-3">
          <a
            href="/admin-login"
            className="block w-full text-center border border-red-500 text-red-600 py-2 rounded-xl hover:bg-red-50 transition"
          >
            Login as Admin
          </a>
          <a
            href="/seller-login"
            className="block w-full text-center border border-indigo-500 text-indigo-600 py-2 rounded-xl hover:bg-indigo-50 transition"
          >
            Login as Seller
          </a>
        </div>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <a href="/user-registration" className="text-blue-600 font-medium ml-1 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
