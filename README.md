# VedaAI Assessment Creator

VedaAI is a full-stack web application designed to help teachers quickly generate high-quality question papers, assignments, and lesson plans using AI. You just upload your source material, set your parameters (like question types and difficulty), and the app handles the rest.

<!-- Add your first screenshot here (e.g. Dashboard view) -->
<img width="1860" height="883" alt="image" src="https://github.com/user-attachments/assets/6a3ccf93-d905-4e44-9725-73d1c6462be9" />
<img width="1829" height="889" alt="image" src="https://github.com/user-attachments/assets/54cd62f4-d5eb-47c6-863b-3f238284bf48" />



## Features

- **AI Question Generation:** Upload text or PDFs and generate structured question papers.
- **Customizable Papers:** Pick how many MCQs, short answer, and long answer questions you need.
- **Live Updates:** See real-time progress via WebSockets as your paper generates in the background.
- **Lesson Planner:** A built-in AI tool to outline chapters and class topics.
- **PDF Export:** Preview the generated paper and export it directly to a print-ready PDF.

<!-- Add your second screenshot here (e.g. Create Assignment Form) -->
<img width="1833" height="872" alt="image" src="https://github.com/user-attachments/assets/444b2886-fb10-4811-9d94-dca171cd4448" />


## Tech Stack

Here is what powers VedaAI under the hood:

**Frontend:**
- Next.js 15 (App Router)
- React
- Tailwind CSS
- Zustand (State Management)
- Socket.io Client (Real-time updates)

**Backend:**
- Node.js & Express
- TypeScript
- BullMQ (Background job processing)
- Socket.io (WebSocket server)
- Google Gemini API (AI text generation)

**Database & Infrastructure:**
- MongoDB (Database)
- Redis / Upstash (Queue management & caching)
- Render (Backend hosting)
- Vercel (Frontend hosting)

<!-- Add your third screenshot here (e.g. Generated PDF Preview) -->
<img width="1406" height="767" alt="image" src="https://github.com/user-attachments/assets/71fbf460-96a7-4d7c-9876-ae4cc86c8a84" />


## Local Development

If you want to run this project locally, follow these steps.

### Prerequisites
You will need Node.js, a MongoDB instance, a Redis instance, and a Gemini API Key.

### 1. Setup the Backend
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:3000
NODE_ENV=development
JWT_SECRET=your_secret_key
```

Start the backend server:
```bash
npm run dev
```

### 2. Setup the Frontend
Open a new terminal, navigate to the `frontend` folder, and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file based on `.env.example`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

Start the frontend server:
```bash
npm run dev
```

The app should now be running at `http://localhost:3000`.

## Deployment

- The frontend is optimized for deployment on Vercel.
- The backend contains a `render.yaml` file for easy deployment as a Web Service on Render. 
- Make sure to set your Upstash Redis eviction policy to `noeviction` to prevent background jobs from failing.
