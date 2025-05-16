import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SellerRegisterPage() {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessEmail: "",
    password: "",
    confirmPassword: "",
  });

  // Show/hide password toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = async (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser ={
      fullName:{
        firstName:firstName,
        lastName:lastName
      },
      email:email,
      password:password
    }

    // const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/`)

    setError("");
    setSuccess("");

    // Basic validation: password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // TODO: Call your backend API here, example:
    // fetch("/api/seller/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.success) {
    //       setSuccess("Registration successful! You can now login.");
    //     } else {
    //       setError(data.message || "Registration failed.");
    //     }
    //   })
    //   .catch(() => setError("Network error, please try again."));

    // For now, simulate success:
    // setTimeout(() => {
    //   setSuccess("Registration successful! You can now login.");
    //   setFormData({
    //     firstName: "",
    //     lastName: "",
    //     businessEmail: "",
    //     password: "",
    //     confirmPassword: "",
    //   });
    // }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Register as Seller
        </h2>

        {error && <p className="mb-4 text-red-600 text-center">{error}</p>}
        {success && <p className="mb-4 text-green-600 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">email</label>
            <input
              type="email"
              name="businessEmail"
              placeholder="seller@yourbusiness.com"
              required
              value={formData.businessEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          <div>
            <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition duration-200"
            >
              Register as Seller
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have a seller account?
          <a href="/seller/login" className="text-indigo-600 font-medium ml-1 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
