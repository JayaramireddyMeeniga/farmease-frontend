import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  UserPlus,
} from "lucide-react";

const roleOptions = [
  { value: "farmer", label: "Farmer" },
  { value: "customer", label: "Customer" },
  { value: "deliveryPartner", label: "Delivery Partner" },
];

const accountSteps = [
  {
    title: "Choose your role",
    text: "Create access for farmer, customer, or delivery partner workflows.",
    icon: ShieldCheck,
  },
  {
    title: "Connect your account",
    text: "Your mobile and email keep orders, stock, and deliveries organized.",
    icon: BadgeCheck,
  },
  {
    title: "Start moving produce",
    text: "Jump into the direct farm-to-doorstep network after login.",
    icon: Bike,
  },
];

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();

    if (!/^\d{10}$/.test(mobile)) {
      alert("Enter valid 10-digit mobile number");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email, mobile, role }));
    localStorage.setItem("activeRole", role);

    navigate("/");
  };

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#f7fbf3_0%,#eff8e9_48%,#fffaf0_100%)] text-[#203226]">
      <div className="grid w-full max-w-4xl grid-cols-[60%_40%] overflow-hidden rounded-md border border-white/80 bg-white/75 shadow-[0_20px_48px_rgba(52,74,45,0.15)] max-[900px]:h-auto max-[900px]:max-h-[calc(100vh-32px)] max-[900px]:max-w-md max-[900px]:grid-cols-1 max-[900px]:overflow-auto">
        <AuthSidePanel
          ariaLabel="Create FarmEase account"
          eyebrow="Join the direct supply network"
          title="Create your workspace for fresh produce, orders, and delivery."
          description="Sign up once and enter the right role-based flow for farming, buying, or delivery operations."
          steps={accountSteps}
        />

        <section
          className="flex w-full items-center justify-center bg-(--fe-surface)"
          aria-label="Signup form"
        >
          <div className="w-full max-w-none bg-(--fe-surface) p-4">
            <div className="mb-4">
              <span className="mb-2 inline-flex w-fit items-center gap-2 bg-(--fe-bg-soft) px-2.5 py-1.5 text-[11px] font-extrabold text-(--fe-primary-700)">
                <UserPlus size={15} />
                New role access
              </span>
              <h2 className="m-0 text-2xl font-semibold leading-tight text-(--fe-text)">
                Create account
              </h2>
              <p className="mt-1.5 text-xs leading-5 text-(--fe-text-muted)">
                Add your details and choose the workspace you want to use.
              </p>
            </div>

            <form onSubmit={handleSignUp} className="grid gap-3">
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-(--fe-text)">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className={authInputClass}
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-(--fe-text)">
                  Mobile Number
                </label>
                <Input
                  type="text"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(event) =>
                    setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  required
                  className={authInputClass}
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-(--fe-text)">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className={authPasswordInputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center border-0 bg-(--fe-bg-soft) text-(--fe-primary-700)"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-(--fe-text)">
                  Account Role
                </label>
                <Select
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  options={roleOptions}
                  aria-label="Account role"
                  className={authSelectClass}
                />
              </div>

              <button
                className="mt-1 inline-flex min-h-10 items-center justify-center gap-2 bg-[#247446] px-3 text-sm font-extrabold text-(--fe-surface) shadow-(--fe-shadow-sm) transition hover:-translate-y-0.5 hover:bg-(--fe-primary-600)"
                type="submit"
              >
                Sign Up
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-3 text-center text-xs text-(--fe-text-muted)">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/")}
                className="border-0 bg-transparent font-extrabold text-(--fe-primary-700) underline underline-offset-4"
              >
                Login
              </button>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
