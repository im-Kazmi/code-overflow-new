/* eslint-disable tailwindcss/classnames-order */
import Search from "@/components/shared/Search";
import Filter from "@/components/shared/Filter";
import HomeFilter from "@/components/home/HomeFilter";
import Link from "next/link";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/home/QuestionCard";
import { getQuestions } from "@/lib/actions/question.action";

// const questions = [
//   {
//     _id: "1",
//     title: "useState is not working in React",
//     tags: [
//       { _id: "1", name: "React" },
//       { _id: "2", name: "Javascript" },
//     ],
//     author: {
//       _id: "1",
//       name: "kazmi",
//       picture: "/assets/avatars/kazmi.jpg",
//     },
//     upvotes: 10,
//     views: 120,
//     answers: [],
//     createdAt: new Date("2023-09-01T12:00:00.000Z"),
//   },
//   {
//     _id: "2",
//     title: "How to implement authentication in a Node.js application?",
//     tags: [
//       { _id: "3", name: "Node.js" },
//       { _id: "4", name: "Authentication" },
//     ],
//     author: {
//       _id: "2",
//       name: "khanna",
//       picture: "/assets/avatars/khanna.jpg",
//     },
//     upvotes: 25,
//     views: 200,
//     answers: [],
//     createdAt: new Date("2023-10-15T09:30:00.000Z"),
//   },
//   {
//     _id: "3",
//     title: "Best practices for optimizing performance in a React app",
//     tags: [
//       { _id: "1", name: "React" },
//       { _id: "5", name: "Performance" },
//     ],
//     author: {
//       _id: "2",
//       name: "Smith",
//       picture: "/assets/avatars/smith.jpg",
//     },
//     upvotes: 15,
//     views: 180,
//     answers: [],
//     createdAt: new Date("2023-08-20T15:45:00.000Z"),
//   },
//   {
//     _id: "4",
//     title: "How to use async/await in JavaScript for asynchronous operations?",
//     tags: [
//       { _id: "2", name: "Javascript" },
//       { _id: "6", name: "Async/Await" },
//     ],
//     author: {
//       _id: "4",
//       name: "Lopez",
//       picture: "/assets/avatars/Lopez.jpg",
//     },
//     upvotes: 30,
//     views: 250,
//     answers: [],
//     createdAt: new Date("2023-11-05T08:00:00.000Z"),
//   },
//   {
//     _id: "5",
//     title: "Creating a RESTful API with Express and MongoDB",
//     tags: [
//       { _id: "3", name: "Node.js" },
//       { _id: "7", name: "Express" },
//       { _id: "8", name: "MongoDB" },
//     ],
//     author: {
//       _id: "5",
//       name: "Chen",
//       picture: "/assets/avatars/chen.jpg",
//     },
//     upvotes: 18,
//     views: 150,
//     answers: [],
//     createdAt: new Date("2023-11-13T16:55:50.000Z"),
//   },
// ];
export default async function Home() {
  const { questions } = await getQuestions({});
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
          <Filter />
        </div>
        <HomeFilter />

        <div className=" mt-10 flex flex-col gap-10">
          {questions?.length > 0 ? (
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
            <NoResult />
          )}
        </div>
      </div>
    </main>
  );
}
