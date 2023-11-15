"use client";
import React, { useEffect } from "react";
import Prism from "prismjs";
import parse from "html-react-parser";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-mongodb";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-go";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-r";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-tsx";
// import "prismjs/plugins/line-numbers/prism-line-numbers.js";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";

interface Props {
  data: string;
}
const ParseHTML = ({ data }: Props) => {
  useEffect(() => Prism.highlightAll(), []);
  return <div className=" text-white">{parse(data)}</div>;
};

export default ParseHTML;
