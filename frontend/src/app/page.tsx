"use client";

import { FetchImage } from "@/api/api";
import { useRef, useState } from "react";
export default function Home() {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [text, setText] = useState<string>("");
  const HandleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    formdata.append("title", e.target.files[0].name);
    formdata.append("recognize", "true");
    console.log(formdata);
    const textResponse = await FetchImage(formdata);
    setText(textResponse);
  };

  return (
    <>
      <div
        onClick={HandleClick}
        className="m-auto max-w-[90vw] mt-10 w-[500px] h-[300px] bg-gradient-to-br from-white to-gray-100 border-2 border-dashed border-gray-400 rounded-2xl flex flex-col justify-center items-center text-center p-5 shadow-lg transition-all duration-300 ease-in-out cursor-pointer hover:border-blue-500 hover:shadow-2xl"
      >
        <div className="text-5xl text-blue-500 mb-2">📤</div>
        <div className="text-lg text-gray-800 mb-1">
          Перетащите изображения сюда
        </div>
        <div className="text-sm text-gray-600">
          или кликните, чтобы выбрать файлы (JPG, PNG)
        </div>
        <input
          onChange={handleFileChange}
          ref={inputRef}
          type="file"
          id="file-input"
          accept=".png, .jpg, .jpeg, .pdf, .gif, .docx, .doc, .xls, .xlsx, .pptx"
          multiple
          hidden
        />
      </div>

      <div id="file-list" className="bg-yellow-100 m-auto mt-5 max-w-[90vw] w-[500px] text-left rounded-xl py-4 px-4">
        {text && <p className="text-[18px]">{text}</p>}
      </div>
    </>
  );
}
