import HomeFilter from "@/components/home/HomeFilter";
import Link from "next/link";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/home/QuestionCard";
import { getQuestions } from "@/lib/actions/question.action";
import LocalSearch from "@/components/shared/LocalSearch";
import Pagination from "@/components/shared/Pagination";

export default async function Home({ searchParams }: any) {
  const { questions, isNext } = await getQuestions({
    searchQuery: searchParams.q,
    filters: searchParams.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });
  return (
    <div className="text-white">
      <div>
        <div className=" flex justify-between">
          <h1 className=" text-2xl font-bold first-letter:text-orange-400">
            All Questions
          </h1>
          <Link
            href={"/ask-question"}
            className=" px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-200 rounded-md"
          >
            Ask a Question
          </Link>
        </div>
        <div className="flex w-full mt-5 gap-3 max-sm:flex-col">
          <LocalSearch placeholder="Search Questions" />
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
      <Pagination
        pageNumber={searchParams?.page ? +searchParams?.page : 1}
        isNext={isNext}
      />
    </div>
  );
}
