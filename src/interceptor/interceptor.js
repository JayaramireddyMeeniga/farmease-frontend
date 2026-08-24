const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

const clearStoredAuth = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  localStorage.removeItem("activeRole");
};

const buildHeaders = (headers = {}, body) => {
  const accessToken = localStorage.getItem("accessToken");
  const nextHeaders = new Headers(headers);

  if (body && !nextHeaders.has("Content-Type")) {
    nextHeaders.set("Content-Type", "application/json");
  }

  if (accessToken && !nextHeaders.has("Authorization")) {
    nextHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  return nextHeaders;
};

const parseResponse = async (response) => {
  const contentType = response.headers.get("Content-Type") || "";

  if (!contentType.includes("application/json")) {
    return null;
  }

  return response.json();
};

export const apiRequest = async (path, options = {}) => {
  const { body, headers, ...requestOptions } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: buildHeaders(headers, body),
    body: body ? JSON.stringify(body) : undefined,
  });
  const responseBody = await parseResponse(response);

  if (!response.ok) {
    if (response.status === 401) {
      clearStoredAuth();
    }

    throw new Error(responseBody?.message || "Request failed");
  }

  return responseBody?.data ?? responseBody;
};

export { clearStoredAuth };
