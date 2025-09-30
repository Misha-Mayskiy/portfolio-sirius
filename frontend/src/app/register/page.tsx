"use client";

import { Input } from "@/components/Input";
import { useState } from "react";
interface FormData {
  first_name: string;
  last_name: string;
  patronymic: string;
  username: string;
  email: string;
  password: string;
  password2: string;
  gender: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    patronymic: "",
    username: "",
    email: "",
    password: "",
    password2: "",
    gender: "MALE",
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

    if (formData.password !== formData.password2) {
      alert("Пароли не совпадают");
      return;
    }

    try {
      console.log(JSON.stringify(formData));
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/auth/register/",
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
        alert("Регистрация успешна!");

        setFormData({
          first_name: "",
          last_name: "",
          patronymic: "",
          username: "",
          email: "",
          password: "",
          password2: "",
          gender: "",
        });
      } else {
        const error = await response.json();
        console.log(error);
        alert(error.message || "Ошибка регистрации.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при регистрации");
    }
  };

  return (
    <>
      <div className="p-4 max-w-md mx-auto">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md my-4">
          <h1 className="text-2xl font-bold text-center mb-6">
            Создание аккаунта
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="first_name"
              label="Имя"
              placeholder=""
              id="first_name"
              type="text"
              required
              autoComplete="name"
              onChange={handleChange}
            />
            <Input
              name="last_name"
              label="Фамилия"
              placeholder=""
              id="last_name"
              type="text"
              required
              autoComplete="name"
              onChange={handleChange}
            />
            <Input
              name="patronymic"
              label="Отчество"
              placeholder=""
              id="Patronymic"
              type="text"
              required
              autoComplete="name"
              onChange={handleChange}
            />

            <Input
              name="username"
              label="Логин"
              placeholder=""
              id="username"
              type="text"
              required
              autoComplete="name"
              onChange={handleChange}
            />
            <Input
              name="email"
              label="Почта"
              placeholder=""
              id="Email"
              type="email"
              required
              autoComplete="email"
              onChange={handleChange}
            />

            <Input
              name="password"
              label="Пароль"
              placeholder=""
              id="password"
              type="password"
              required
              autoComplete="new-password"
              minLength={6}
              onChange={handleChange}
            />
            <Input
              name="password2"
              label="Подтвердите пароль"
              placeholder=""
              id="password2"
              type="password"
              required
              autoComplete="new-password"
              minLength={6}
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Пол
                </label>
                <select
                  name="gender"
                  onChange={handleChange}
                  id="gender"
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                >
                  <option disabled value="">
                    Выберите...
                  </option>
                  <option value="MALE">Мужской</option>
                  <option value="FEMALE">Женский</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-fuchsia-600 text-white bg-primary hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Зарегестрироваться
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
