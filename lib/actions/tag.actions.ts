/* eslint-disable no-unused-vars */
"use server";

import Question from "../database/question.model";
import Tag from "../database/tag.model";
import User from "../database/user.model";
import { connectToDatabase } from "../mongoose";

interface IgetTopInteractedTags {
  userId: String;
  limit?: number;
}
export async function getUserTopInteractedTags(params: IgetTopInteractedTags) {
  await connectToDatabase();

  try {
    const { userId, limit = 3 } = params;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("user not found");
    }

    const fakeTags = [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
    ];
    return fakeTags;
  } catch (error) {}
}

export async function getAllTags() {
  await connectToDatabase();
  try {
    // const { page = 1, pageSize = 20 } = params;
    const tags = await Tag.find({}).lean();
    console.log(tags);

    return tags;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}
