import axios from "axios";

export const baseURL = import.meta.env.VITE_BACK_URL;

export const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});
