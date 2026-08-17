import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";
import {
  ArrowRight,
  BadgeCheck,
  Bike,
  Eye,
  EyeOff,
  Leaf,
  Route,
  ShieldCheck,
  Sprout,
  Tractor,
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
      <div className="grid w-full max-w-4xl grid-cols-[60%_40%] overflow-hidden border border-white/80 bg-white/75 shadow-[0_20px_48px_rgba(52,74,45,0.15)] max-[900px]:h-auto max-[900px]:max-h-[calc(100vh-32px)] max-[900px]:max-w-md max-[900px]:grid-cols-1 max-[900px]:overflow-auto">
        <section
          className="flex flex-col justify-center gap-4 bg-[linear-gradient(160deg,rgba(29,88,52,0.92),rgba(36,116,70,0.78))] p-6 text-white max-[900px]:p-5"
          aria-label="FarmEase direct delivery"
        >
          <div className="inline-flex w-fit items-center gap-2 text-base font-extrabold">
            <span className="grid h-8 w-8 place-items-center bg-[#f4c04f] text-[#1c5f38] shadow-[0_12px_26px_rgba(20,45,30,0.18)]">
              <Leaf size={18} />
            </span>
            <span>FarmEase</span>
          </div>

          <div className="max-w-2xl">
            <p className="mb-2 w-fit border border-white/25 bg-white/15 px-2.5 py-1.5 text-[11px] font-bold uppercase">
              Farmer to doorstep network
            </p>
            <h1 className="m-0 max-w-xl text-2xl font-semibold leading-[1.12]">
              Fresh produce moves from farmers to homes without middlemen.
            </h1>
            <p className="mt-2 max-w-lg text-xs leading-5 text-white/80">
              Sign in to manage field stock, customer orders, and delivery
              movement in one direct supply chain built around the farmer.
            </p>
          </div>

          <div
            className="grid w-full max-w-sm grid-cols-[76px_1fr_76px] items-center gap-2 border border-white/20 bg-[#0b2c1a]/35 p-2 backdrop-blur max-[520px]:grid-cols-1"
            aria-hidden="true"
          >
            <div className="grid min-h-16 place-items-center gap-1 bg-[#fffaf0] text-center text-sm font-extrabold text-[#214b31]">
              <Tractor size={19} />
              <span>Farmer</span>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-[#f4c04f] max-[520px]:min-h-9 max-[520px]:rotate-90">
              <span className="h-0.75 bg-[repeating-linear-gradient(90deg,rgba(244,192,79,0.95)_0_12px,transparent_12px_19px)]" />
              <Route size={18} />
              <span className="h-0.75 bg-[repeating-linear-gradient(90deg,rgba(244,192,79,0.95)_0_12px,transparent_12px_19px)]" />
            </div>
            <div className="grid min-h-16 place-items-center gap-1 bg-[#dff3ff] text-center text-sm font-extrabold text-[#165c75]">
              <Bike size={19} />
              <span>Delivery</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 max-[900px]:grid-cols-1">
            {deliverySteps.map((step) => {
              const StepIcon = step.icon;

              return (
                <article
                  className="flex gap-2 border border-white/20 bg-white/15 p-2"
                  key={step.title}
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center bg-[#f4c04f]/20 text-[#ffd56f]">
                    <StepIcon size={15} />
                  </span>
                  <div>
                    <h3 className="m-0 mb-1 text-xs font-bold leading-snug">
                      {step.title}
                    </h3>
                    <p className="m-0 text-[11px] leading-4 text-white/75">
                      {step.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

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
                  className="rounded-none border-[#dbe7d4] p-2.5 text-xs shadow-none placeholder:text-sm focus-visible:border-[#2f8f4e] focus-visible:ring-[#2f8f4e]/20"
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
                        className="min-h-10 rounded-none border-[#dbe7d4] p-2.5 text-xs shadow-none placeholder:text-sm focus-visible:border-[#2f8f4e] focus-visible:ring-[#2f8f4e]/20"
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
                      className="min-h-10 rounded-none border-[#dbe7d4] p-2.5 pr-11 text-xs shadow-none placeholder:text-sm focus-visible:border-[#2f8f4e] focus-visible:ring-[#2f8f4e]/20"
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
                  className="**:[[role=listbox]]:bottom-full **:[[role=listbox]]:top-auto **:[[role=listbox]]:mb-1 **:[[role=listbox]]:mt-0 [&_button>span:first-child>span]:text-sm [&_button>span:first-child>span]:font-normal [&_button>span:first-child>span]:text-[#726252] [&_button]:min-h-10 [&_button]:rounded-none [&_button]:px-2.5 [&_button]:shadow-none"
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
