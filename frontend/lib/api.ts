import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true, // enable if sending cookies

  // Custom serializer for array parameters (Django expects repeated keys, not brackets)
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        // Append each array item separately for repeated key format
        value.forEach((item) => searchParams.append(key, String(item)));
      } else if (value !== null && value !== undefined && value !== "") {
        searchParams.set(key, String(value));
      }
    }
    return searchParams.toString();
  },
});

export default api;