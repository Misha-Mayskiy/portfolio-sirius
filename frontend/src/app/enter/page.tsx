import { FormEnter } from "@/components/FormEnter";

export default function Home() {

  return (
    <main className="flex h-[100vh] items-center justify-center mb-20 p-4">
      <div className="w-full max-w-[800px] p-[32px] m-auto flex flex-col items-center justify-start rounded-lg shadow-md">
        <h1 className="text-3xl mb-8">Вход в профиль</h1>
          <FormEnter/>
      </div>
    </main>
  );
}
