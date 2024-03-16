import axios from "axios";
import { config } from "./config";

export const loginProxy = async (username: string, password: string) => {
  const response = await axios.post(`${config.baseUrl}/login`, {
    username,
    password,
  });
  return response.data;
}

export const registerProxy = async (username: string, password: string) => {
  const response = await axios.post(`${config.baseUrl}/register`, {
    username,
    password,
  });
  return response.data;
}

export const getVideosProxy = async (page: number, limit: number) => {
  const response = await axios.get(`${config.baseUrl}/videos`, {
    params: {
      page,
      limit,
    },
  });
  return response.data;
}

export const shareVideoProxy = async (url: string, accessToken: string) => {
  const response = await axios.post(`${config.baseUrl}/videos`, {
    url,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}