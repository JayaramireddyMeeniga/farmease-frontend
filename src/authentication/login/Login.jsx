import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";
import AuthSidePanel from "../components/AuthSidePanel";
import {
  authInputClass,
  authPasswordInputClass,
  authSelectClass,
} from "../components/authFormStyles";
import {
  ArrowRight,
  BadgeCheck,
  Bike,
  Eye,
  EyeOff,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { getRoleHomePath, getStoredUserRole } from "../../utils/roleUtils";

const roleOptions = [
  { value: "farmer", label: "Farmer" },
  { value: "customer", label: "Customer" },
  { value: "deliveryPartner", label: "Delivery Partner" },
];

const deliverySteps = [
  {
    title: "Farmer lists fresh stock",
    text: "Harvest details go straight from the field to local customers.",
    icon: Sprout,
  },
  {
    title: "Direct order received",
    text: "No dealer layer, no middleman markup, cleaner pricing for everyone.",
    icon: BadgeCheck,
  },
  {
    title: "Delivery partner moves it",
    text: "Produce travels from farmer pickup to doorstep with live role access.",
    icon: Bike,
  },
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

    navigate(getRoleHomePath(role), { state: { justLoggedIn: true } });
  };

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#f7fbf3_0%,#eff8e9_48%,#fffaf0_100%)] text-[#203226]">
      <div className="grid w-full max-w-4xl grid-cols-[60%_40%] overflow-hidden rounded-md border border-white/80 bg-white/75 shadow-[0_20px_48px_rgba(52,74,45,0.15)] max-[900px]:h-auto max-[900px]:max-h-[calc(100vh-32px)] max-[900px]:max-w-md max-[900px]:grid-cols-1 max-[900px]:overflow-auto">
        <AuthSidePanel
          ariaLabel="FarmEase direct delivery"
          eyebrow="Farmer to doorstep network"
          title="Fresh produce moves from farmers to homes without middlemen."
          description="Sign in to manage field stock, customer orders, and delivery movement in one direct supply chain built around the farmer."
          steps={deliverySteps}
        />

        <section
          className="flex w-full items-center justify-center bg-white"
          aria-label="Login form"
        >
          <div className="w-full max-w-none bg-white p-4">
            <div className="mb-4">
              <span className="mb-2 inline-flex w-fit items-center gap-2 bg-[#eef8e8] px-2.5 py-1.5 text-[11px] font-extrabold text-[#247446]">
                <ShieldCheck size={15} />
                Secure role access
              </span>
              <h2 className="m-0 text-2xl font-semibold leading-tight text-[#1f3325]">
                Welcome back
              </h2>
              <p className="mt-1.5 text-xs leading-5 text-[#687766]">
                Use Aadhaar, phone OTP, or email password to continue.
              </p>
            </div>

            <form onSubmit={handleLogin} className="grid gap-3">
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-[#314334]">
                  Aadhaar, Email, or Phone
                </label>
                <Input
                  type="text"
                  value={identifier}
                  onChange={handleIdentifierChange}
                  placeholder="Enter Aadhaar, Email, or Phone"
                  required
                  className={authInputClass}
                />
              </div>

              {isOtpRequired && (
                <>
                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={sendOtp}
                      className="inline-flex min-h-10 items-center justify-center gap-2 bg-[#e5f4ff] px-3 text-sm font-extrabold text-[#165c75] transition hover:-translate-y-0.5"
                    >
                      Send OTP
                      <ArrowRight size={17} />
                    </button>
                  ) : (
                    <div className="grid gap-1.5">
                      <label className="text-xs font-extrabold text-[#314334]">
                        Enter OTP
                      </label>
                      <Input
                        type="text"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, ""))
                        }
                        maxLength="6"
                        placeholder="Enter 6-digit OTP"
                        required
                        className={authInputClass}
                      />
                    </div>
                  )}
                </>
              )}

              {!isOtpRequired && (
                <div className="grid gap-1.5">
                  <label className="text-xs font-bold text-[#314334]">
                    Password
                  </label>

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className={authPasswordInputClass}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center border-0 bg-[#eef8e8] text-[#247446]"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>
              )}

              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-[#314334]">
                  Login As
                </label>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  options={roleOptions}
                  aria-label="Login role"
                  className={authSelectClass}
                />
              </div>

              <button
                type="submit"
                className="mt-1 inline-flex min-h-10 items-center justify-center gap-2 bg-[#247446] px-3 text-sm font-extrabold text-white shadow-[0_12px_24px_rgba(36,116,70,0.22)] transition hover:-translate-y-0.5 hover:bg-[#1d623a]"
              >
                Login
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-3 text-center text-xs text-[#687766]">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="border-0 bg-transparent font-extrabold text-[#247446] underline underline-offset-4"
              >
                Sign up here
              </button>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
