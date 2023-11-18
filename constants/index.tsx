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

export const filters = [
  { id: "1", name: "Newest", value: "newest" },
  { id: "5", name: "Oldest", value: "oldest" },
  { id: "2", name: "Recommended", value: "recommended" },
  { id: "3", name: "Frequent", value: "frequent" },
  { id: "4", name: "UnAnswered", value: "unanswered" },
];

export const tagFilters = [
  { id: "1", name: "Popular", value: "popular" },
  { id: "2", name: "Recent", value: "Recent" },
  { id: "3", name: "Name", value: "name" },
  { id: "4", name: "Oldest", value: "old" },
];

export const answerFilters = [
  { id: "1", name: "Highest Upvotes", value: "highest_upvotes" },
  { id: "2", name: "Lowest Upvotes", value: "lowest_upvotes" },
  { id: "3", name: "Most Recent", value: "most_recent" },
  { id: "4", name: "Oldest", value: "Oldest" },
];
export const collectionFilters = [
  { id: "1", name: "Most Recent", value: "most_recent" },
  { id: "5", name: "Oldest", value: "oldest" },
  { id: "2", name: "Most Voted", value: "most_voted" },
  { id: "3", name: "Most Viewed", value: "most_viewed" },
  { id: "4", name: "Most Answered", value: "most_answered" },
];

export const userFilters = [
  { id: "1", name: "New Users", value: "new_users" },
  { id: "2", name: "Old Users", value: "old_users" },
  { id: "3", name: "Top contributors", value: "top_contributors" },
];
