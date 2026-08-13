export const ROLE_DEFAULT_PATHS = {
  farmer: "/dashboard",
  customer: "/customer/home",
  deliveryPartner: "/delivery-partner/dashboard",
};

export const ROLE_LABELS = {
  farmer: "Farmer",
  customer: "Customer",
  deliveryPartner: "Delivery Partner",
};

export const getStoredUserRole = () => {
  const activeRole = localStorage.getItem("activeRole");
  if (activeRole) return activeRole;

  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.role || "farmer";
  } catch {
    return "farmer";
  }
};

export const getRoleHomePath = (role) => ROLE_DEFAULT_PATHS[role] || ROLE_DEFAULT_PATHS.farmer;
