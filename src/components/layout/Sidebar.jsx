import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars, faChevronDown, faChevronLeft, faLeaf, faRightFromBracket,
  faSeedling, faShoppingBasket, faTimes, faTruck, faUserCircle, faUsers
} from "@fortawesome/free-solid-svg-icons";
import {
  getRoleHomePath,
  getStoredUserRole,
  ROLE_LABELS,
} from "../../utils/roleUtils";

const navGroups = [
  {
    id: "farm",
    label: "Farm Tools",
    icon: faSeedling,
    roles: ["farmer"],
    items: [
      { path: "/cropManagement", label: "Crop Management" },
      { path: "/irrigation", label: "Irrigation" },
      { path: "/tankMotor", label: "Tank Motor" },
      { path: "/cropRotation", label: "Crop Rotation" },
    ],
  },
  {
    id: "farmer",
    label: "Farmer",
    icon: faLeaf,
    roles: ["farmer"],
    items: [
      { path: "/farmer/products", label: "Farmer Products" },
      { path: "/farmer/orders", label: "Farmer Orders" },
      { path: "/farmer/wallet", label: "Farmer Wallet" },
      { path: "/farmer/analytics", label: "Farmer Analytics" },
      { path: "/farmer/delivery", label: "Farmer Delivery" },
      { path: "/farmer/subscription", label: "Farmer Subscription" },
    ],
  },
  {
    id: "customer",
    label: "Customer",
    icon: faShoppingBasket,
    roles: ["customer"],
    items: [
      { path: "/apartment-delivery", label: "Apartment Delivery" },
      { path: "/customer/cart", label: "Cart" },
      { path: "/customer/checkout", label: "Checkout" },
      { path: "/customer/orders", label: "Orders" },
      { path: "/customer/live-tracking", label: "Live Tracking" },
      { path: "/customer/subscriptions", label: "Subscriptions" },
      { path: "/subscription-delivery", label: "Subscription Delivery" },
    ],
  },
  {
    id: "deliveryPartner",
    label: "Delivery Partner",
    icon: faTruck,
    roles: ["deliveryPartner"],
    items: [
      { path: "/delivery-partner/orders", label: "Delivery Orders" },
      { path: "/delivery-partner/tracking", label: "Delivery Tracking" },
      { path: "/delivery-partner/wallet", label: "Delivery Wallet" },
      { path: "/cold-storage-search", label: "Cold Storage" },
    ],
  },
  {
    id: "commerce",
    label: "Orders & Market",
    icon: faTruck,
    roles: ["farmer"],
    items: [
      { path: "/delivery#supplies", label: "Supplies" },
      { path: "/delivery#orders", label: "Orders" },
      { path: "/marketprice", label: "Market Prices" },
      { path: "/dealers", label: "Dealers" },
      { path: "/cold-storage-search", label: "Cold Storage" },
      { path: "/farmer-live-shop", label: "Farmer Live Shop" },
    ],
  },
  {
    id: "agriculturalTips",
    label: "Agricultural Tips",
    icon: faSeedling,
    roles: ["farmer"],
    items: [
      { path: "/tips", label: "Tips Home" },
      { path: "/agricultural-tips/daily", label: "Daily Tips" },
      { path: "/agricultural-tips/crop", label: "Crop Guidance" },
      { path: "/agricultural-tips/organic", label: "Organic Farming" },
      { path: "/agricultural-tips/weather", label: "Weather Tips" },
      { path: "/agricultural-tips/pest-control", label: "Pest Control" },
      { path: "/agricultural-tips/schemes", label: "Government Schemes" },
      { path: "/agricultural-tips/video", label: "Video Learning" },
      { path: "/agricultural-tips/ai", label: "AI Recommendations" },
      { path: "/agricultural-tips/expert", label: "Expert Advice" },
    ],
  },
  {
    id: "community",
    label: "Community",
    icon: faUsers,
    roles: ["farmer"],
    items: [
      { path: "/communityForum", label: "Forum" },
      { path: "/agricultureJob", label: "Jobs" },
      { path: "/contact", label: "Contact" },
    ],
  },
];

const splitPath = (path) => {
  const [pathname, hash = ""] = path.split("#");
  return { pathname, hash: hash ? `#${hash}` : "" };
};

