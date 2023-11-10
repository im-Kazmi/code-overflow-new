import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="bg-red-300 justify-center flex text-red-500 ">
      <UserButton />
    </main>
  );
}
