# AvorIQ 🚀
**Adaptive Vision for Opportunity and Resources Intelligence Quotient**

> **Your AI Learning Companion for Every Step of Student Life.**

AvorIQ is a powerful, AI-driven educational second brain designed specifically for Indian students from Class 6 to Graduation. We transform information fragmentation and uncertainty into clear, personalized, and structured action.

---

## 🎯 The Vision

Millions of deserving students in India—across rural villages, government schools, and tier-2/3 cities—miss out on life-changing opportunities because:
- Scholarship, exam, and career information is fragmented across hundreds of disorganized portals.
- Eligibility rules are dense, confusing, and difficult to comprehend.
- Critical deadlines pass by unnoticed, resulting in wasted funds and missed admissions.
- Language barriers and a lack of counseling prevent students from taking the next step.

**AvorIQ solves this by aggregating, structuring, and matching educational opportunities specifically to the student's unique academic and socioeconomic profile.**

We are building a fully integrated, vector-supported (RAG) assistant that responds to web, voice, and WhatsApp queries, paired with custom learning paths, exam planners, and financial matching engines.

---

## 🗺 The Modules (Roadmap)

### 🟢 Version 1: Scholarship Intelligence Platform (Active)
A high-fidelity, client-side matching engine focused on finding the money to keep students in school.
- **Interactive Match Finder**: Input your profile to see instant eligibility matches.
- **Smart Filters & Tracking**: Vetted results with deadline tracking and milestone management (Saved, Applied, Vetted, Disbursed).
- **Beautiful & Accessible UI**: A premium, ChatGPT/Claude-level interface utilizing animated components, dynamic gradients, and glassmorphism.

### 🟡 Phase 2: AI Study Planner (Coming Soon)
- Custom adaptive study calendars based on exam dates (Boards, JEE, NEET).
- Automated syllabus breakdowns mapping daily chapters to study goals.

### 🟡 Phase 2: Exam Prep Assistant (Coming Soon)
- Instant mock test grading and explanations for past year papers.
- Weakness tracking analytics pointing out chapters that need review.

### 🟡 Phase 2: WhatsApp AI Agent (Coming Soon)
- Receive weekly eligibility matching digests.
- Check deadlines and verify documents by messaging our WhatsApp bot.

### 🟡 Phase 3: RAG & Vector Engine (Coming Soon)
- A FastAPI backend connecting to a **PostgreSQL** database with **pgvector**.
- **Ollama / Gemma** embeddings translating query inputs to find semantically relevant scholarships.

---

## 🛠 Repository Structure

This repository holds the entire multi-module vision for AvorIQ:

```
AvorIQ-Lab/
├── avoriq/
│   ├── frontend/        # Active: Premium Next.js App Router (React 19, Tailwind v4, Framer Motion)
│   ├── agents/          # Planned: Autonomous LLM routing scripts
│   ├── backend/         # Planned: FastAPI server exposing search endpoints
│   ├── n8n/             # Planned: Automated visual cron triggers
│   ├── scripts/         # Planned: Python scraper crawlers
│   └── whatsapp/        # Planned: Twilio/WhatsApp Webhook integrations
├── datasets/            # Raw data for RAG and embeddings
├── docs/                # Architecture diagrams and system specifications
└── README.md            # You are here
```

*(Note: Many of these folders contain `.gitkeep` as they are staged for Phase 2 and 3 development).*

---

## 💻 Tech Stack Configuration

- **Frontend**: Next.js App Router, React 19, Tailwind CSS v4, Framer Motion, React Bits.
- **Backend & AI (Planned)**: FastAPI, Python, PostgreSQL (`pgvector`), Ollama (Gemma 2B / Llama 3 locally), n8n.

---

## 🚀 Getting Started

To run the active AvorIQ frontend locally:

1. Navigate to the frontend directory:
   ```bash
   cd avoriq/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚖ Core Values
- **Accessibility**: Available on web and WhatsApp, supporting simple language profiles.
- **Equity**: Intentionally designed to prioritize rural, government school, and low-income students.
- **Trust**: Directly routing only to verified, official application websites.
