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

export const FetchImage = async (data: FormData): Promise<string> => {
  try {
    const response = await api.post("profile/upload/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    console.log("фото отправилось");
    return response.data?.recognized_text
      ? response.data.recognized_text
      : "текст не распознан";
  } catch (error: any) {
    if (error.response) {
      console.error("Ответ сервера:", error.response.data);
    } else {
      console.error("Произошла ошибка: ", error.message);
    }
    throw error;
  }
};
