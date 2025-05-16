// RegisterPage.jsx
import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {user, setUser} = useContext(UserDataContext);
  const navigate = useNavigate();
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser);
    if(response.status ===201){
      const data = response.data;
      setUser(data.user);
      // console.log('registration', user);
      localStorage.setItem('token',data.token);
      navigate('/');
    }
     setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Confirm Password */}
          {/* <div>
            <label className="block mb-1 font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div> 
          </div> */}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-200"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <a
            href="/login"
            className="text-blue-600 font-medium ml-1 hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
