import axios from "axios";
import { axiosUserInstance } from "../axios";

export const registerUser = async (formData) => {
  const { data } = await axiosUserInstance.post("/register", formData);
  return data;
};

export const userLogin = async (formData) => {
    const { data } = await axiosUserInstance.post('/login', formData)
    return data;
}