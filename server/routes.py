from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
import os
import json
from setup import OUTPUT_DIR, sheets_data
from utils import extract_text_from_file, load_skill_matrix, LLM_CALL_1, generate_resume_pdf

router = APIRouter()

@router.post("/upload/resume")
async def upload_resume(file: UploadFile = File(...)):
    """Upload and process a resume file"""
    file_path = os.path.join(OUTPUT_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    extracted_text = extract_text_from_file(file_path)
    return {"filename": file.filename, "file_path": file_path, "status": "success"}

@router.post("/upload/skill-matrix")
async def upload_skill_matrix(file: UploadFile = File(...)):
    """Upload a skill matrix Excel file"""
    file_path = os.path.join(OUTPUT_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    global sheets_data
    sheets_data = load_skill_matrix(file_path)
    return {"filename": file.filename, "file_path": file_path, "status": "success"}

@router.post("/generate/resume")
async def generate_resume(request: dict, background_tasks: BackgroundTasks):
    """Generate a resume based on the uploaded resume and template"""
    old_resume_path = request["old_resume_path"]

    if not os.path.exists(old_resume_path):
        raise HTTPException(status_code=400, detail="Resume file not found.")

    old_resume_text = extract_text_from_file(old_resume_path)
    structured_json = json.loads(LLM_CALL_1(old_resume_text))

    resume_path = generate_resume_pdf(structured_json)
    return {"message": "Resume generated successfully", "resume_path": resume_path}

@router.get("/download/{filename}")
async def download_file(filename: str):
    """Download generated resume file"""
    file_path = os.path.join(OUTPUT_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(file_path, filename=filename)
