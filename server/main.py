from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import os

import config
from services import data_service
from routers import upload, search, generate
from utils import template_manager  # Import template manager

# Initialize the FastAPI app
app = FastAPI(title="Resume Automation API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust for your React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup templates
templates = Jinja2Templates(directory=config.TEMPLATES_DIR)

# Include routers
app.include_router(upload.router)
app.include_router(search.router)
app.include_router(generate.router)

# Add a route to serve the HTML page
@app.get("/", response_class=HTMLResponse)
async def get_html():
    with open(os.path.join(config.TEMPLATES_DIR, "index.html"), "r") as f:
        html_content = f.read()
    return HTMLResponse(content=html_content)

# Startup event
@app.on_event("startup")
async def startup_event():
    # Create default prompts
    data_service.create_prompts()
    
    # Display available templates
    templates_info = template_manager.get_available_templates()
    print(f"Available resume templates: {len(templates_info['resume_templates'])}")
    for template in templates_info['resume_templates']:
        print(f"  - Template {template['id']}: {template['name']}")
    
    print(f"Available cover letter templates: {len(templates_info['cover_letter_templates'])}")
    for template in templates_info['cover_letter_templates']:
        print(f"  - Template {template['id']}: {template['name']}")

# Mount static files directory
app.mount("/static", StaticFiles(directory=config.STATIC_DIR), name="static")

# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)





# from fastapi import FastAPI, HTTPException
# from fastapi.staticfiles import StaticFiles
# from fastapi.templating import Jinja2Templates
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import HTMLResponse, FileResponse
# import os
# import config
# from services import data_service
# from routers import upload, search, generate
# from utils import template_manager
# import pathlib

# # Initialize the FastAPI app
# app = FastAPI(title="Resume Automation API")

# # Enable CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # Adjust for your React frontend URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Setup templates
# templates = Jinja2Templates(directory=config.TEMPLATES_DIR)

# # Include routers
# app.include_router(upload.router)
# app.include_router(search.router)
# app.include_router(generate.router)

# # Add a route to serve the HTML page
# @app.get("/", response_class=HTMLResponse)
# async def get_html():
#     with open(os.path.join(config.TEMPLATES_DIR, "index.html"), "r") as f:
#         html_content = f.read()
#     return HTMLResponse(content=html_content)

# # Add route for downloading generated files
# @app.get("/generate/download/{file_name}")
# async def download_generated_file(file_name: str):
#     """
#     Download a generated file (resume or cover letter)
#     """
#     # Define path to the generated file
#     file_path = os.path.join(config.OUTPUT_DIR, file_name)
    
#     # Check if file exists
#     if not os.path.isfile(file_path):
#         raise HTTPException(status_code=404, detail=f"File {file_name} not found")
    
#     # Get the file name for the download
#     file_name_display = os.path.basename(file_path)
    
#     # Determine if it's a resume or cover letter for a better download experience
#     if "_Resume" in file_name_display:
#         media_type = "application/pdf"
#         filename = file_name_display
#     elif "_Cover_Letter" in file_name_display:
#         media_type = "application/pdf"
#         filename = file_name_display
#     else:
#         # For other file types, detect media type based on extension
#         media_type = "application/octet-stream"
#         filename = file_name_display
    
#     return FileResponse(
#         path=file_path, 
#         media_type=media_type, 
#         filename=filename,
#         headers={"Content-Disposition": f"attachment; filename={filename}"}
#     )

# # Startup event
# @app.on_event("startup")
# async def startup_event():
#     # Create default prompts
#     data_service.create_prompts()
    
#     # Ensure output directory exists
#     os.makedirs(config.OUTPUT_DIR, exist_ok=True)
    
#     # Display available templates
#     templates_info = template_manager.get_available_templates()
#     print(f"Available resume templates: {len(templates_info['resume_templates'])}")
#     for template in templates_info['resume_templates']:
#         print(f"  - Template {template['id']}: {template['name']}")
    
#     print(f"Available cover letter templates: {len(templates_info['cover_letter_templates'])}")
#     for template in templates_info['cover_letter_templates']:
#         print(f"  - Template {template['id']}: {template['name']}")

# # Mount static files directory
# app.mount("/static", StaticFiles(directory=config.STATIC_DIR), name="static")

# # Run the application
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)