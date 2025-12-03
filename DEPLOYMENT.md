# Ceylon Chronicles - Deployment Setup

## 🚀 CI/CD Pipeline Configured!

This project is set up to automatically deploy to:

- **Netlify** (Staging/Preview)
- **Render** (Production)

## 📋 Setup Instructions

### 1. Install Netlify Plugin

```bash
npm install --save-dev @netlify/plugin-nextjs
```

### 2. Get Netlify Credentials

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site (in project root)
netlify init

# Get your Site ID
netlify sites:list
```

Go to https://app.netlify.com/user/applications#personal-access-tokens to create a Personal Access Token.

### 3. Get Render Deploy Hook

1. Go to https://dashboard.render.com/
2. Create a new Web Service (or select existing)
3. Connect your GitHub repository
4. Go to Settings → Deploy Hook
5. Create a new deploy hook and copy the URL

### 4. Add GitHub Secrets

Go to your GitHub repository:

- Settings → Secrets and variables → Actions → New repository secret

Add these secrets:

**Netlify Secrets:**

- `NETLIFY_AUTH_TOKEN` - Your Netlify personal access token
- `NETLIFY_SITE_ID` - Your Netlify site ID

**Render Secrets:**

- `RENDER_DEPLOY_HOOK_URL` - Your Render deploy webhook URL

**Application Secrets:**

- `PINECONE_API_KEY` - Your Pinecone API key
- `PINECONE_INDEX` - Your Pinecone index name
- `HUGGINGFACE_API_KEY` - Your HuggingFace API token
- `GROQ_API_KEY` - Your Groq API key

### 5. Setup Render Environment Variables

In Render Dashboard:

1. Select your service
2. Go to Environment tab
3. Add all environment variables:
   - `PINECONE_API_KEY`
   - `PINECONE_INDEX`
   - `HUGGINGFACE_API_KEY`
   - `GROQ_API_KEY`
   - `NODE_ENV=production`

### 6. Push to GitHub

```bash
git add .
git commit -m "Add CI/CD pipeline for Netlify and Render"
git push origin main
```

## 🎯 How It Works

- **On Push to `main`**:

  - Builds and deploys to Netlify (staging)
  - Triggers deployment to Render (production)

- **On Pull Request**:
  - Runs build checks and linting
  - Creates Netlify preview deployment

## 🔍 Check Deployment Status

- **GitHub Actions**: https://github.com/PuLeeNa/CeylonChronicles/actions
- **Netlify**: https://app.netlify.com/
- **Render**: https://dashboard.render.com/

## 🐳 Docker Deployment (Optional)

Build and run locally:

```bash
docker build -t ceylon-chronicles .
docker run -p 3000:3000 --env-file .env ceylon-chronicles
```

## 📝 Notes

- Netlify: Great for previews and staging
- Render: Production environment with full API support
- Docker: Portable deployment option for any cloud provider
