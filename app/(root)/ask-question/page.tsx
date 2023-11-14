import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId } = auth();
  console.log("userId", userId);
  if (!userId) {
    return redirect("/login");
  }

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <div>
        <h1 className=" text-xl font-bold text-white">Ask a Question</h1>
      </div>
      <Question mongoUserId={JSON.stringify(mongoUser._id)} />
    </div>
  );
};

export default Page;
