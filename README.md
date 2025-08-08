# CineMood

🎬 **CineMood** — A mood-based movie recommendation app powered by AI.  
Discover movies tailored to your current mood, browse, add to your watchlist, and manage your favorites with ease.  
This experimental project uses AI, specifically the OpenAI API, to personalize movie suggestions and explore emerging technologies.

---

## Features

- User authentication with Firebase
- Mood-driven movie recommendations using AI APIs
- Browse movies with rich details and posters fetched from TMDb website
- Add or remove movies from your personal watchlist
- Responsive, modern UI built with React and Tailwind CSS
- State management using Zustand
- Smooth navigation with React Router
- Hosted live on Firebase Hosting

---

## Tech Stack

- React + TypeScript
- Vite (build tool)
- Firebase Authentication & Hosting
- Zustand (state management)
- Tailwind CSS
- React Router
- React Icons
- AI-powered recommendation backend (e.g., OpenAI API)

---

## Getting Started

### Prerequisites

- Node.js (>=14) and npm installed
- Firebase project setup (for Auth and Hosting)
- API keys for AI services (if used)

### Installation

```bash
git clone https://github.com/your-username/cinemood.git
cd cinemood
npm install

Setup Environment Variables

Create a .env file in the project root and add:

VITE_FIREBASE_API_KEY=your_api_key_here
VITE_OPENAI_API_KEY=your_openai_key
VITE_TMDB_ACCESS_TOKEN=your_tmdb_token

Run Development Server

npm run dev

Open http://localhost:5173 to view your app.

Build for Production

npm run build


⸻

Testing

Run unit tests using Vitest:

npm run test


⸻

Deployment

Deployed live on Firebase Hosting:

https://your-firebase-project.web.app

To deploy updates:

npm run build
firebase deploy --only hosting


⸻

Contact

For questions or feedback, reach out at ruchitadhagawkar18@gmail.com

⸻

Enjoy watching movies that match your mood! 🎥✨

---
```
