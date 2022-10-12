import axios from "axios";
import { API_URL } from "../config";
import { isAuthenticated } from "../utils/helpers";

const { token } = isAuthenticated();

export const auth = axios.create({
  baseURL: API_URL,
  headers: {
    ContentType: "application/json",
    timeout: 1000,
  },
});

export const admin = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    ContentType: "application/json",
    Authorization: `Bearer ${token}`,
  },
});
