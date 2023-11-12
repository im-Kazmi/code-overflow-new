import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { FiStar } from "react-icons/fi";
import { MdWifiFind } from "react-icons/md";
import { IoMdPricetags } from "react-icons/io";
import { SiAskubuntu } from "react-icons/si";

export const links = [
  { name: "Home", label: "Home", route: "/", Icon: <AiFillHome /> },
  {
    name: "Collections",
    label: "Collections",
    route: "/collections",
    Icon: <RxAvatar />,
  },
  {
    name: "Community",
    label: "Community",
    route: "/community",
    Icon: <FiStar />,
  },
  {
    name: "Find Jobs",
    label: "Find Jobs",
    route: "/find-jobs",
    Icon: <MdWifiFind />,
  },
  {
    name: "Tags",
    label: "Tags",
    route: "/tags",
    Icon: <IoMdPricetags />,
  },
  {
    name: "Profile",
    label: "Profile",
    route: "/profile",
    Icon: <RxAvatar />,
  },
  {
    name: "Ask a Question",
    label: "Ask a Question",
    route: "/ask-question",
    Icon: <SiAskubuntu />,
  },
];

export const hotQuestions = [
  {
    id: 1,
    title: "How to implement server side rendering in Next.js?",
  },
  {
    id: 2,
    title: "How is Next.js different from React?",
  },
  {
    id: 3,
    title: "Why use Tailwind instead of bootstrap?",
  },
  {
    id: 4,
    title: "Why Redux toolkit is harder than redux for you?",
  },
  {
    id: 5,
    title: "document.getElementById is not working in mongodb?",
  },
];

export const popularTags = [
  {
    _id: 1,
    name: "Next",
    totalQuestions: 15,
    textColor: "text-cyan-300",
  },
  {
    _id: 2,
    totalQuestions: 12,
    name: "Node",
    textColor: "text-orange-300",
  },
  {
    _id: 3,
    totalQuestions: 10,
    name: "React",
    textColor: "text-green-300",
  },
  {
    _id: 4,
    name: "Javascript",
    totalQuestions: 8,
    textColor: "text-rose-300",
  },
  {
    _id: 5,
    name: "Redux",
    totalQuestions: 1,
    textColor: "text-pink-300",
  },
];

export const filters = [
  { id: 1, name: "Newest", value: "newest" },
  { id: 2, name: "Recommended", value: "recommended" },
  { id: 3, name: "Frequent", value: "frequent" },
  { id: 4, name: "UnAnswered", value: "unanswered" },
];
