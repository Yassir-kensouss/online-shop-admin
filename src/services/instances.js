import axios from "axios";
import { API_URL } from "../config";

export const auth = axios.create({
  baseURL: API_URL,
  headers: {
    ContentType: "application/json",
    timeout: 1000,
  },
});
