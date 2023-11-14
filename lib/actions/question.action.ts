"use server";

import { connectToDatabase } from "../mongoose";

export async function createQuestion(params) {
  const { title, content, tags, author, path } = params;
  try {
    await connectToDatabase();
  } catch (error) {}
}
