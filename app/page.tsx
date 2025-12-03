"use client";
import Image from "next/image";
import logoo from "./assets/logoo.png";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";

export default function Home() {
    const { input, handleInputChange, handleSubmit, append, isLoading, messages } = useChat()

    const onMessage = false
  return (
    <main>
      <Image src={logoo} alt="Logo" width={275} height={50} />
      <section>
        {onMessage ? (
            <>
            <p className="starter-text">
                Welcome to Ceylon Chronicles! Ask me anything about the rich history of Sri Lanka. You can explore historical insights from the prehistoric era to modern times 
            </p>
            <br/>
            {/* <PromptSuggestionRow/> */}
            </>
        ) : (
            <>
            {/* <LoadingBubbles/> */}
            </>
        )}
        <form onSubmit={handleSubmit}>
            <input className="question-box" onChange={handleInputChange} value={input} type="text" placeholder="Ask me some insights..." />
            <input type="submit" />
        </form>
      </section>
    </main>
  );
}
