"""
AvorIQ Backend — FastAPI Application Entry Point
Initializes database, pulls Ollama models, seeds data, and mounts API routers.
"""

import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: init DB, pull models, seed data. Shutdown: cleanup."""
    logger.info("=" * 60)
    logger.info("  AvorIQ Backend Starting...")
    logger.info("=" * 60)

    # Step 1: Initialize database + pgvector
    logger.info("[1/3] Initializing database and pgvector extension...")
    from app.database import init_db
    await init_db()
    logger.info("  ✓ Database initialized")

    # Step 2: Ensure Ollama models are pulled
    logger.info("[2/3] Checking Ollama models...")
    from app.services.ollama_service import ensure_models_ready
    await ensure_models_ready()
    logger.info("  ✓ Models ready")

    # Step 3: Seed scholarship data
    logger.info("[3/3] Seeding scholarship data...")
    from app.seed import seed_scholarships
    await seed_scholarships()
    logger.info("  ✓ Data seeded")

    logger.info("=" * 60)
    logger.info("  AvorIQ Backend Ready! → http://localhost:8000")
    logger.info("  API Docs → http://localhost:8000/docs")
    logger.info("=" * 60)

    yield  # App is running

    logger.info("AvorIQ Backend shutting down...")


# ── Create FastAPI app ──
app = FastAPI(
    title="AvorIQ API",
    description="AI-powered scholarship intelligence engine for Indian students",
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS Middleware ──
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Mount Routers ──
from app.routers.scholarships import router as scholarships_router
from app.routers.chat import router as chat_router

app.include_router(scholarships_router)
app.include_router(chat_router)


# ── Health Check ──
@app.get("/api/health")
async def health_check():
    """Health check endpoint for Docker and monitoring."""
    from app.services.ollama_service import check_health as ollama_health
    from app.database import engine
    from sqlalchemy import text

    # Check database
    db_status = "healthy"
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    # Check Ollama
    ollama_status = await ollama_health()

    return {
        "status": "healthy" if db_status == "healthy" and ollama_status.get("status") == "healthy" else "degraded",
        "database": db_status,
        "ollama": ollama_status.get("status", "unknown"),
        "models_loaded": ollama_status.get("models", []),
    }
