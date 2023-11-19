/* eslint-disable no-unused-vars */
import QuestionCard from "@/components/home/QuestionCard";
import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/LocalSearch";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import { filters } from "@/constants";
import { tag } from "@/lib/actions/tag.actions";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";

const Page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: any;
}) => {
  const { id } = params;

  const { questionByTag, isNext } = await tag({
    tagId: id,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div>
      <div className=" flex justify-between text-white">
        <h1 className=" text-2xl font-bold first-letter:text-orange-400">
          {questionByTag.name}
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
        <Filter filters={filters} />
      </div>
      <div className=" mt-10 flex flex-col gap-10">
        {questionByTag && questionByTag?.questions?.length > 0 ? (
          questionByTag?.questions?.map((question: any) => (
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
      <Pagination
        isNext={isNext}
        pageNumber={searchParams.page ? +searchParams.page : 1}
      />
    </div>
  );
};

export default Page;
