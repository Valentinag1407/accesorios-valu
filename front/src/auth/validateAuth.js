import { api } from "../api/axiosConfig";

export const checkAuth = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await api.get("/api/verify-token/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};
