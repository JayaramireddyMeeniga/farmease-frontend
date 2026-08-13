import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChevronDown,
  faRightFromBracket,
  faSeedling,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import HeaderSearchInput from "../ui/HeaderSearchInput";
import {
  getRoleHomePath,
  getStoredUserRole,
  ROLE_LABELS,
} from "../../utils/roleUtils";

const searchablePages = [
  { path: "/dashboard", label: "Home", keywords: "dashboard farmer overview" },
  {
    path: "/customer/home",
    label: "Home",
    keywords: "dashboard customer overview",
  },
  {
    path: "/delivery-partner/dashboard",
    label: "Home",
    keywords: "dashboard delivery overview",
  },
  {
    path: "/marketplace",
    label: "Marketplace",
    keywords: "market shop products buy vegetables fruits seeds",
  },
  {
    path: "/cropManagement",
    label: "Crop Management",
    keywords:
      "farm crop management cropmanagement wheat rice corn soybean cotton sugarcane acres harvest growing healthy",
  },
  {
    path: "/irrigation",
    label: "Irrigation",
    keywords: "water irrigation management wheat rice corn soybean schedule",
  },
  {
    path: "/tankMotor",
    label: "Tank Motor",
    keywords: "pump motor tank control water irrigation",
  },
  {
    path: "/cropRotation",
    label: "Crop Rotation",
    keywords: "planner crop rotation soybean wheat rice corn soil",
  },
  { path: "/tips", label: "Tips", keywords: "agricultural tips farming guide" },
  {
    path: "/marketprice",
    label: "Market Prices",
    keywords: "market rates prices crop soybean wheat rice corn",
  },
  { path: "/dealers", label: "Dealers", keywords: "dealers suppliers" },
  {
    path: "/communityForum",
    label: "Forum",
    keywords: "community forum discussion farming crop soybean",
  },
  { path: "/ai-assistant", label: "AI Assistant", keywords: "ai assistant chat gateway warehouse transport workers analytics" },
  { path: "/profile", label: "Profile", keywords: "account profile user" },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const userRole = getStoredUserRole();
  const roleHomePath = getRoleHomePath(userRole);
  const roleLabel = ROLE_LABELS[userRole] || "Farmer";

  const navItems = [
    { path: roleHomePath, label: "Home" },
    { path: "/marketplace", label: "Marketplace" },
  ];

  const searchIndex = useMemo(
    () =>
      searchablePages.filter(
        (item) => item.label !== "Home" || item.path === roleHomePath,
      ),
    [roleHomePath],
  );

  const matchingPages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    const queryTerms = normalizedQuery.split(/\s+/);

    return searchIndex.filter((item) => {
      const haystack =
        `${item.label} ${item.path} ${item.keywords}`.toLowerCase();
      return queryTerms.every((term) => haystack.includes(term));
    });
  }, [query, searchIndex]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("activeRole");
    navigate("/");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const [bestMatch] = matchingPages;

    if (bestMatch) {
      setQuery("");
      navigate(bestMatch.path);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#eadcc7] bg-white/95 shadow-[0_10px_28px_rgba(82,55,32,0.12)] backdrop-blur">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-2 pl-16 sm:px-6 lg:grid-cols-[minmax(16rem,24rem)_1fr_auto] lg:pl-6">
        <HeaderSearchInput
          value={query}
          onChange={setQuery}
          onSubmit={handleSearchSubmit}
        />

        <nav className="order-3 col-span-2 flex justify-center gap-2 lg:order-none lg:col-span-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#8f6a46] !text-white shadow-[0_10px_22px_rgba(143,106,70,0.26)]"
                    : "text-[var(--fe-text-muted)] hover:bg-[#fff4e5] hover:text-[#8f6a46]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#eadcc7] bg-[#fffaf2] text-[#5a3a22] shadow-sm transition hover:border-[#c49b63] hover:bg-white"
            aria-label="Notifications"
          >
            <FontAwesomeIcon icon={faBell} className="text-xs" />
            <span className="absolute right-0 top-0.5 flex py-1 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
              3
            </span>
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((open) => !open)}
              className={`flex items-center gap-2 rounded-full border p-1.5 pr-2 text-[var(--fe-text)] shadow-sm transition ${
                dropdownOpen
                  ? "border-[#8f6a46] bg-white"
                  : "border-[#eadcc7] bg-[#fffaf2] hover:border-[#c49b63] hover:bg-white"
              }`}
              aria-label="Open profile menu"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#448f5c] text-white shadow-inner">
                <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
              </span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="hidden text-xs text-[var(--fe-text-muted)] sm:block"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-[#eadcc7] bg-white text-gray-800 shadow-[0_24px_60px_rgba(82,55,32,0.2)]">
                <div className="bg-[#fffaf2] p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#448f5c] text-white shadow-sm">
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="text-xl"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-[var(--fe-text)]">
                        FarmEase User
                      </span>
                      <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-[#8f6a46] ring-1 ring-[#eadcc7]">
                        <FontAwesomeIcon
                          icon={faSeedling}
                          className="text-[10px]"
                        />
                        {roleLabel}
                      </span>
                    </span>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-[var(--fe-text)] transition hover:bg-[#fff4e5] hover:text-[#8f6a46]"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-[#448f5c]"
                  />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 border-t border-[#eadcc7] px-3 py-2 text-left text-sm font-semibold text-[var(--fe-text)] transition hover:bg-[#fff4e5] hover:text-[#8f6a46]"
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="text-[#448f5c]"
                  />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
