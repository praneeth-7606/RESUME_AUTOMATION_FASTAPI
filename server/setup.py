from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Resume Automation API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API key for Mistral
API_KEY = "ZJjgVeyKcDyuN7PGriE6mHR6kKsN8gdq"

# Global variable to store loaded skill matrix data
sheets_data = []

# Paths configuration
BASE_PATH = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_PATH, "Output")
PROMPTS_DIR = os.path.join(BASE_PATH, "Prompts")
TEMPLATES_DIR = os.path.join(BASE_PATH, "templates")
STATIC_DIR = os.path.join(BASE_PATH, "static")

# Create required directories
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(PROMPTS_DIR, exist_ok=True)
os.makedirs(TEMPLATES_DIR, exist_ok=True)
os.makedirs(STATIC_DIR, exist_ok=True)

# Function to create system prompt files if missing
def create_prompts():
    llm1_path = os.path.join(PROMPTS_DIR, "LLM1.txt")
    if not os.path.exists(llm1_path):
        with open(llm1_path, "w") as f:
            f.write("""
You are an AI assistant that extracts structured information from resumes.
Your task is to analyze the provided resume text and extract key details into a well-structured JSON format.
            """)

@app.on_event("startup")
async def startup_event():
    create_prompts()
