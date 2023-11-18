"use client";
import { FaTrash } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { deleteQuestion } from "@/lib/actions/question.action";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
interface Props {
  type: string;
  itemId: string;
}
const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();

  const handleDelete = async () => {
    if (type === "Question") {
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      });

      toast.success("Question Deleted!");
    } else if (type === "Answer") {
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });
      toast.success("Answer Deleted!");
    }
  };

  //   const handleUpdate = () => {
  //     if (type === "Question") {
  //     } else if (type === "Answer") {
  //     }
  //   };

  return (
    <div className="  flex gap-5">
      <Toaster />
      <span className=" text-red-500" onClick={handleDelete}>
        <FaTrash />
      </span>
      <span className=" text-cyan-400">
        <BiSolidEdit />
      </span>
    </div>
  );
};

export default EditDeleteAction;
