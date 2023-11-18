import { Document, Schema, model, models } from "mongoose";

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId;
  action: string;
  question: Schema.Types.ObjectId;
  answers: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  createdAt: Date;
}

const interactionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question" },
    answer: { type: Schema.Types.ObjectId, ref: "Answer" },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  },
  { timestamps: true }
);

const Interaction =
  models?.Interaction || model("Interaction", interactionSchema);

export default Interaction;
