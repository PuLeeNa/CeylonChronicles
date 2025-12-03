"use client";
import Image from "next/image";
import logoo from "./assets/logoo.png";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import Bubble from "./components/Bubble";
import LoadingBubble from "./components/LoadingBubble";
import PromptSuggestionRow from "./components/PromptSuggestionRow";

export default function Home() {
    const { input, handleInputChange, handleSubmit, append, isLoading, messages } = useChat()

    const handlePrompt = ( promptText : string ) => {
        const msg: UIMessage = {
            id: crypto.randomUUID(),
            content: promptText,
            role: "user"
        }
        append(msg)
    }

    const noMessage = !messages || messages.length === 0;

  return (
    <main>
      <Image src={logoo} alt="Logo" width={300} height={50} />
      <section className={noMessage ? "" : "populated"}>
        {noMessage ? (
            <>
            <p className="starter-text">
                Welcome to Ceylon Chronicles! Ask me anything about the rich history of Sri Lanka. You can explore historical insights from the prehistoric era to modern times 
            </p>
            <br/>
            <PromptSuggestionRow onPromptClick={handlePrompt}/>
            </>
        ) : (
            <>
            {messages.map((message: UIMessage, index: number) => <Bubble key={`message-${index}`} message={message} />)}
            {isLoading && <LoadingBubble/>}
            </>
        )}
      </section>
      <form onSubmit={handleSubmit}>
            <input className="question-box" onChange={handleInputChange} value={input} type="text" placeholder="Ask me some insights..." />
            <input type="submit" />
        </form>
    </main>
  );
}
