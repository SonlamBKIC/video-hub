export interface Config {
  baseUrl: string;
  baseSocketUrl: string;
}

export const config: Config = {
  baseUrl: import.meta.env.BASE_APP_URL || "http://localhost:3434",
  baseSocketUrl: import.meta.env.BASE_SOCKET_URL || "http://localhost:3435",
};