import Search from "@/components/shared/Search";
import Filter from "@/components/shared/Filter";

export default function Home() {
  return (
    <main className="text-white">
      <div>
        <div className=" flex justify-between">
          <h1 className=" text-2xl font-bold first-letter:text-orange-400">
            All Questions
          </h1>
          <button className=" px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-200 rounded-xl">
            Ask a Question
          </button>
        </div>
        <div className="flex w-full mt-5 gap-3">
          <Search placeholder="Search Questions" />
          <Filter />
        </div>
      </div>
    </main>
  );
}