const Sidebar = ({ collapsed, onCollapseToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = getStoredUserRole();
  const roleLabel = ROLE_LABELS[userRole] || "Farmer";
  const roleHomePath = getRoleHomePath(userRole);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({
    farm: false,
    farmer: false,
    customer: false,
    deliveryPartner: false,
    commerce: false,
    agriculturalTips: false,
    community: false,
  });

  const sidebarWidth = collapsed
    ? "w-56 lg:w-16 xl:w-20"
    : "w-56 lg:w-56 xl:w-62";
  const activeItemClass = "bg-green-300 text-green-700 shadow-sm";
  const visibleNavGroups = useMemo(
    () => navGroups.filter((group) => group.roles.includes(userRole)),
    [userRole],
  );

  const isActive = (path) => {
    const { pathname, hash } = splitPath(path);
    return location.pathname === pathname && (!hash || location.hash === hash);
  };

  const activeGroupId = visibleNavGroups.find((group) =>
    group.items.some(
      (item) =>
        isActive(item.path) ||
        location.pathname === splitPath(item.path).pathname,
    ),
  )?.id;

  useEffect(() => {
    if (!activeGroupId) {
      setOpenGroups(
        visibleNavGroups.reduce((acc, group) => {
          acc[group.id] = false;
          return acc;
        }, {}),
      );
      return;
    }

    setOpenGroups(
      visibleNavGroups.reduce((acc, group) => {
        acc[group.id] = group.id === activeGroupId;
        return acc;
      }, {}),
    );
  }, [activeGroupId, visibleNavGroups]);

  const closeMobileSidebar = () => {
    setSidebarOpen(false);
    setDropdownOpen(false);
  };

  const handleNavClick = () => {
    closeMobileSidebar();
  };

  const handleBrandClick = (event) => {
    if (collapsed && onCollapseToggle) {
      event.preventDefault();
      onCollapseToggle();
      return;
    }

    handleNavClick();
  };

  const handleProfileClick = () => {
    if (collapsed && onCollapseToggle) {
      onCollapseToggle();
      setDropdownOpen(true);
      return;
    }

    setDropdownOpen((open) => !open);
  };

  const handleLogout = () => {
    closeMobileSidebar();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("activeRole");
    navigate("/");
  };

  const toggleGroup = (groupId) => {
    setOpenGroups((current) =>
      visibleNavGroups.reduce((acc, group) => {
        acc[group.id] = group.id === groupId ? !current[groupId] : false;
        return acc;
      }, {}),
    );
  };

  const handleGroupClick = (groupId) => {
    if (collapsed && onCollapseToggle) {
      onCollapseToggle();
      setOpenGroups(
        visibleNavGroups.reduce((acc, group) => {
          acc[group.id] = group.id === groupId;
          return acc;
        }, {}),
      );
      return;
    }

    toggleGroup(groupId);
  };

  return (
    <>
      <button
        onClick={() => setSidebarOpen((open) => !open)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-[var(--fe-leaf-dark)] p-2 text-white shadow-md lg:hidden"
        aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
      >
        <FontAwesomeIcon
          icon={sidebarOpen ? faTimes : faBars}
          className="text-xl"
        />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 transform bg-[var(--fe-leaf)] text-white shadow-2xl shadow-green-950/20 transition-[width,transform] duration-500 ease-in-out ${sidebarWidth} ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        <div className="relative flex h-full flex-col overflow-hidden border-r border-green-800/50">
          <Link
            to={roleHomePath}
            onClick={handleBrandClick}
            className={`flex items-center gap-3 border-b border-white/10 px-4 py-4 ${collapsed ? "justify-center lg:px-2" : ""
              }`}
            aria-label={
              collapsed ? "Expand sidebar" : `Go to ${roleLabel} home`
            }
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-base font-bold text-green-900 shadow-sm">
              FE
            </span>
            <span className={collapsed ? "hidden" : "block"}>
              <span className="block text-lg font-bold leading-tight">
                FarmEase
              </span>
              <span className="text-xs text-green-100">
                {roleLabel} workspace
              </span>
            </span>
          </Link>

          {!collapsed && (
            <button
              type="button"
              onClick={onCollapseToggle}
              className="absolute right-3 top-5 hidden h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-300 hover:bg-white/20 lg:flex"
              aria-label="Collapse sidebar"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
            </button>
          )}

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="md:space-y-2 lg:space-y-4 space-y-4">
              {visibleNavGroups.map((group) => {
                const isOpen = openGroups[group.id];
                const groupActive = activeGroupId === group.id;

                return (
                  <section key={group.id}>
                    <button
                      type="button"
                      onClick={() => handleGroupClick(group.id)}
                      className={`grid w-full items-center rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-300 ${collapsed
                          ? "grid-cols-[auto_auto] justify-center gap-2 px-2"
                          : "grid-cols-[minmax(0,1fr)_auto] gap-4"
                        } ${groupActive ? activeItemClass : "text-green-50 hover:bg-white/10"}`}
                    >
                      <span
                        className={`flex min-w-0 items-center gap-3 ${collapsed ? "justify-center" : ""}`}
                      >
                        <FontAwesomeIcon icon={group.icon} className="w-4" />
                        <span
                          className={collapsed ? "hidden" : "block truncate"}
                        >
                          {group.label}
                        </span>
                      </span>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`text-xs transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isOpen && !collapsed && (
                      <div className="mt-1 space-y-1 border-l border-white/15 pl-3">
                        {group.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={handleNavClick}
                            className={`block rounded-md px-3 py-2 text-sm transition-colors duration-300 ${isActive(item.path)
                                ? `${activeItemClass} font-semibold`
                                : "text-green-50 hover:bg-white/10"
                              }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </nav>

          {/* <div className="border-t border-white/10 p-3">
            {dropdownOpen && !collapsed && (
              <div className="mb-2 overflow-hidden rounded-lg border border-green-100 bg-white text-gray-800 shadow-xl">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-300 hover:bg-gray-100"
                  onClick={handleNavClick}
                >
                  <FontAwesomeIcon icon={faLeaf} className="text-green-600" />
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-3 text-left text-sm transition-colors duration-300 hover:bg-gray-100"
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="text-green-600"
                  />
                  Logout
                </button>
              </div>
            )}

            <button
              onClick={handleProfileClick}
              className={`flex w-full items-center rounded-lg bg-green-800/65 p-2.5 text-left transition-colors duration-300 hover:bg-green-800 ${
                collapsed ? "justify-center gap-2" : "justify-between"
              }`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-green-700">
                  <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
                </span>
                <span className={collapsed ? "hidden" : "min-w-0"}>
                  <span className="block truncate text-sm font-semibold">
                    FarmEase User
                  </span>
                  <span className="block truncate text-xs text-green-100">
                    {roleLabel}
                  </span>
                </span>
              </span>
              {!collapsed && (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-xs transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              )}
            </button>
          </div> */}
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation overlay"
        />
      )}
    </>
  );
};

export default Sidebar;
