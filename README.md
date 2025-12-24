# 🏛️ Ceylon Chronicles

## 🌐 Live Demo

**Try it now:** [https://ceylon-chronicles.netlify.app](https://ceylon-chronicles.netlify.app)

An AI-powered conversational assistant that provides intelligent insights about Sri Lankan history through Retrieval-Augmented Generation (RAG). Ask questions about prehistoric times, ancient kingdoms, colonial periods, and modern Sri Lankan history.

![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-19.2-blue)
![LangChain](https://img.shields.io/badge/LangChain-0.3.13-green)
![Node.js](https://img.shields.io/badge/Node.js-18--22-green)

## ✨ Features

- 🤖 **AI-Powered Chat**: Intelligent conversational interface powered by Groq's Llama 3.3 70B model
- 🔍 **RAG Architecture**: Retrieval-Augmented Generation with Pinecone vector database for accurate context-aware responses
- 📚 **Comprehensive Knowledge Base**: 16 curated Wikipedia articles covering Sri Lankan history from prehistoric to modern times
- 💬 **Interactive UI**: Clean, responsive chat interface with message bubbles and loading indicators
- 📝 **Markdown Support**: Rich text formatting in responses for better readability
- 🎯 **Smart Prompts**: Pre-built prompt suggestions to help users get started
- 🚀 **Production Ready**: Deployable to Netlify with Docker support

## 🛠️ Tech Stack

**Frontend:**

- Next.js 16.0.10 (App Router)
- TypeScript 5
- React 19.2
- React Markdown (for rendering formatted responses)

**Backend & AI:**

- LangChain 0.3 (Document Processing, RAG Pipeline)
- Groq AI (Llama 3.3 70B Versatile)
- Pinecone 5.1 (Vector Database)
- HuggingFace Embeddings (sentence-transformers/all-MiniLM-L6-v2)
- Vercel AI SDK (UI State Management)

**Data Pipeline:**

- Puppeteer (Web Scraping)
- LangChain Document Loaders
- Recursive Character Text Splitter

**DevOps:**

- Github Actions
- Docker (Containerization)
- Netlify (Deployment Platform)

## 📋 Prerequisites

- Node.js 18.x to 22.x (Node 22 recommended)
- npm (comes with Node.js)
- Pinecone account ([Get Free API Key](https://app.pinecone.io/))
- HuggingFace account ([Get Free API Key](https://huggingface.co/settings/tokens))
- Groq account ([Get Free API Key](https://console.groq.com/))

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PuLeeNa/CeylonChronicles.git
cd CeylonChronicles/ceylonchronicles
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=ceylonchronicles
HUGGINGFACE_API_KEY=your_huggingface_token
GROQ_API_KEY=your_groq_api_key
```

### 4. Create Pinecone Index

1. Go to [Pinecone Console](https://app.pinecone.io/)
2. Create a new index with:
   - **Name**: `ceylonchronicles`
   - **Dimension**: `384`
   - **Metric**: `cosine`

### 5. Load historical data into vector database

```bash
npm run seed
```

This will:

- Scrape 16 Wikipedia articles about Sri Lankan history (from Prehistory to Modern Sri Lanka)
- Split content into chunks using RecursiveCharacterTextSplitter (512 characters with 100 character overlap)
- Generate 384-dimensional embeddings using HuggingFace's all-MiniLM-L6-v2 model
- Store vectors in Pinecone with metadata for retrieval

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
ceylonchronicles/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Chat API endpoint
│   ├── components/
│   │   ├── Bubble.tsx            # Chat message bubble
│   │   ├── LoadingBubble.tsx     # Loading indicator
│   │   └── PromptSuggestionRow.tsx
│   ├── assets/                   # Images and static files
│   ├── global.css                # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main chat interface
├── scripts/
│   └── loadDb.ts                 # Data loading script
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD pipeline
├── Dockerfile                    # Docker configuration
├── render.yaml                   # Render deployment config
├── netlify.toml                  # Netlify deployment config
└── next.config.ts                # Next.js configuration
```

## 🐳 Docker Deployment

Build and run with Docker:

```bash
docker build -t ceylon-chronicles .
docker run -p 3000:3000 --env-file .env ceylon-chronicles
```

## 🚀 Deployment

### Deploy to Netlify

The project is configured for deployment to Netlify with the Next.js plugin:

1. Connect your GitHub repository to Netlify
2. Configure environment variables in Netlify dashboard:
   - `PINECONE_API_KEY`
   - `PINECONE_INDEX`
   - `HUGGINGFACE_API_KEY`
   - `GROQ_API_KEY`
3. Deploy automatically on push to main branch

The `netlify.toml` file is pre-configured with Node.js 22 and the Next.js plugin.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Load historical data into vector database
- `npm run lint` - Run ESLint

## 🔧 How It Works

1. **User Input**: User asks a question about Sri Lankan history
2. **Vector Search**: Question is embedded and searched against Pinecone vector database
3. **Context Retrieval**: Top 5 most relevant document chunks are retrieved
4. **RAG Chain**: LangChain combines retrieved context with user question
5. **LLM Generation**: Groq's Llama 3.3 70B generates a contextualized response
6. **Response Display**: Answer is rendered with markdown formatting

## 🎯 Usage Example

Ask questions like:

- "Tell me about the Anuradhapura Kingdom"
- "What happened during the British Ceylon period?"
- "Who were the ancient kings of Sri Lanka?"
- "Explain the Polonnaruwa period"
- "What is the history of the Kandyan Kingdom?"

## 👨‍💻 Author

**PuLeeNa**

- GitHub: [@PuLeeNa](https://github.com/PuLeeNa)
- Repository: [CeylonChronicles](https://github.com/PuLeeNa/CeylonChronicles)


## 🙏 Acknowledgments

- Historical data sourced from Wikipedia
- Built with [Next.js](https://nextjs.org/)
- AI powered by [Groq](https://groq.com/) (Llama 3.3 70B)
- Vector database by [Pinecone](https://www.pinecone.io/)
- Embeddings by [HuggingFace](https://huggingface.co/)

---

⭐ Star this repository if you find it helpful!
