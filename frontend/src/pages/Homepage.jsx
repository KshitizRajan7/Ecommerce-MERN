// HelmetHomePage.jsx
import React, { useContext } from 'react';
import { ShoppingCart, Star, ShieldCheck } from "lucide-react";
import { UserDataContext } from '../context/UserContext';

const helmets = [
  { name: "RiderX Pro", price: "$120", img: "/helmets/helmet1.jpg" },
  { name: "CruiserMax", price: "$95", img: "/helmets/helmet2.jpg" },
  { name: "UrbanShield", price: "$110", img: "/helmets/helmet3.jpg" },
];

export default function HelmetHomePage() {
  const {user,setUser} = useContext(UserDataContext);
  console.log(user);
  return (
    <main className="bg-white text-gray-900">
            {/* Header with Login/User Info */}
      <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white">

     <h1 className="text-2xl font-bold text-gray-800">HelmetStore</h1>
        
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.firstName}</span>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            Login
          </a>
        )}
      </header>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Premium Helmets for Every Ride</h1>
        <p className="text-xl mb-6">Ride with confidence. Style. Safety. Comfort.</p>
        <button className="text-lg px-6 py-3">Shop Now</button>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {helmets.map((helmet, index) => (
            <div key={index} className="border rounded-2xl p-4 shadow hover:shadow-lg transition">
              <img src={helmet.img} alt={helmet.name} className="w-full h-52 object-cover rounded-xl mb-4" />
              <h3 className="text-xl font-bold">{helmet.name}</h3>
              <p className="text-gray-600 mb-2">{helmet.price}</p>
              <button className="w-full"><ShoppingCart className="mr-2" size={18} /> Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <ShieldCheck size={40} className="mx-auto text-green-600 mb-4" />
            <h4 className="font-bold text-lg">Certified Safety</h4>
            <p>All our helmets meet international safety standards.</p>
          </div>
          <div>
            <Star size={40} className="mx-auto text-yellow-500 mb-4" />
            <h4 className="font-bold text-lg">Top Rated</h4>
            <p>Thousands of satisfied riders trust our products.</p>
          </div>
          <div>
            <ShoppingCart size={40} className="mx-auto text-blue-600 mb-4" />
            <h4 className="font-bold text-lg">Easy Shopping</h4>
            <p>Fast shipping and easy returns for your convenience.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <h2 className="text-4xl font-bold mb-4">Gear Up Now!</h2>
        <p className="text-xl mb-6">Explore our premium helmet collection today.</p>
        <button className="px-6 py-3 text-lg">Browse Helmets</button>
      </section>
    </main>
  );
}
