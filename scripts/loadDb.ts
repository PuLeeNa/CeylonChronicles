import { PineconeStore } from "@langchain/pinecone"
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone"
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer"
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { Document } from "@langchain/core/documents"

import "dotenv/config"

const { PINECONE_API_KEY, PINECONE_INDEX, HUGGINGFACE_API_KEY } = process.env

const urls = [
    "https://en.wikipedia.org/wiki/Prehistory_of_Sri_Lanka",
    "https://en.wikipedia.org/wiki/Pre_Anuradhapura_period",
    "https://en.wikipedia.org/wiki/Anuradhapura_period",
    "https://en.wikipedia.org/wiki/Polonnaruwa_period",
    "https://en.wikipedia.org/wiki/Chola_conquest_of_Anuradhapura",
    "https://en.wikipedia.org/wiki/Transitional_period_of_Sri_Lanka",
    "https://en.wikipedia.org/wiki/Kandyan_period",
    "https://en.wikipedia.org/wiki/British_Ceylon_period",
    "https://en.wikipedia.org/wiki/History_of_Sri_Lanka_(1948%E2%80%93present)",
    "https://en.wikipedia.org/wiki/List_of_Sri_Lankan_monarchs",
    "https://en.wikipedia.org/wiki/Kingdom_of_Tambapanni",
    "https://en.wikipedia.org/wiki/Anuradhapura_Kingdom",
    "https://en.wikipedia.org/wiki/Kingdom_of_Polonnaruwa",
    "https://en.wikipedia.org/wiki/Kingdom_of_Dambadeniya",
    "https://en.wikipedia.org/wiki/Kingdom_of_Gampola",
    "https://en.wikipedia.org/wiki/Kingdom_of_Kotte"
]

// Initialize Pinecone client
const pinecone = new PineconeClient({
    apiKey: PINECONE_API_KEY!
});

// Initialize embeddings model
const embeddings = new HuggingFaceInferenceEmbeddings({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    apiKey: HUGGINGFACE_API_KEY,
});

// Initialize text splitter
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 100
})

// Scraping a single webpage
const scrapePage = async (url: string): Promise<Document[]> => {
    console.log(`Scraping: ${url}`)

    const loader = new PuppeteerWebBaseLoader(url, {
        launchOptions: {
            headless: true
        },
        gotoOptions: {
            waitUntil: "domcontentloaded"
        },
        evaluate: async (page, browser) => {
            const result = await page.evaluate(() => document.body.innerText)
            await browser.close()
            return result
        }
    })

    const docs = await loader.load()
    console.log(`Loaded ${docs.length} document(s) from ${url}`)
    return docs
}

// Loading data into Pinecone
const loadData = async () => {
    try {
        const pineconeIndex = pinecone.Index(PINECONE_INDEX!)
        const allDocs: Document[] = []

        for (const url of urls) {
            try {
                const docs = await scrapePage(url)
                allDocs.push(...docs)
            } catch (error) {
                console.error(`Error scraping ${url}:`, error)
            }
        }

        // Split documents into chunks
        const splitDocs = await textSplitter.splitDocuments(allDocs)

        // Creating embeddings and store in Pinecone
        await PineconeStore.fromDocuments(
            splitDocs,
            embeddings,
            {
                pineconeIndex,
                maxConcurrency: 5,
            }
        )

    } catch (error) {
        console.error("Error loading data:", error)
        throw error
    }
}

loadData().then(() => {
    console.log("\n Data loading complete!")
    process.exit(0)
}).catch((error) => {
    console.error("\n Data loading failed:", error)
    process.exit(1)
})

