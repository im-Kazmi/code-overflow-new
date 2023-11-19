/* eslint-disable no-unused-vars */
"use server";
import { FilterQuery } from "mongoose";
import Answer from "../database/answer.model";
import Question from "../database/question.model";
import Tag from "../database/tag.model";
import User from "../database/user.model";
import { connectToDatabase } from "../mongoose";
import { any } from "zod";

interface IglobalSearchParams {
  query: string;
  type: string;
}
export async function globalSearch(params: IglobalSearchParams) {
  try {
    await connectToDatabase();
    const { query, type } = params;

    const regexQuery = new RegExp(query, "i");

    let results: any[] = [];

    const modelAndTypes = [
      { id: 1, model: User, searchField: "name", type: "user" },
      { id: 2, model: Question, searchField: "title", type: "questions" },
      { id: 3, model: Tag, searchField: "name", type: "tag" },
      { id: 4, model: Answer, searchField: "content", type: "answer" },
    ];

    const searchableTypes = ["questions", "user", "answer", "tag"];
    const typeLower = typeof type === "string" && type.toLowerCase();

    if (!type || !typeLower || !searchableTypes.includes(typeLower)) {
      // Search acroose everything
      for (const { model, searchField, type } of modelAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(8);

        results.push(
          ...queryResults.map((item) => ({
            title:
              type === "answer"
                ? `Answers Containing ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                ? item.question
                : item._id,
          }))
        );
      }
    } else {
      // search in the specified model type
      const modelInfo = modelAndTypes.find((item) => item.type === type);
      if (!modelInfo) {
        throw new Error("invalid search type");
      }

      const queryResults = await modelInfo.model
        .find({
          [modelInfo?.searchField]: regexQuery,
        })
        .limit(8);

      results = queryResults.map((item) => ({
        title:
          type === "answer"
            ? `Answers Containing ${query}`
            : item[modelInfo.searchField],
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
            ? item.question
            : item._id,
      }));
    }

    console.log("backend results = ", results);
    return JSON.stringify(results);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
