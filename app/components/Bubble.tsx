import React from "react";
import ReactMarkdown from "react-markdown";

const Bubble = ({ message }: any) => {
  const { content, role } = message;
  return (
    <div className={`${role} bubble`}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Bubble;
