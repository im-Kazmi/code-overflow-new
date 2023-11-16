import { tag } from "@/lib/actions/tag.actions";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const Page = async ({ params }: { params: Params }) => {
  const { id } = params;

  const result = await tag({ tagId: id });

  console.log(result);
  return (
    <div className="flex flex-col w-full mt-5">
      <div>{id}</div>
    </div>
  );
};

export default Page;
