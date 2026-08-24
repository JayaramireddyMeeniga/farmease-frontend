import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown, faCompass, faLeaf, faSeedling,
  faShoppingBasket, faTruck, faUsers, faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  getRoleHomePath, getStoredUserRole, ROLE_LABELS,
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
      { path: "/farmer/products", label: "Products" },
      { path: "/farmer/orders", label: "Orders" },
      { path: "/farmer/wallet", label: "Wallet" },
      { path: "/farmer/analytics", label: "Analytics" },
      { path: "/farmer/delivery", label: "Delivery" },
      { path: "/farmer/subscription", label: "Subscription" },
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
    label: "Delivery",
    icon: faTruck,
    roles: ["deliveryPartner"],
    items: [
      { path: "/delivery-partner/orders", label: "Orders" },
      { path: "/delivery-partner/tracking", label: "Tracking" },
      { path: "/delivery-partner/wallet", label: "Wallet" },
      { path: "/cold-storage-search", label: "Cold Storage" },
    ],
  },
  {
    id: "commerce",
    label: "Market",
    icon: faTruck,
    roles: ["farmer"],
    items: [
      { path: "/delivery#supplies", label: "Supplies" },
      { path: "/delivery#orders", label: "Orders" },
      { path: "/marketprice", label: "Market Prices" },
      { path: "/dealers", label: "Dealers" },
      { path: "/cold-storage-search", label: "Cold Storage" },
      { path: "/farmer-live-shop", label: "Live Shop" },
    ],
  },
  {
    id: "agriculturalTips",
    label: "Guides",
    icon: faSeedling,
    roles: ["farmer"],
    items: [
      { path: "/tips", label: "Tips Home" },
      { path: "/agricultural-tips/daily", label: "Daily Tips" },
      { path: "/agricultural-tips/crop", label: "Crop Guidance" },
      { path: "/agricultural-tips/organic", label: "Organic Farming" },
      { path: "/agricultural-tips/weather", label: "Weather Tips" },
      { path: "/agricultural-tips/pest-control", label: "Pest Control" },
      { path: "/agricultural-tips/schemes", label: "Schemes" },
      { path: "/agricultural-tips/video", label: "Video Learning" },
      { path: "/agricultural-tips/ai", label: "AI Recommendations" },
      { path: "/agricultural-tips/expert", label: "Expert Advice" },
    ],
  },
  {
    id: "community",
    label: "People",
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

const Sidebar = () => {
  const location = useLocation();
  const userRole = getStoredUserRole();
  const roleHomePath = getRoleHomePath(userRole);
  const roleLabel = ROLE_LABELS[userRole] || "Farmer";
  const [activePanel, setActivePanel] = useState(null);

  const visibleNavGroups = useMemo(
    () => navGroups.filter((group) => group.roles.includes(userRole)),
    [userRole],
  );

  const isActive = (path) => {
    const { pathname, hash } = splitPath(path);
    return location.pathname === pathname && (!hash || location.hash === hash);
  };

  const activeGroup = visibleNavGroups.find((group) =>
    group.items.some(
      (item) =>
        isActive(item.path) ||
        location.pathname === splitPath(item.path).pathname,
    ),
  );

  const selectedGroup =
    visibleNavGroups.find((group) => group.id === activePanel) || activeGroup;

  const handleGroupClick = (groupId) => {
    setActivePanel((current) => (current === groupId ? null : groupId));
  };

  return (
    <div className="relative min-w-0 max-w-[calc(100vw-6rem)] shrink-0">
      {selectedGroup && activePanel && (
        <div className="absolute inset-x-0 bottom-[calc(100%+0.75rem)] mx-auto max-w-4xl overflow-hidden rounded-lg border border-white/70 bg-white/90 shadow-[0_30px_80px_rgba(38,50,37,0.22)] backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-3 border-b border-[#e5efe2] bg-[#f8fbf5] px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex p-2.5 shrink-0 items-center justify-center rounded-lg bg-[#2f7d5a] text-white shadow-[0_12px_24px_rgba(47,125,90,0.25)]">
                <FontAwesomeIcon icon={selectedGroup.icon} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#17251e]">
                  {selectedGroup.label}
                </p>
                <p className="truncate text-xs font-medium text-[#6a786d]">
                  {roleLabel} workspace
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActivePanel(null)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#405146] shadow-sm ring-1 ring-[#e5efe2] transition hover:bg-[#edf5e9]"
              aria-label="Close navigation panel"
            >
              <FontAwesomeIcon icon={faXmark} className="text-sm" />
            </button>
          </div>

          <div className="grid max-h-[46vh] gap-2 overflow-y-auto p-3 sm:grid-cols-2 lg:grid-cols-3">
            {selectedGroup.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setActivePanel(null)}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${isActive(item.path)
                  ? "bg-[#796654] text-white! shadow-[0_14px_28px_rgba(47,125,90,0.22)]"
                  : "bg-white text-[#2d3f33] ring-1 ring-[#e5efe2] hover:bg-[#edf5e9] hover:text-[#1f6f4d]"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <nav className="flex w-max max-w-full items-center gap-2 rounded-4xl border border-white/55 bg-[#14231c]/95 p-2 text-white shadow-[0_22px_60px_rgba(23,37,30,0.35)] backdrop-blur-2xl">
        <Link
          to={roleHomePath}
          onClick={() => setActivePanel(null)}
          className={`flex min-w-12 items-center justify-center rounded-full p-3 transition ${location.pathname === roleHomePath
            ? "bg-[#20392e] text-[#f5c66a] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_12px_28px_rgba(36,124,82,0.24)] ring-1 ring-[#5fa979]/35"
            : "text-white/72 hover:bg-white/10 hover:text-white"
            }`}
          aria-label="Home"
        >
          FE
        </Link>

        <div className="h-8 w-px shrink-0 bg-white/15" />

        <div className="flex min-w-0 items-center gap-2 overflow-x-auto">
          {visibleNavGroups.map((group) => {
            const groupActive = activeGroup?.id === group.id;
            const panelOpen = activePanel === group.id;

            return (
              <button
                key={group.id}
                type="button"
                onClick={() => handleGroupClick(group.id)}
                className={`group relative flex h-12 shrink-0 items-center gap-2 overflow-hidden rounded-xl px-3 text-sm font-semibold transition sm:px-4 ${panelOpen || groupActive
                  ? "bg-[#20392e] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_16px_34px_rgba(36,124,82,0.24)] ring-1 ring-[#5fa979]/35"
                  : "text-white/68 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {(panelOpen || groupActive) && (
                  <>
                    <span className="pointer-events-none absolute inset-0 rounded-xl border border-[#6faa83]/60" />
                    {/* <span className="absolute left-1/2 top-1 h-1.5 w-8 -translate-x-1/2 rounded-full bg-[#f5c66a] shadow-[0_0_18px_rgba(245,198,106,0.55)]" /> */}
                    <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-[#5fa979]" />
                  </>
                )}
                <span
                  className={`relative flex h-7 w-7 items-center justify-center rounded-xl transition ${panelOpen || groupActive
                    ? "bg-[#f5c66a] text-[#17251e] shadow-[0_8px_18px_rgba(245,198,106,0.28)]"
                    : "text-white/72 group-hover:bg-white/10 group-hover:text-white"
                    }`}
                >
                  <FontAwesomeIcon icon={group.icon} className="text-sm" />
                </span>
                <span className="relative hidden sm:inline">{group.label}</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`relative hidden text-[10px] transition-transform sm:inline ${panelOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
