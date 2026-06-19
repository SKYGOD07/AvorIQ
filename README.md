# AvorIQ 🚀

**Adaptive Vision for Opportunity and Resources Intelligence Quotient**

> **Your AI Learning Companion for Every Step of Student Life.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎯 The Problem

Millions of deserving students in India—across rural villages, government schools, and tier-2/3 cities—miss out on life-changing financial opportunities because:

- Scholarship information is **fragmented** across hundreds of disorganized government and private portals
- Eligibility rules are **dense, confusing**, and buried in bureaucratic language
- **Critical deadlines** pass unnoticed, resulting in wasted funds and missed admissions
- Language barriers and lack of counseling prevent students from taking the next step

## 💡 Our Solution

**AvorIQ** aggregates, structures, and intelligently matches educational opportunities to each student's unique academic and socioeconomic profile.

### Version 1: Scholarship Intelligence Platform *(Active)*

A high-fidelity, AI-powered matching engine focused on helping students find the financial support they deserve:

| Feature | Description |
|---------|-------------|
| 🔍 **Smart Match Finder** | Input your profile → Get instant eligibility-scored scholarship matches |
| 📊 **Advanced Filters** | Filter by category (Govt/Private/NGO), education level, amount, deadline |
| 💬 **AI Chat Assistant** | Conversational AI that helps you discover and understand scholarships |
| 📋 **Application Tracker** | Track progress from Saved → Documents Verified → Applied → Approved → Funds Received |
| 📄 **Detailed Modals** | Complete info: eligibility, documents checklist, application steps, FAQs |
| 🔖 **Save & Bookmark** | Shortlist opportunities and manage them from a personal dashboard |

---

## 🛠 Repository Structure

```
AvorIQ-Lab/
├── avoriq/                      # Main application monorepo
│   ├── frontend/                # ✅ Active: Next.js 16 App Router
│   │   ├── app/                 #    Pages (landing, scholarships, chat, about, etc.)
│   │   ├── components/          #    UI components, marketing sections, ReactBits
│   │   ├── data/                #    Mock scholarship dataset & site content
│   │   ├── hooks/               #    Custom React hooks (localStorage, chatLimit)
│   │   ├── types/               #    TypeScript interfaces
│   │   └── public/              #    Static assets (logo, fonts)
│   ├── backend/                 # 🔜 Planned: FastAPI + pgvector search
│   ├── agents/                  # 🔜 Planned: LLM routing & intent detection
│   ├── scripts/                 # 🔜 Planned: Scholarship data scrapers
│   ├── whatsapp/                # 🔜 Planned: WhatsApp webhook integration
│   └── n8n/                     # 🔜 Planned: Workflow automation
├── datasets/                    # Raw data for RAG pipeline
├── docs/                        # Architecture diagrams & specs
├── logo/                        # Brand assets
└── README.md                    # ← You are here
```

---

## 💻 Tech Stack

### Frontend *(Active)*
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Design System (Warm Charcoal + Terracotta)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Typography**: Instrument Serif (editorial headlines) + Inter (body)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **State**: LocalStorage synchronization hooks

### Backend & AI *(Roadmap)*
- **Server**: FastAPI (Python)
- **Database**: PostgreSQL + pgvector (vector similarity search)
- **LLM Engine**: Ollama (Gemma 3 4B locally hosted via CPU)
- **Automation**: n8n workflow engine

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ and npm

### Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/AvorIQ-Lab.git
cd AvorIQ-Lab

# 2. Navigate to the frontend
cd avoriq/frontend

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🗺 Product Roadmap

| Phase | Module | Status |
|-------|--------|--------|
| **V1** | Scholarship Intelligence Platform | ✅ Active |
| **V2** | AI Study Planner & Exam Prep | 🔜 Q4 2026 |
| **V2** | WhatsApp AI Agent | 🔜 Q3 2026 |
| **V2** | Mental Wellness Support | 🔜 Q3 2026 |
| **V3** | RAG Vector Search Engine | 🔜 Q1 2027 |
| **V3** | Career Navigator | 🔜 Q1 2027 |
| **V3** | YouTube Learning Companion | 🔜 Q1 2027 |
| **V4** | Community Forums | 🔜 Q2 2027 |
| **V4** | Parent Dashboard | 🔜 Q2 2027 |

---

## 🎨 Design Philosophy

> *"If Spotify + Duolingo + Perplexity + Notion built an education app."*

- **Warm Dark Mode** — Charcoal tones (#1A1A1A), not cold navy
- **Terracotta Accent** (#E8715A) — Unique, warm brand identity
- **Editorial Typography** — Instrument Serif headlines + Inter body
- **Generous Whitespace** — Claude.ai-inspired clean layouts
- **Micro-Animations** — Tasteful motion for engagement
- **Glassmorphism** — Frosted glass surfaces for depth

---

## ⚖ Core Values

- **Accessibility**: Available 24/7 on web (WhatsApp coming soon), supporting simple language profiles
- **Equity**: Intentionally designed to prioritize rural, government school, and low-income students
- **Trust**: Only linking to verified, official application websites (.gov.in, CSR portals)
- **Empowerment**: Removing financial barriers so students can pursue education without debt or dropouts

---

## 🏆 USAII Hackathon Submission

This project is submitted for the **USAII Hackathon**. AvorIQ demonstrates:

1. **Real-world AI Application** — Intelligent scholarship matching for underserved students
2. **Production-Quality Frontend** — Premium design with editorial typography, animations, and responsive layouts
3. **Scalable Architecture** — Monorepo structure ready for backend, vector search, and multi-channel AI agents
4. **Social Impact** — Directly addressing educational inequality in India

---

## 👥 Team

Built with ❤️ for Indian students.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
