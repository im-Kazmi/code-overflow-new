import * as z from "zod";

export const questionSchema = z.object({
  title: z.string().min(5).max(150),
  explanation: z.string().min(50),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const answerSchema = z.object({
  answer: z.string().min(50),
});

export const profileSchema = z.object({
  name: z.string().min(5).max(50),
  bio: z.string().min(10),
  location: z.string().min(10),
  portfolioWebsite: z.string(),
});
