/* eslint-disable no-unused-vars */
"use server";

import Question, { IQuestion } from "../database/question.model";
import Tags from "../database/tag.model";

import { connectToDatabase } from "../mongoose";

export async function createQuestion(params: any) {
  try {
    await connectToDatabase();
    const { title, content, tags, author, path } = params;

    const tagDocuments = [];

    const question = await Question.create({
      title,
      content,
      author,
    });

    for (const tag of tags) {
      const existingTag = await Tags.findOneAndUpdate(
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
    console.log("question created succesfully");
  } catch (error: any) {
    console.log(error.message);
  }
}
