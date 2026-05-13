# AI Learning Hub

A mini AI-powered learning platform that allows users to select topics, send prompts to an AI, and receive personalized lessons. Built as a full-stack mini MVP.

---

## Technologies Used

### Backend
- **Node.js** + **Express** — REST API server
- **MongoDB** + **Mongoose** — Database and ORM
- **OpenAI GPT API** — AI-generated lessons
- **dotenv** — Environment variable management

### Frontend
- **React** + **Vite** — Frontend framework
- **Redux Toolkit** — State management
- **Material UI (MUI)** — UI component library
- **Axios** — HTTP client
- **React Router DOM** — Client-side routing

---

## Project Structure

```
AI-Learning-Hub/
├── backend/
│   ├── config/         → Database connection
│   ├── controllers/    → Request handlers
│   ├── middlewares/    → Validation & logging
│   ├── models/         → Mongoose schemas
│   ├── routes/         → API route definitions
│   ├── services/       → Business logic & OpenAI integration
│   ├── app.js          → Express app setup
│   └── server.js       → Server entry point
└── frontend/
    └── src/
        ├── api/        → Axios API calls
        ├── components/ → React pages (Register, Learn, History, Admin)
        └── store/      → Redux slices
```

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/AI-Learning-Hub
OPENAI_API_KEY=sk-...
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/users | Register or login user |
| GET | /api/users | Get all users |
| GET | /api/categories | Get all categories |
| POST | /api/categories | Create category |
| GET | /api/categories/:id/subcategories | Get subcategories |
| POST | /api/categories/:id/subcategories | Create subcategory |
| POST | /api/prompts | Send prompt to AI |
| GET | /api/prompts/:userId | Get user history |
| GET | /api/admin/users | Admin: all users |
| GET | /api/admin/history | Admin: all prompts |

---

## Assumptions Made

- A user is identified by their phone number — if the phone already exists, the user is logged in instead of creating a new account
- Categories and subcategories are managed by the admin and are not created by regular users
- The admin dashboard is protected by a simple code (`admin123`) — JWT authentication can be added as an enhancement
- If the OpenAI API is unavailable (e.g. no credits), the system returns a mock response so the app remains functional during development

---

## How to Run Locally

1. Clone the repository
2. Set up backend `.env` with your MongoDB URI and OpenAI API key
3. Run backend: `cd backend && npm run dev`
4. Run frontend: `cd frontend && npm run dev`
5. Open `http://localhost:5173` in your browser

---

## Sample .env

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/AI-Learning-Hub
OPENAI_API_KEY=sk-<your-openai-api-key>
```

---

## Features

- User registration and login by phone number
- Category and subcategory selection
- AI-generated lessons via OpenAI GPT
- Personal learning history per user
- Admin dashboard with all users and their prompt history
- Clean chat-style UI with dark mode

## Docker Setup

To run the full stack using Docker:

```bash
docker-compose up --build

