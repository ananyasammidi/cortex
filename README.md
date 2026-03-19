# Cortex Code — Agent Skill Designer

An AI-powered tool that converts plain-English data workflow descriptions into structured Cortex Code Agent Skill specifications.

Built with Node.js + Express + Claude (Anthropic API).

---

## Deploy to Railway (recommended, free tier available)

1. Push this folder to a GitHub repo
2. Go to [railway.app](https://railway.app) and click **New Project → Deploy from GitHub**
3. Select your repo
4. Add environment variable: `ANTHROPIC_API_KEY` = your key
5. Railway auto-detects Node.js and deploys — you'll get a public URL in ~60 seconds

---

## Deploy to Render (alternative)

1. Push to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your repo
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variable: `ANTHROPIC_API_KEY` = your key
7. Deploy — free tier spins down after inactivity but works fine for demos

---

## Run locally

```bash
npm install
ANTHROPIC_API_KEY=your_key_here npm start
# open http://localhost:3000
```

---

## Project structure

```
├── src/
│   └── server.js       # Express server + /api/generate endpoint
├── public/
│   └── index.html      # Frontend (single file, no build step)
├── package.json
└── README.md
```
