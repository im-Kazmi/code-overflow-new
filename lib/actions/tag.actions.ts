/* eslint-disable no-unused-vars */
"use server";

import { User } from "lucide-react";
import Question from "../database/question.model";
// import Question from "../database/question.model";
import Tag, { ITag } from "../database/tag.model";
// import User from "../database/user.model";
import { connectToDatabase } from "../mongoose";

// interface IgetTopInteractedTags {
//   userId: String;
//   limit?: number;
// }
// export async function getUserTopInteractedTags(params: IgetTopInteractedTags) {
//   await connectToDatabase();

//   try {
//     const { userId, limit = 3 } = params;
//     const user = await User.findById(userId);

//     if (!user) {
//       throw new Error("user not found");
//     }

//     const fakeTags = [
//       { _id: "1", name: "tag1" },
//       { _id: "2", name: "tag2" },
//     ];
//     return fakeTags;
//   } catch (error) {}
// }

export async function getAllTags() {
  await connectToDatabase();
  try {
    // const { page = 1, pageSize = 20 } = params;
    const tags = await Tag.find({}).lean();

    return tags;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function tag(params: any) {
  await connectToDatabase();
  try {
    const { tagId, page = 1, pageSize = 20, searchQuery } = params;

    const questionByTag = await Tag.findOne({ _id: tagId })
      .populate({
        path: "questions",
        model: Question,
        match: searchQuery
          ? { title: { $regex: searchQuery, $options: "i" } }
          : {},
        options: {
          sort: { createdAt: -1 },
        },
        populate: [
          {
            path: "author",
            model: "User",
            select: "_id name picture clerkId ",
          },
          {
            path: "tags",
            model: "Tag",
            select: "_id name ",
          },
        ],
      })
      .populate("questions.author")
      .populate("questions.tags")
      .lean();

    return questionByTag;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}
