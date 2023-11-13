"use server";

import { connectToDatabase } from "../mongoose";

export async function createQuestion(params) {
  // eslint-disable-next-line no-empty
  try {
    await connectToDatabase();
  } catch (error) {}
}
