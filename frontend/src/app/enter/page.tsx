'use client';

import { Input } from "@/components/Input";
import Link from "next/link";
import { useState } from "react";

interface FormData {
  username: string;
  password: string;
}


export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) : void => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) : Promise<void> => {
    e.preventDefault();

    try {
      console.log(JSON.stringify(formData));
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/auth/token/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response);
      if (response.ok) {
        alert("Вы успешно вошли!");

        setFormData({
          username: "",
          password: "",
        });
      } else {
        const error = await response.json();
        console.log(error);
        alert(error.message || "Произошла ошибка при входе");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при входе");
    }
  };

  return (
    <main className="flex h-[100vh] items-center justify-center mb-20 p-4">
      <div className="w-full max-w-[800px] p-[32px] m-auto flex flex-col items-center justify-start rounded-lg shadow-md">
        <h1 className="text-3xl mb-8">Вход в профиль</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <Input
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
      </div>
    </main>
  );
}
