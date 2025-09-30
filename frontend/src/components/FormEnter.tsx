"use client";

import { useState } from "react";
import { Input } from "../components/Input";
import Link from "next/link";
import { FetchEnter } from "@/api/api";
interface FormData {
  username: string;
  password: string;
}

export const FormEnter = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const data = await FetchEnter(formData);
      console.log(data);
    } catch {
      setFormData({
        username: "",
        password: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <Input
        value={formData.username}
        name="username"
        label="Логин"
        placeholder="Логин"
        autoComplete="username"
        id="usernameEnter"
        required
        type="text"
        onChange={handleChange}
      />
      <Input
        value={formData.password}
        name="password"
        label="Пароль"
        placeholder="Пароль"
        autoComplete="password"
        id="passwordEnter"
        required
        type="password"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-fuchsia-600 text-white bg-primary hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed mt-2"
      >
        Вход
      </button>
      <p className="text-center mt-2">
        Нет аккаунта?{" "}
        <Link href="/register" className="text-fuchsia-600">
          Зарегистрироваться
        </Link>
      </p>
    </form>
  );
};
