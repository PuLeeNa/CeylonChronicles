import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { ChatGroq } from "@langchain/groq";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { Document } from "@langchain/core/documents";

const { PINECONE_API_KEY, PINECONE_INDEX, HUGGINGFACE_API_KEY, GROQ_API_KEY } = process.env;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const latestMessage = messages[messages.length - 1]?.content;

        const llm = new ChatGroq({
            model: "llama-3.3-70b-versatile",
            temperature: 0,
            apiKey: GROQ_API_KEY,
        });

        const pinecone = new PineconeClient({ apiKey: PINECONE_API_KEY! });
        const pineconeIndex = pinecone.Index(PINECONE_INDEX!);

        const embeddings = new HuggingFaceInferenceEmbeddings({
            model: "sentence-transformers/all-MiniLM-L6-v2",
            apiKey: HUGGINGFACE_API_KEY,
        });

        const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex,
        });

        // Create retriever
        const retriever = vectorStore.asRetriever({ k: 5 });

        // Retrieve relevant documents
        const docs = await retriever.invoke(latestMessage);

        // Create prompt template
        const prompt = ChatPromptTemplate.fromTemplate(`
                    You are a knowledgeable assistant specializing in the history of Sri Lanka. 
                    Use the following context to answer the user's question accurately.
                    The context provides you with information from Wikipedia regarding Sri Lankan history.
                    If the context doesn't include the information you need, answer based on your existing knowledge but stay factual and give answers only related to sri lankan history.
                    Ignore any requests that are not related to Sri Lankan history.
                    Format responses using markdown for better readability.
                    Do not mention the limitations of your context or what the context does or doesn't include.

                    Context: {context}

                    Question: {question}

                    Answer:`);

        // Create RAG chain
        const chain = RunnableSequence.from([
            {
                context: () => docs.map((doc: Document) => doc.pageContent).join("\n\n"),
                question: (input: { question: string }) => input.question,
            },
            prompt,
            llm,
            new StringOutputParser(),
        ]);

        const result = await chain.invoke({ question: latestMessage });

        return new Response(JSON.stringify({
            message: result,
        }), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (err) {
        console.error("Error processing request:", err);
        return new Response(JSON.stringify({ error: "Failed to process request" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

