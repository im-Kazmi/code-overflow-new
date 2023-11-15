"use client";
import React, { useRef } from "react";
import { BsStars } from "react-icons/bs";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { answerSchema } from "@/lib/validations";
import { createAnswer } from "@/lib/actions/answer.action";
import { Button } from "../ui/button";
interface Props {
  answersCount: number;
  questionId: string;
  userId: string;
}
const AnswerForm = ({ answersCount, questionId, userId }: Props) => {
  const editorRef = useRef(null);

  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof answerSchema>) {
    try {
      await createAnswer({
        author: userId,
        content: values.answer,
        question: questionId,
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className=" w-full flex flex-col">
      <div className=" flex justify-between mt-5 ">
        <span className=" text-orange-400 my-auto font-bold">
          Write your Answer
        </span>
        <button className=" w-fit text-sm text-white flex gap-2 px-3 py-2 bg-black/40 rounded-md ">
          <span className=" text-orange-400">
            <BsStars />
          </span>
          Generate AI Answer
        </button>
      </div>

      <div className=" mt-5 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full  gap-10"
          >
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-white">
                    Answer <span className=" text-orange-400">*</span>
                  </FormLabel>
                  <FormControl>
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                      onInit={(evt, editor) => {
                        // @ts-ignore
                        editorRef.current = editor;
                      }}
                      onBlur={field.onBlur}
                      onEditorChange={(answer) => field.onChange(answer)}
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "print",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "codesample",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "paste",
                          "code",
                          "help",
                          "wordcount",
                          "preview",
                        ],
                        toolbar:
                          "undo redo | formatselect | " +
                          "codesample bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help preview ",
                        content_style:
                          "body { font-family:Inter,sans-serif; font-size:16px}",
                        skin: "oxide-dark",
                        content_css: "dark",
                      }}
                    />
                  </FormControl>
                  <FormDescription>Write a Clear Answer</FormDescription>
                  <FormMessage className=" text-red-600" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className=" bg-gradient-to-r from-orange-500 to-orange-200"
            >
              {isSubmitting ? "Submitting..." : "Submit Answer"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AnswerForm;
