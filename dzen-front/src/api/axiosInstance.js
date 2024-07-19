import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const getAvatarUrl = (filename) =>
  `${API_URL}/files/avatars/${filename}`;
export const filesUrl = (filename) => `${API_URL}/files/${filename}`;
