import { getUserQuestions } from "@/lib/actions/user.action";
import React from "react";
import QuestionCard from "../home/QuestionCard";

interface Props {
  searchParams: any;
  clerkId?: string | any;
  userId: string;
}
const QuestionsTab = async ({ searchParams, clerkId, userId }: Props) => {
  const userQuestions = await getUserQuestions({
    userId,
  });

  return (
    <div>
      {userQuestions &&
        userQuestions?.map((question) => (
          <QuestionCard
            key={question._id}
            tags={question.tags}
            _id={question._id}
            title={question.title}
            upvotes={question.upvotes}
            answers={question.answers}
            views={question.views}
            createdAt={question.createdAt}
            author={question.author}
            isProfile={true}
          />
        ))}
      <div></div>
    </div>
  );
};

export default QuestionsTab;
