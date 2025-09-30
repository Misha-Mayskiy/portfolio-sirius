"use client";
import axios from "axios";

interface FormEnter {
  username: string;
  password: string;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const FetchEnter = async (data: FormEnter): Promise<void> => {
  try {

    const response = await api.post("auth/token/", data);
    console.log(response.data);
    alert("Вы успешно вошли!");
    return(response.data)
  } catch (error: any) {
    if (error.response) {
      console.error("Ответ сервера:", error.response.data);
      alert("Неверный логин или пароль");
    } else {
      console.error("Произошла ошибка во входе:");
    }
    throw error;
  }
};

export const FetchImage = async (data: FormData) => {
  try {
    const response = await api.post("auth/token/", data);
    console.log(response);
    if (response.status === 200) {
      console.log("фото отправилось");
    } else {
      console.log(response.status);
    }
  } catch (error) {
    console.error("Ошибка:", error);
  }
};
