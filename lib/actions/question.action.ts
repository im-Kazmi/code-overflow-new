/* eslint-disable no-unused-vars */
"use server";

import { revalidatePath } from "next/cache";
import Question, { IQuestion } from "../database/question.model";
import Tag from "../database/tag.model";
import User from "../database/user.model";

import { connectToDatabase } from "../mongoose";
import {
  createQuestionParams,
  getQuestionByIdParams,
  getQuestionsParams,
} from "./shared.types";
import Answer from "../database/answer.model";
import Interaction from "../database/interaction.model";
import { auth } from "@clerk/nextjs";
import { FilterQuery } from "mongoose";
export async function createQuestion(params: createQuestionParams) {
  try {
    await connectToDatabase();
    const { title, content, tags, author, path } = params;

    const tagDocuments = [];

    const question = await Question.create({
      title,
      content,
      author,
    });

    for (const tag of tags!) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      // await Promise.all(tagDocuments);
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath("/");
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function getQuestions(params: any) {
  await connectToDatabase();
  try {
    const { searchQuery, filters } = params;

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.title = { $regex: new RegExp(searchQuery, "i") };
    }

    let sortOptions = {};

    switch (filters) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      default:
        break;
    }
    const questions = await Question.find(query)
      .populate({ path: "author", model: User })
      .populate({ path: "tags", model: Tag })
      .sort(sortOptions);
    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionById(params: getQuestionByIdParams) {
  await connectToDatabase();
  try {
    const question = await Question.findById(params.id)
      .populate({
        path: "author",
        model: User,
        select: "_id name clerkId picture",
      })
      .populate({
        path: "tags",
        model: Tag,
        select: "_id  name",
      })
      .populate({ path: "answers", model: Answer });
    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upVoteQuestion(params: any) {
  try {
    const { questionId, userId, hasUpvoted, hasDownVoted } = params;

    let updateQuery = {};

    if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downVotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { upvotes: userId },
      };
    }
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("no question found");
    }

    revalidatePath("/question/:id");
  } catch (error) {}
}

export async function downVoteQuestion(params: any) {
  try {
    const { questionId, userId, hasUpvoted, hasDownVoted } = params;

    let updateQuery = {};

    if (hasDownVoted) {
      updateQuery = { $pull: { downVotes: userId } };
    } else if (hasUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downVotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { downVotes: userId },
      };
    }
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("no question found");
    }

    revalidatePath("/question/:id");
  } catch (error) {}
}

export async function saveQuestion(params: any) {
  await connectToDatabase();
  try {
    const { questionId, userId } = params;

    const user = await User.findById(userId);

    // console.log("user = ", user);
    // console.log("saved questions = ", user.saved);
    const isQuestionSaved = await user?.saved?.includes(questionId);

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { saved: questionId },
        },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { saved: questionId },
        },
        { new: true }
      );
    }
    if (!user) {
      throw new Error("user not found");
    }

    revalidatePath("/question/:id");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteQuestion(params: any) {
  try {
    await connectToDatabase();

    const { questionId, path } = params;

    const { userId } = auth();

    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await User.updateOne({ clerkId: userId }, { $pull: { saved: questionId } });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );

    revalidatePath(path);
  } catch (error) {}
}

export async function getHotQuestions() {
  await connectToDatabase();
  try {
    const hotQuestions = await Question.find()
      .sort({
        views: -1,
        upvotes: -1,
      })
      .limit(5);

    return hotQuestions;
  } catch (error) {}
}
