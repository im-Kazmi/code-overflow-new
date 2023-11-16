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
      .sort({ createdAt: -1 })
      .lean();

    return answers;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}
export async function upVoteAnswer(params: any) {
  await connectToDatabase();
  try {
    const { answerId, userId, hasUpvoted, hasDownVoted } = params;

    let updateQuery = {};

    if (hasUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
      };
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { upvotes: userId },
      };
    }

    await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    revalidatePath("/question/:id");
  } catch (error) {
    console.log(error);
  }
}

export async function downVoteAnswer(params: any) {
  try {
    const { answerId, userId, hasUpvoted, hasDownVoted } = params;

    let updateQuery = {};

    if (hasDownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { downvotes: userId },
      };
    }
    const question = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("no question found");
    }

    revalidatePath("/question/:id");
  } catch (error) {}
}