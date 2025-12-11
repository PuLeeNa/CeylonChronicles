# 🏛️ Ceylon Chronicles

## 🌐 Live Demo

**Try it now:** [https://ceylon-chronicles.netlify.app](https://ceylon-chronicles.netlify.app)

An AI-powered conversational assistant that provides intelligent insights about Sri Lankan history through Retrieval-Augmented Generation (RAG). Ask questions about prehistoric times, ancient kingdoms, colonial periods, and modern Sri Lankan history.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![LangChain](https://img.shields.io/badge/LangChain-Latest-green)

## ✨ Features

- 🤖 **AI-Powered Chat**: Real-time conversational interface using Groq LLM
- 🔍 **Semantic Search**: Vector-based search with Pinecone for accurate historical information
- 📚 **Comprehensive Knowledge Base**: 16+ Wikipedia articles on Sri Lankan history
- ⚡ **Streaming Responses**: Fast, streaming AI responses for better UX
- 🎨 **Beautiful UI**: Custom-designed interface with historical Sri Lankan themes
- 🚀 **Auto-Deploy**: CI/CD pipeline with GitHub Actions to Netlify and Render

## 🛠️ Tech Stack

**Frontend:**

- Next.js 16 (App Router)
- TypeScript
- React 19

**Backend & AI:**

- LangChain
- Groq AI (LLM)
- Pinecone (Vector Database)
- HuggingFace Embeddings (all-MiniLM-L6-v2)

**Data Pipeline:**

- Puppeteer (Web Scraping)
- LangChain Document Loaders
- Recursive Character Text Splitter

**DevOps:**

- Docker
- GitHub Actions
- Netlify (Staging)
- Render (Production)

## 📋 Prerequisites

- Node.js 22.x or higher
- npm or yarn
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

- Scrape 16 Wikipedia articles about Sri Lankan history
- Split content into chunks (512 characters with 100 overlap)
- Generate embeddings using HuggingFace
- Store vectors in Pinecone

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

## 🚀 CI/CD Deployment

The project includes automated deployment to both Netlify and Render. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

### Quick Deploy Steps:

1. Add GitHub secrets (see [DEPLOYMENT.md](./DEPLOYMENT.md))
2. Push to main branch:

```bash
git add .
git commit -m "Deploy application"
git push origin main
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Load historical data into vector database
- `npm run lint` - Run ESLint

## 🎯 Usage Example

Ask questions like:

- "Tell me about the Anuradhapura Kingdom"
- "What happened during the British Ceylon period?"
- "Who were the ancient kings of Sri Lanka?"
- "Explain the Polonnaruwa period"

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**PuLeeNa**

- GitHub: [@PuLeeNa](https://github.com/PuLeeNa)
- Repository: [CeylonChronicles](https://github.com/PuLeeNa/CeylonChronicles)

## 🙏 Acknowledgments

- Historical data sourced from Wikipedia
- Built with [Next.js](https://nextjs.org/)
- AI powered by [Groq](https://groq.com/)
- Vector database by [Pinecone](https://www.pinecone.io/)
- Embeddings by [HuggingFace](https://huggingface.co/)

---

⭐ Star this repository if you find it helpful!
