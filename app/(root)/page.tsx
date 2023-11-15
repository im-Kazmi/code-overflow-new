import Search from "@/components/shared/Search";
import Filter from "@/components/shared/Filter";
import HomeFilter from "@/components/home/HomeFilter";
import Link from "next/link";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/home/QuestionCard";
import { getQuestions } from "@/lib/actions/question.action";
import { filters } from "@/constants";

export default async function Home() {
  const questions = await getQuestions({});
  return (
    <main className="text-white">
      <div>
        <div className=" flex justify-between">
          <h1 className=" text-2xl font-bold first-letter:text-orange-400">
            All Questions
          </h1>
          <Link
            href={"/ask-question"}
            className=" px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-200 rounded-xl"
          >
            Ask a Question
          </Link>
        </div>
        <div className="flex w-full mt-5 gap-3 max-sm:flex-col">
          <Search placeholder="Search Questions" />
          <Filter filters={filters} />
        </div>
        <HomeFilter />

        <div className=" mt-10 flex flex-col gap-10">
          {questions && questions?.length > 0 ? (
            questions?.map((question) => (
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                author={question.author}
                upvotes={question.upvotes}
                answers={question.answers}
                tags={question.tags}
                views={question.views}
                createdAt={question.createdAt}
              />
            ))
          ) : (
            <NoResult
              title={"No question to Show"}
              ButtonText="Ask a Question"
              link="/ask-question"
            />
          )}
        </div>
      </div>
    </main>
  );
}
