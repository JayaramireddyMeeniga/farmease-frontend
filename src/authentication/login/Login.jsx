import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import toast from "react-hot-toast";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import Background from "../../components/Background";
import { getRoleHomePath, getStoredUserRole } from "../../utils/roleUtils";

const roleOptions = [
  { value: "farmer", label: "Farmer" },
  { value: "customer", label: "Customer" },
  { value: "deliveryPartner", label: "Delivery Partner" },
];

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState(getStoredUserRole());
  const [isOtpRequired, setIsOtpRequired] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleIdentifierChange = (e) => {
    const value = e.target.value;

    if (/^\d+$/.test(value) && value.length > 12) return;

    setIdentifier(value);

    if (/^\d{10}$/.test(value) || /^\d{12}$/.test(value)) {
      setIsOtpRequired(true);
      setOtpSent(false);
    } else {
      setIsOtpRequired(false);
      setOtp("");
    }
  };

  const sendOtp = () => {
    if (/^\d{10}$/.test(identifier)) {
      toast.success(`OTP sent to Phone: ${identifier}`);
    } else if (/^\d{12}$/.test(identifier)) {
      toast.success(`OTP sent to Aadhaar: ${identifier}`);
    } else {
      toast.error("Enter a valid 10-digit phone or 12-digit Aadhaar number");
      return;
    }
    setOtpSent(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (isOtpRequired) {
      if (!otp) {
        toast.error("OTP is required");
        return;
      }
      if (otp.length !== 6) {
        toast.error("OTP must be 6 digits");
        return;
      }

      toast.success("Login successful with OTP");
    } else {
      if (!identifier) {
        toast.error("Identifier is required");
        return;
      }

      if (identifier.includes("@") && !password) {
        toast.error("Password is required for email login");
        return;
      }

      toast.success("Login successful with password");
    }
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("activeRole", role);

    navigate(getRoleHomePath(role));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-green-50 overflow-hidden">
      <Background />

      <div className="bg-white px-8 pt-5 pb-7 rounded-lg shadow-lg w-full max-w-md z-10">
        <h2 className="text-3xl font-medium text-green-800 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Aadhaar, Email, or Phone
            </label>
            <Input
              type="text"
              value={identifier}
              onChange={handleIdentifierChange}
              placeholder="Enter Aadhaar, Email, or Phone"
              required
            />
            {/* {/^\d+$/.test(identifier) && (
              <p className="text-sm text-gray-500 mt-1">
                {identifier.length}/12 digits {identifier.length === 12 ? "✓" : ""}
              </p>
            )} */}
          </div>

          {isOtpRequired && (
            <>
              {!otpSent ? (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mb-4"
                >
                  Send OTP
                </button>
              ) : (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Enter OTP
                  </label>
                  <Input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    maxLength="6"
                    placeholder="Enter 6-digit OTP"
                    required
                  />
                </div>
              )}
            </>
          )}

          {!isOtpRequired && (
            <div className="mb-3 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>

              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </span>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Login As
            </label>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={roleOptions}
              aria-label="Login role"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-sm hover:bg-green-700 cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="mt-3 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-green-600 hover:underline cursor-pointer"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
