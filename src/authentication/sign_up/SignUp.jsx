import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";
import Background from "../../components/Background";

const roleOptions = [
  { value: "farmer", label: "Farmer" },
  { value: "customer", label: "Customer" },
  { value: "deliveryPartner", label: "Delivery Partner" },
];

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer");

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(mobile)) {
      alert("Enter valid 10-digit mobile number");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email, mobile, role }));

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 relative">
      <Background />

      <div className="bg-white px-8 pt-5 pb-7 rounded-lg shadow-lg w-full max-w-md z-10">
        <h2 className="text-3xl font-medium text-green-800 mb-6 text-center">
          Sign Up
        </h2>

        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mobile Number
            </label>
            <Input
              type="text"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Account Role
            </label>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={roleOptions}
              aria-label="Account role"
            />
          </div>

          <button
            className="w-full bg-green-600 text-white py-2 rounded-sm cursor-pointer hover:bg-green-700"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
