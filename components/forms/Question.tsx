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

const Question = () => {
  const editorRef = useRef(null);

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  function onSubmit(values: z.infer<typeof questionSchema>) {}
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
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
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
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Add upto 3 tags and describe what your questions is about. press
                Enter to add a Tag.
              </FormDescription>
              <FormMessage className=" text-red-600" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className=" bg-gradient-to-r from-orange-500 to-orange-200"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default Question;
