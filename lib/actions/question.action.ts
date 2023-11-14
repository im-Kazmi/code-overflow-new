/* eslint-disable no-unused-vars */
"use server";

import { revalidatePath } from "next/cache";
import Question, { IQuestion } from "../database/question.model";
import Tag from "../database/tag.model";
import User from "../database/user.model";

import { connectToDatabase } from "../mongoose";
import { createQuestionParams, getQuestionsParams } from "./shared.types";

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
      console.log(`Tag: ${tag}, Existing Tag:`, existingTag);
      // await Promise.all(tagDocuments);
      tagDocuments.push(existingTag._id);
    }

    console.log(tagDocuments);
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath("/");
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function getQuestions(params: createQuestionParams) {
  await connectToDatabase();
  try {
    const questions = await Question.find()
      .populate({ path: "author", model: User })
      .populate({ path: "tags", model: Tag });
    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
