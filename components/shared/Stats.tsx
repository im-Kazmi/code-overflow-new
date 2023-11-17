import React from "react";
import StatsCard from "./StatsCard";

interface Props {
  totalQuestions: number;
  totalAnswers: number;
}
const Stats = ({ totalQuestions, totalAnswers }: Props) => {
  return (
    <div className=" flex flex-wrap w-full  justify-center gap-5 mt-5">
      <StatsCard title="Questions" value={totalQuestions} />
      <StatsCard title="Answers" value={totalAnswers} />
      <StatsCard
        imageUrl="/assets/icons/gold-medal.svg"
        title="Gold Badges"
        value={2}
      />
      <StatsCard
        imageUrl="/assets/icons/silver-medal.svg"
        title="Silver Badges"
        value={0}
      />
      <StatsCard
        imageUrl="/assets/icons/bronze-medal.svg"
        title="Bronze Badges"
        value={3}
      />
    </div>
  );
};

export default Stats;
