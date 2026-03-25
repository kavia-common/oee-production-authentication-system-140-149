import { apiClient } from "./client";

/**
 * Attempts common login payload/response shapes.
 * Backend contract is not provided, so this supports:
 * - Response: { token, user } OR { access_token, user } OR { accessToken, user }
 * - User role: user.role OR user.roles[0]
 */
export async function loginRequest({ email, password }) {
  // Common endpoints; first attempt /auth/login then /login
  const candidates = ["/auth/login", "/login", "/api/auth/login"];

  let lastError;
  for (const url of candidates) {
    try {
      const res = await apiClient.post(url, { email, password });
      return res.data;
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError;
}

export async function meRequest() {
  const candidates = ["/auth/me", "/me", "/api/auth/me"];
  let lastError;
  for (const url of candidates) {
    try {
      const res = await apiClient.get(url);
      return res.data;
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError;
}
