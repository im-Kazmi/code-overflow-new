import { Document, Schema, model, models } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdAt: Date;
}

const tagSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    questions: { type: Schema.Types.ObjectId, ref: "Question" },
    followers: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Tag = models.Tag || model("Tag", tagSchema);

export default Tag;
