/* eslint-disable no-unused-vars */
"use client";
import React, { useRef } from "react";
import { BsStars } from "react-icons/bs";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf, z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { answerSchema, profileSchema } from "@/lib/validations";
import { createAnswer } from "@/lib/actions/answer.action";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { getUserById, updateUser } from "@/lib/actions/user.action";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";

interface User {
  name: string;
  bio: string;
  location: string;
  portfolioWebsite: string;
}
const EditProfile = ({ user, clerkId }: { user: User; clerkId: any }) => {
  const pathname = usePathname();
  const router = useRouter();
  const userData = JSON.parse(user);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData?.name || "",
      bio: userData?.bio || "",
      location: userData?.location || "",
      portfolioWebsite: userData?.portfolioWebsite || "",
    },
  });

  const { isSubmitting, isSubmitted } = form.formState;
  const onsubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          bio: values.bio,
          location: values.location,
          portfolioWebsite: values.portfolioWebsite,
        },
        path: pathname,
      });
      if (isSubmitted) {
        toast.success("profile updated");
        router.push(`/profile/${clerkId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className=" flex flex-col gap-6"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-white">
                  Username <span className=" text-orange-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    className=" bg-black/40 text-white border-none outline-none focus:ring-0 ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" text-red-600" />
              </FormItem>
            )}
          ></FormField>
          <FormField
            name="location"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-white">
                  Location <span className=" text-orange-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Location"
                    className=" bg-black/40 text-white border-none outline-none focus:ring-0 ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" text-red-600" />
              </FormItem>
            )}
          ></FormField>
          <FormField
            name="bio"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-white">
                  Bio <span className=" text-orange-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Bio"
                    className=" bg-black/40 text-white border-none outline-none focus:ring-0 ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" text-red-600" />
              </FormItem>
            )}
          ></FormField>
          <FormField
            name="portfolioWebsite"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-white">
                  PortFolio Website <span className=" text-orange-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="PortFolio Website"
                    className=" bg-black/40 text-white border-none outline-none focus:ring-0 ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" text-red-600" />
              </FormItem>
            )}
          ></FormField>

          <button
            type="submit"
            className=" w-full py-2 rounded-md mt-5 bg-gradient-to-r from-orange-500 to-orange-200"
          >
            {isSubmitting ? "Submitting.." : "Submit"}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;
