import { getUserAnswers } from "@/lib/actions/user.action";
import React from "react";
import AnswerCard from "./AnswerCard";

interface Props {
  userId: string;
  clerkId: string | null;
}
const AnswerTab = async ({ userId, clerkId }: Props) => {
  const userAnswers = await getUserAnswers({
    userId,
  });

  return (
    <div>
      {userAnswers &&
        userAnswers.map((answer) => (
          <AnswerCard
            key={answer._id}
            _id={answer._id}
            upvotes={answer.upvotes?.length}
            createdAt={answer.createdAt}
            author={answer.author}
            question={answer.question}
            clerkId={clerkId}
          />
        ))}
      <div></div>
    </div>
  );
};

export default AnswerTab;
