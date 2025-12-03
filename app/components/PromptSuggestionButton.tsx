import React from 'react'

const PromptSuggestionButton = ({ text, onClick}: any) => {
  return (
    <button className="prompt-suggestion-button"
    onClick={onClick}>
        {text}
    </button>
  )
}

export default PromptSuggestionButton
