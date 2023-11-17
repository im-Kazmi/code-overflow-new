/* eslint-disable no-unused-vars */
"use server";

import { revalidatePath } from "next/cache";
import User from "../database/user.model";
import { connectToDatabase } from "../mongoose";
import Question from "../database/question.model";
import { getAllUsersParams } from "./shared.types";
import Tag from "../database/tag.model";
import Answer from "../database/answer.model";

export async function getUserById(params: any) {
  await connectToDatabase();
  try {
    const { userId } = params;
    const user = await User.findOne({
      clerkId: userId,
    });
    return user;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function createUser(params: any) {
  await connectToDatabase();
  try {
    const newUser = await User.create(params);

    return newUser;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function updateUser(params: any) {
  await connectToDatabase();
  try {
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function deleteUser(params: any) {
  await connectToDatabase();
  try {
    const { clerkId } = params;
    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("user not found");
    }

    const userQuestionsIds = await Question.find({ author: user._id }).distinct(
      "_id"
    );

    await Question.deleteMany({ author: user._id });

    // TODO: Delete user answers,comments,etc

    await User.findByIdAndDelete({ clerkId });
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

// export async function getUsers(params: getAllUsersParams) {
export async function getUsers() {
  await connectToDatabase();
  try {
    // const { page = 1, pageSize = 20 } = params;
    const users = await User.find({}).sort({ createdAt: -1 });

    return users;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function getUserSavedQuestions(params: any) {
  try {
    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      model: Question,
      match: searchQuery
        ? { title: { regex: new RegExp(searchQuery, "i") } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: " _id name" },
        { path: "author", model: User, select: " _id name clerkId picture" },
      ],
    });

    if (!user) {
      throw new Error("user not found");
    }

    const savedQuestions = user.saved;

    return savedQuestions;
  } catch (error) {}
}

export async function getUserInfo(params: any) {
  await connectToDatabase();
  try {
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("user not found");
    }

    const totalQuestions = await Question.countDocuments({
      author: user._id,
    });
    const totalAnswers = await Answer.countDocuments({
      author: user._id,
    });

    return { user, totalQuestions, totalAnswers };
  } catch (error) {}
}

export async function getUserQuestions(params: any) {
  try {
    const { userId, page = 1, pageSize = 10 } = params;
    const userQuestions = await Question.find({ author: userId })
      .sort({
        createdAt: -1,
        upvotes: -1,
      })
      .populate("author", " _id clerkId name picture")
      .populate("tags", " _id name")
      .limit(3);

    return userQuestions;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserAnswers(params: any) {
  try {
    const { userId, page = 1, pageSize = 10 } = params;
    const userAnswers = await Answer.find({ author: userId })
      .sort({
        createdAt: -1,
        upvotes: -1,
      })
      .populate("author", " _id clerkId name picture")
      .populate("question", "title")
      .limit(3);

    return userAnswers;
  } catch (error) {
    console.log(error);
  }
}
