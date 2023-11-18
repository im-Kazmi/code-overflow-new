import Filter from "@/components/shared/Filter";
import Link from "next/link";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/home/QuestionCard";
import { collectionFilters } from "@/constants";
import { auth } from "@clerk/nextjs";
import { getUserSavedQuestions } from "@/lib/actions/user.action";
import LocalSearch from "@/components/shared/LocalSearch";

export default async function page({ searchParams }: any) {
  const { userId: clerkId } = auth();

  if (!clerkId) return null;

  const savedQuestions = await getUserSavedQuestions({
    clerkId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });
  return (
    <section className="text-white">
      <div>
        <div className=" flex justify-between">
          <h1 className=" text-2xl font-bold first-letter:text-orange-400">
            Saved Questions
          </h1>
          <Link
            href={"/ask-question"}
            className=" px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-200 rounded-xl"
          >
            Ask a Question
          </Link>
        </div>
        <div className="flex w-full mt-5 gap-3 max-sm:flex-col">
          <LocalSearch placeholder="Search Questions" />
          <Filter filters={collectionFilters} />
        </div>
        <div className=" mt-10 flex flex-col gap-10">
          {savedQuestions && savedQuestions?.length > 0 ? (
            savedQuestions?.map((question: any) => (
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
              title={"No Saved Questions"}
              ButtonText="Save Some"
              link="/"
            />
          )}
        </div>
      </div>
    </section>
  );
}
