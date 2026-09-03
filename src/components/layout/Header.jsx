import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthSession } from "../../authentication/authApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChevronDown,
  faCloudSun,
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
  {
    path: "/agri-workforce",
    label: "Agri Workforce",
    keywords: "agri workforce agriculture job laborers workers farm labor booking",
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
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const userRole = getStoredUserRole();
  const roleHomePath = getRoleHomePath(userRole);
  const roleLabel = ROLE_LABELS[userRole] || "Farmer";

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
    clearAuthSession();
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
    <header className="sticky top-0 z-30 border-b border-white/70 bg-[#f8fbf5]/88 shadow-[0_14px_40px_rgba(38,50,37,0.1)] backdrop-blur-2xl">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 md:grid-cols-[auto_minmax(18rem,40rem)_auto]">
        <Link
          to={roleHomePath}
          className="flex items-center gap-2.5 rounded-md px-1 py-1 transition hover:bg-white/70 sm:px-2"
          aria-label="Go to workspace home"
        >
          <span className="flex px-3.5 py-3 shrink-0 items-center justify-center rounded-lg bg-[#17251e] text-sm font-semibold text-[#f5c66a] shadow-[0_14px_28px_rgba(23,37,30,0.24)]">
            FE
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block text-base font-extrabold leading-tight text-[#17251e]">
              FarmEase
            </span>
            <span className="block text-xs font-semibold text-[#69786d]">
              {roleLabel} workspace
            </span>
          </span>
        </Link>

        <div className="order-3 col-span-3 w-full justify-self-center md:order-0 md:col-span-1 md:max-w-2xl">
          <HeaderSearchInput
            value={query}
            onChange={setQuery}
            onSubmit={handleSearchSubmit}
          />
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <Link
            to="/weatherForeCast"
            className="hidden h-10 items-center gap-2 rounded-lg bg-white px-3 text-sm font-bold text-[#2f7d5a] shadow-sm ring-1 ring-[#dfebdc] transition hover:bg-[#edf5e9] md:flex"
          >
            <FontAwesomeIcon icon={faCloudSun} className="text-sm" />
            Weather
          </Link>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#405146] shadow-sm ring-1 ring-[#dfebdc] transition hover:bg-[#edf5e9]"
            aria-label="Notifications"
          >
            <FontAwesomeIcon icon={faBell} className="text-sm" />
            <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-[#e45448] px-1 py-1 text-[10px] font-bold leading-none text-white ring-2 ring-[#f8fbf5]">
              3
            </span>
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((open) => !open)}
              className={`flex items-center gap-2 rounded-lg p-1.5 pr-2 text-(--fe-text) shadow-sm ring-1 transition ${dropdownOpen
                ? "bg-white ring-[#2f7d5a]"
                : "bg-white ring-[#dfebdc] hover:bg-[#edf5e9]"
                }`}
              aria-label="Open profile menu"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2f7d5a] text-white shadow-inner">
                <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
              </span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="hidden text-xs text-(--fe-text-muted) sm:block"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-3xl border border-[#dfebdc] bg-white text-gray-800 shadow-[0_24px_60px_rgba(38,50,37,0.18)]">
                <div className="bg-[#f8fbf5] p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2f7d5a] text-white shadow-sm">
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="text-xl"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-(--fe-text)">
                        FarmEase User
                      </span>
                      <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-[#2f7d5a] ring-1 ring-[#dfebdc]">
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
                  className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-(--fe-text) transition hover:bg-[#edf5e9] hover:text-[#1f6f4d]"
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
                  className="flex w-full items-center gap-3 border-t border-[#dfebdc] px-3 py-2 text-left text-sm font-semibold text-(--fe-text) transition hover:bg-[#edf5e9] hover:text-[#1f6f4d]"
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
