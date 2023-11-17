/* eslint-disable no-unused-vars */
import HomeFilter from "@/components/home/HomeFilter";
import QuestionCard from "@/components/home/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Search from "@/components/shared/Search";
import { filters } from "@/constants";
import { tag } from "@/lib/actions/tag.actions";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";

const Page = async ({ params }: { params: Params }) => {
  const { id } = params;

  const result = await tag({ tagId: id });

  const { questions, name: tagname } = result as any;
  console.log(result);
  return (
    <div>
      <div className=" flex justify-between text-white">
        <h1 className=" text-2xl font-bold first-letter:text-orange-400">
          {tagname}
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
          questions?.map((question: any) => (
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
  );
};

export default Page;
