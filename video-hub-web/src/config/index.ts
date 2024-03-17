export interface Config {
  baseUrl: string;
  baseSocketUrl: string;
}

export const config: Config = {
  baseUrl: import.meta.env.VITE_BASE_APP_URL || "http://localhost:3000",
  baseSocketUrl: import.meta.env.VITE_BASE_SOCKET_URL || "http://localhost:3001",
};