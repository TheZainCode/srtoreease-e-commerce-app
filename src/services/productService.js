import { apiClient } from "./apiClient";

const API_URL = import.meta.env.VITE_PRODUCTS_API_URL;

export async function getProducts(signal) {
  return apiClient(API_URL, { signal });
}