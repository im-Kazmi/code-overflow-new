import { Schema } from "mongoose";
import { IUser } from "../database/user.model";

export interface getQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface createQuestionParams {
  title?: string;
  content?: string;
  tags?: string[];
  author?: Schema.Types.ObjectId | IUser;
  path?: string;
}

export interface getAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}
