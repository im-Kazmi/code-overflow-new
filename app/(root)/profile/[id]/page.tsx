import AnswersTab from "@/components/shared/AnswersTab";
import QuestionsTab from "@/components/shared/QuestionsTab";
import Stats from "@/components/shared/Stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import moment from "moment";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";

const Page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: any;
}) => {
  const { id } = params;
  const userInfo = await getUserInfo({ userId: id });
  const { user }: any = userInfo;
  const { userId } = auth();
  return (
    <div className=" w-full flex flex-col bg-black/30 items-center py-5 rounded-md">
      <div className=" flex  flex-col w-fit gap-3 justify-center  mt-5">
        <Image
          src={user.picture}
          width={180}
          height={180}
          alt={user.name}
          className="rounded-full ring-8 ring-black/40 shadow-xl"
        />
        <div className="flex flex-col m-auto gap-1 w-fit  ">
          <h1 className=" text-xl m-auto  font-bold text-white">{user.name}</h1>
          <span className="text-xs m-auto  text-white">@{user.username}</span>
          {id === userId && (
            <button className=" px-3 py-2 rounded-md bg-black/40 text-orange-500">
              Edit Profile
            </button>
          )}
          <div className=" flex gap-2 text-xs text-white mt-2">
            <span>Joined</span>
            <span className=" text-green-400 bg-black/80 px-2 rounded-lg    ">
              {moment(user.joinedAt).fromNow()}
            </span>
          </div>
        </div>
      </div>

      <Stats
        totalQuestions={userInfo?.totalQuestions as number}
        totalAnswers={userInfo?.totalAnswers as number}
      />

      <div className="flex flex-col m-auto w-fit mt-10">
        <Tabs defaultValue="top-posts " className=" text-white">
          <TabsList className=" flex gap-2 bg-transparent">
            <TabsTrigger value="top-posts">TopPosts</TabsTrigger>
            <TabsTrigger value="answers">Answers</TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionsTab
              searchParams={searchParams}
              clerkId={userId}
              userId={user._id}
            />
          </TabsContent>
          <TabsContent value="answers">
            <AnswersTab userId={user._id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
