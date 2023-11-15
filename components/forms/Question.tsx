/* eslint-disable no-unused-vars */
"use client";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema } from "@/lib/validations";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createQuestion } from "@/lib/actions/question.action";

import { usePathname, useRouter } from "next/navigation";
const Question = ({ mongoUserId }: { mongoUserId: string }) => {
  const editorRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  const { isSubmitting, isLoading, isDirty } = form.formState;

  async function onSubmit(values: z.infer<typeof questionSchema>) {
    try {
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        author: JSON.parse(mongoUserId),
        path: "/",
      });

      console.log(values.tags);
      router.push("/");
    } catch (error) {}
  }

  const handleTagDelete = (selectedTag: any) => {
    const tags = form.getValues("tags").filter((tag) => tag !== selectedTag);
    form.setValue("tags", tags);
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            message: "Tag must be less than 15 characters",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full  gap-10 mt-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">
                Qestion Title <span className=" text-orange-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Question Title"
                  className=" bg-black/40 text-white border-none outline-none focus:ring-0 ring-0"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Imagine you are asking a question to another person
              </FormDescription>
              <FormMessage className=" text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">
                Explanation <span className=" text-orange-400">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue=""
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
              <FormDescription>Explain your Question concisely</FormDescription>
              <FormMessage className=" text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">
                Tags <span className=" text-orange-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Add Tags"
                  className=" bg-black/40 text-white border-none outline-none focus:ring-0 ring-0"
                  onKeyDown={(e) => handleInputKeyDown(e, field)}
                />
                {/* {field.value.length > 0 && ( */}

                {/* )} */}
              </FormControl>
              <FormDescription></FormDescription>
              <div className=" flex w-full gap-3 mt-5">
                {field.value.map((tag) => (
                  <div
                    key={tag}
                    className=" w-fit px-3 cursor-pointer gap-5 py-1 rounded-lg bg-orange-100 text-white bg-opacity-20"
                  >
                    {tag}
                    <span
                      onClick={() => handleTagDelete(tag)}
                      className="ml-5 text-white"
                    >
                      x
                    </span>
                  </div>
                ))}
              </div>
              <FormMessage className=" text-red-600" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className=" bg-gradient-to-r from-orange-500 to-orange-200"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
