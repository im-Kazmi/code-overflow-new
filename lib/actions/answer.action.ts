"use server";
/* eslint-disable no-unused-vars */

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import Answer from "../database/answer.model";
import Question from "../database/question.model";

export async function createAnswer(params: any) {
  try {
    await connectToDatabase();
    const { author, content, question } = params;

    const answer = new Answer({ content, author, question });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });

    await answer.save();
    revalidatePath("/question/:id");
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function getAllAnswers(params: any) {
  try {
    await connectToDatabase();
    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture ")
      .sort({ createdAt: -1 });

    return answers;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}
