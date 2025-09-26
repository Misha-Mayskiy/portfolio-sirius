import { redirect } from "next/navigation";

export default function Home() {
  redirect("/enter"); // например, сразу ведём на /dashboard
}