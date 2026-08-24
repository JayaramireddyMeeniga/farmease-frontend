import { apiRequest, clearStoredAuth } from "../interceptor/interceptor";

const requestAuth = async (path, payload) => {
  return apiRequest(`/auth/${path}`, {
    method: "POST",
    body: payload,
  });
};

export const loginUser = (payload) => requestAuth("login", payload);

export const registerUser = (payload) => requestAuth("register", payload);

export const storeAuthSession = ({ user, accessToken }) => {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("activeRole", user.role);
};

export const clearAuthSession = () => {
  clearStoredAuth();
};
