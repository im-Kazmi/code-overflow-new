/* eslint-disable no-unused-vars */
"use server";
import Interaction from "../database/interaction.model";
import Question from "../database/question.model";
import { connectToDatabase } from "../mongoose";

export async function viewQuestion(params: any) {
  try {
    await connectToDatabase();

    const { questionId, userId } = params;

    if (userId) {
      const interactionExists = await Interaction.findOne({
        user: userId,
        question: questionId,
        action: "view",
      });

      if (interactionExists)
        return console.log("user already viewed this question");

      await Question.findByIdAndUpdate(questionId, {
        $inc: { views: 1 },
      });
      await Interaction.create({
        user: userId,
        question: questionId,
        action: "view",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
