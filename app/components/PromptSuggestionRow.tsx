import React from "react";
import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionRow = ({ onPromptClick }: any) => {
  const prompts = [
    "Tell me about Sri Lanka’s ancient kingdoms?",
    "Who were the most influential kings in the Anuradhapura period?",
    "Explain a major event that changed Sri Lankan history.",
    "What was life like during the colonial period in Sri Lanka?",
  ];

  return (
    <div className="prompt-suggestion-row">
      {prompts.map((prompt, index) => (
        <PromptSuggestionButton key={`suggestion-${index}`} text={prompt} onClick={onPromptClick}/>
      ))}
    </div>
  );
};

export default PromptSuggestionRow;
