import { LOGIN_URL } from "../../constants/history.constants";
import client from "../client";

export const register = (data) => {
  return client.post("/users/registerUser", data);
};
export const login = async (data) => {
  return client.post(LOGIN_URL, data);
};
export const forgotPassword = async (data) => {
  return client.post("/users/forgotPassword", data);
};
export const resetPassword = async (token, data) => {
  return client.patch(`/users/resetPassword/${token}`, data);
};
export const logout = (accessToken) => {
  return client.post("/users/logout", { accessToken });
};
