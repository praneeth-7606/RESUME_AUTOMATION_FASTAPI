# """
# Template manager module to handle different PDF resume and cover letter templates.
# """

# import os
# import json
# from typing import Dict, Any, Callable, Optional, List
# import config

# # Import all template functions
# from utils.pdf_utils import generate_resume_1, generate_cover_letter_pdf
# from utils.template_pdf import generate_resume_2

# # Dictionary to store available resume templates
# RESUME_TEMPLATES = {
#     1: generate_resume_1,  # Default/Original template
#     2: generate_resume_2,  # Professional template
#     # Add more templates here when available
# }

# # Define a function to generate cover letter using template 2
# def generate_cover_letter_2(data, cover_letter_text):
#     """Generate cover letter using the professional template (template 2)."""
#     if isinstance(data, str):
#         try:
#             data = json.loads(data)
#         except json.JSONDecodeError:
#             data = {"name": "Candidate", "designation": "Professional"}
    
#     # Create PDF using similar approach to resume but with cover letter content
#     # This is a simplified version - implement according to your needs
#     from utils.template_pdf import ResumePDF
    
#     pdf = ResumePDF()
#     pdf.name = data.get('name', 'Candidate')
#     pdf.designation = data.get('designation', '')
#     pdf.contact = " | ".join(filter(None, [
#         data.get('phone', ''), 
#         data.get('email', ''), 
#         data.get('linkedin', '')
#     ]))
#     pdf.add_page()
    
#     # Add cover letter title
#     pdf.section_title('Cover Letter')
    
#     # Process the cover letter text into paragraphs
#     paragraphs = cover_letter_text.split('\n\n')
#     for paragraph in paragraphs:
#         if paragraph.strip():
#             pdf.section_body(paragraph.strip())
    
#     # Save the file
#     filename = f"{pdf.name.replace(' ', '_')}_Cover_Letter.pdf"
#     output_path = os.path.join(config.OUTPUT_DIR, filename)
#     pdf.output(output_path)
#     return output_path

# # Dictionary to store available cover letter templates
# COVER_LETTER_TEMPLATES = {
#     1: generate_cover_letter_pdf,  # Default/Original template
#     2: generate_cover_letter_2,    # Professional template
#     # Add more templates here when available
# }

# def get_available_templates() -> Dict[str, List[Dict[str, Any]]]:
#     """
#     Get a list of all available templates with their details.
#     Useful for providing template options to the frontend.
    
#     Returns:
#         Dictionary with resume and cover letter template information
#     """
#     resume_templates = [
#         {"id": 1, "name": "Standard Template", "description": "Basic clean resume layout"},
#         {"id": 2, "name": "Professional Template", "description": "Modern professional resume with improved formatting"}
#     ]
    
#     cover_letter_templates = [
#         {"id": 1, "name": "Standard Cover Letter", "description": "Basic clean cover letter layout"},
#         {"id": 2, "name": "Professional Cover Letter", "description": "Matching cover letter for professional resume template"}
#     ]
    
#     return {
#         "resume_templates": resume_templates,
#         "cover_letter_templates": cover_letter_templates
#     }

# def generate_resume(data: Any, template_id: int = 1) -> str:
#     """
#     Generate a resume with the specified template.
    
#     Args:
#         data: Resume data (dictionary or JSON string)
#         template_id: ID of the template to use
        
#     Returns:
#         Path to the generated PDF file
#     """
#     # Log the template_id for debugging
#     print(f"Generating resume with template_id: {template_id}")
    
#     # Get the generator function for the specified template
#     if template_id in RESUME_TEMPLATES:
#         template_func = RESUME_TEMPLATES[template_id]
#     else:
#         print(f"Warning: Template ID {template_id} not found, using default template")
#         template_func = RESUME_TEMPLATES[1]  # Default to template 1
    
#     # Pass data to the template function
#     try:
#         output_path = template_func(data)
        
#         # Ensure the file is in the output directory
#         if not output_path.startswith(config.OUTPUT_DIR):
#             filename = os.path.basename(output_path)
#             new_path = os.path.join(config.OUTPUT_DIR, filename)
            
#             # If the file exists but is not in output dir, copy it
#             if os.path.exists(output_path):
#                 import shutil
#                 shutil.copy2(output_path, new_path)
#                 return new_path
        
#         return output_path
#     except Exception as e:
#         print(f"Error generating resume with template {template_id}: {str(e)}")
#         raise

# def generate_cover_letter(data: Any, cover_letter_text: str, template_id: int = 1) -> str:
#     """
#     Generate a cover letter with the specified template.
    
#     Args:
#         data: Resume/candidate data (dictionary or JSON string)
#         cover_letter_text: Text content for the cover letter
#         template_id: ID of the template to use
        
#     Returns:
#         Path to the generated PDF file
#     """
#     # Log the template_id for debugging
#     print(f"Generating cover letter with template_id: {template_id}")
    
#     # Get the generator function for the specified template
#     if template_id in COVER_LETTER_TEMPLATES:
#         template_func = COVER_LETTER_TEMPLATES[template_id]
#     else:
#         print(f"Warning: Cover letter template ID {template_id} not found, using default template")
#         template_func = COVER_LETTER_TEMPLATES[1]  # Default to template 1
    
#     # Handle the different parameter requirements between templates
#     try:
#         if template_id == 1:
#             # Original template only needs name and text
#             if isinstance(data, dict):
#                 name = data.get('name', 'Candidate')
#             elif isinstance(data, str):
#                 try:
#                     data_dict = json.loads(data)
#                     name = data_dict.get('name', 'Candidate')
#                 except:
#                     name = 'Candidate'
#             else:
#                 name = 'Candidate'
                
#             output_path = template_func(cover_letter_text, name)
#         else:
#             # Other templates need full data and text
#             output_path = template_func(data, cover_letter_text)
        
#         # Ensure the file is in the output directory
#         if not output_path.startswith(config.OUTPUT_DIR):
#             filename = os.path.basename(output_path)
#             new_path = os.path.join(config.OUTPUT_DIR, filename)
            
#             # If the file exists but is not in output dir, copy it
#             if os.path.exists(output_path):
#                 import shutil
#                 shutil.copy2(output_path, new_path)
#                 return new_path
        
#         return output_path
#     except Exception as e:
#         print(f"Error generating cover letter with template {template_id}: {str(e)}")
#         raise




# """
# Add a new template to the template manager.
# """

# import os
# import json
# from typing import Dict, Any, Callable, Optional, List
# import config

# # Import all template functions
# from utils.pdf_utils import generate_resume_1, generate_cover_letter_pdf
# from utils.template_pdf import generate_resume_2

# # Define the new template function
# def generate_resume_4(data):
#     """
#     Creative Portfolio template with colorful layout and visual emphasis
    
#     This template features:
#     - Colorful header with accent colors
#     - Modern typography
#     - Emphasized skills and portfolio sections
#     """
#     # Convert data to dict if it's a JSON string
#     if isinstance(data, str):
#         try:
#             data = json.loads(data)
#         except json.JSONDecodeError:
#             data = {"name": "Candidate", "designation": "Professional"}
    
#     # Use the FPDF library to create a new PDF
#     from fpdf import FPDF
    
#     class CreativePortfolioPDF(FPDF):
#         def __init__(self):
#             super().__init__()
#             self.accent_color = (142, 68, 173)  # Purple accent color
#             self.accent_color_light = (187, 143, 206)  # Light purple for backgrounds
        
#         def header(self):
#             # Add colorful header
#             self.set_fill_color(*self.accent_color)
#             self.rect(0, 0, 210, 30, 'F')
            
#             # Add name in white
#             self.set_font('Helvetica', 'B', 20)
#             self.set_text_color(255, 255, 255)
#             self.cell(0, 20, data.get('name', 'Candidate'), 0, 1, 'C')
            
#             # Add designation below name
#             if data.get('designation'):
#                 self.set_font('Helvetica', 'I', 12)
#                 self.cell(0, 10, data.get('designation', ''), 0, 1, 'C')
            
#             # Reset text color
#             self.set_text_color(0, 0, 0)
            
#         def footer(self):
#             # Position at 1.5 cm from bottom
#             self.set_y(-15)
#             # Add colored footer
#             self.set_fill_color(*self.accent_color_light)
#             self.rect(0, self.get_y(), 210, 15, 'F')
#             # Add page number in white
#             self.set_text_color(0, 0, 0)
#             self.set_font('Helvetica', 'I', 8)
#             self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')
        
#         def section_title(self, title):
#             # Add colored section title
#             self.set_font('Helvetica', 'B', 14)
#             self.set_fill_color(*self.accent_color)
#             self.set_text_color(255, 255, 255)
#             self.cell(0, 8, title.upper(), 0, 1, 'L', fill=True)
#             self.set_text_color(0, 0, 0)
#             self.ln(2)
        
#         def add_skill_section(self, skills):
#             if not skills:
#                 return
                
#             self.section_title("SKILLS")
            
#             if isinstance(skills, list):
#                 # Create a nice visual grid of skills
#                 skill_width = 60
#                 skill_height = 10
#                 col = 0
                
#                 for skill in skills:
#                     if col >= 3:  # 3 skills per row
#                         col = 0
#                         self.ln(skill_height)
                    
#                     # Add a nice skill box with light background
#                     self.set_fill_color(*self.accent_color_light)
#                     self.set_font('Helvetica', 'B', 9)
#                     self.cell(skill_width, skill_height, skill, 1, 0, 'C', fill=True)
#                     col += 1
                
#                 self.ln(skill_height + 5)
            
#             elif isinstance(skills, dict):
#                 # Handle categorized skills
#                 for category, skill_list in skills.items():
#                     if skill_list:
#                         self.set_font('Helvetica', 'B', 11)
#                         self.cell(0, 6, category.replace("_", " ").title(), 0, 1)
                        
#                         # Create a grid of skills for each category
#                         skill_width = 60
#                         skill_height = 10
#                         col = 0
                        
#                         for skill in skill_list:
#                             if col >= 3:  # 3 skills per row
#                                 col = 0
#                                 self.ln(skill_height)
                            
#                             # Add a nice skill box with light background
#                             self.set_fill_color(*self.accent_color_light)
#                             self.set_font('Helvetica', '', 9)
#                             self.cell(skill_width, skill_height, skill, 1, 0, 'C', fill=True)
#                             col += 1
                        
#                         self.ln(skill_height + 5)
    
#     # Create PDF instance
#     pdf = CreativePortfolioPDF()
#     pdf.add_page()
    
#     # Add sections
    
#     # Summary
#     if data.get('summarized_objective') or data.get('objective'):
#         pdf.section_title("PROFESSIONAL SUMMARY")
#         pdf.set_font('Helvetica', '', 10)
#         pdf.multi_cell(0, 5, data.get('summarized_objective', data.get('objective', '')))
#         pdf.ln(5)
    
#     # Education
#     if data.get('education'):
#         pdf.section_title("EDUCATION")
#         pdf.set_font('Helvetica', '', 10)
        
#         education = data.get('education')
#         if isinstance(education, list):
#             for edu in education:
#                 pdf.multi_cell(0, 5, edu)
#                 pdf.ln(2)
#         else:
#             pdf.multi_cell(0, 5, education)
        
#         pdf.ln(5)
    
#     # Skills with custom formatting
#     if data.get('skills'):
#         pdf.add_skill_section(data.get('skills'))
#     elif data.get('technical_skills'):
#         pdf.add_skill_section(data.get('technical_skills'))
    
#     # Projects or Experience
#     if data.get('project_details') or data.get('projects'):
#         pdf.section_title("PORTFOLIO")
        
#         projects = data.get('projects', [])
#         if not projects and data.get('project_details'):
#             project_details = data.get('project_details')
#             if isinstance(project_details, dict):
#                 projects = [{"title": p.get("name", ""), "description": p.get("description", "")} 
#                            for p in project_details.values()]
#             elif isinstance(project_details, list):
#                 projects = [{"title": p.get("name", ""), "description": p.get("description", "")} 
#                            for p in project_details]
        
#         for project in projects:
#             # Add a project box with light background
#             pdf.set_fill_color(*pdf.accent_color_light)
#             pdf.set_font('Helvetica', 'B', 12)
#             pdf.cell(0, 8, project.get('title', project.get('name', '')), 0, 1, 'L', fill=True)
            
#             pdf.set_font('Helvetica', '', 10)
#             pdf.multi_cell(0, 5, project.get('description', ''))
#             pdf.ln(5)
    
#     # Save the file
#     output_filename = f"{data.get('name', 'Candidate').replace(' ', '_')}_Creative_Resume.pdf"
#     output_path = os.path.join(config.OUTPUT_DIR, output_filename)
#     pdf.output(output_path)
#     return output_path

# # Function to generate a matching cover letter with template 4
# def generate_cover_letter_4(data, cover_letter_text):
#     """
#     Creative Portfolio cover letter template with matching style to resume template 4
#     """
#     # Convert data to dict if it's a JSON string
#     if isinstance(data, str):
#         try:
#             data = json.loads(data)
#         except json.JSONDecodeError:
#             data = {"name": "Candidate", "designation": "Professional"}
    
#     # Use the FPDF library to create a new PDF
#     from fpdf import FPDF
    
#     class CreativePortfolioPDF(FPDF):
#         def __init__(self):
#             super().__init__()
#             self.accent_color = (142, 68, 173)  # Purple accent color
#             self.accent_color_light = (187, 143, 206)  # Light purple for backgrounds
        
#         def header(self):
#             # Add colorful header
#             self.set_fill_color(*self.accent_color)
#             self.rect(0, 0, 210, 30, 'F')
            
#             # Add name in white
#             self.set_font('Helvetica', 'B', 20)
#             self.set_text_color(255, 255, 255)
#             self.cell(0, 20, data.get('name', 'Candidate'), 0, 1, 'C')
            
#             # Add designation below name
#             if data.get('designation'):
#                 self.set_font('Helvetica', 'I', 12)
#                 self.cell(0, 10, data.get('designation', ''), 0, 1, 'C')
            
#             # Reset text color
#             self.set_text_color(0, 0, 0)
            
#         def footer(self):
#             # Position at 1.5 cm from bottom
#             self.set_y(-15)
#             # Add colored footer
#             self.set_fill_color(*self.accent_color_light)
#             self.rect(0, self.get_y(), 210, 15, 'F')
#             # Add page number in white
#             self.set_text_color(0, 0, 0)
#             self.set_font('Helvetica', 'I', 8)
#             self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')
        
#         def section_title(self, title):
#             # Add colored section title
#             self.set_font('Helvetica', 'B', 14)
#             self.set_fill_color(*self.accent_color)
#             self.set_text_color(255, 255, 255)
#             self.cell(0, 8, title.upper(), 0, 1, 'L', fill=True)
#             self.set_text_color(0, 0, 0)
#             self.ln(2)
    
#     # Create PDF instance
#     pdf = CreativePortfolioPDF()
#     pdf.add_page()
    
#     # Add cover letter title
#     pdf.section_title("COVER LETTER")
    
#     # Date
#     import datetime
#     today = datetime.datetime.now().strftime("%B %d, %Y")
#     pdf.set_font('Helvetica', '', 10)
#     pdf.cell(0, 6, today, 0, 1, 'R')
#     pdf.ln(5)
    
#     # Recipient
#     recipient = data.get('recipient', 'Hiring Manager')
#     pdf.set_font('Helvetica', 'B', 10)
#     pdf.cell(0, 6, f"Dear {recipient},", 0, 1)
#     pdf.ln(5)
    
#     # Cover letter content with nice formatting
#     pdf.set_font('Helvetica', '', 10)
#     paragraphs = cover_letter_text.split('\n\n')
    
#     for paragraph in paragraphs:
#         if paragraph.strip():
#             pdf.multi_cell(0, 5, paragraph.strip())
#             pdf.ln(5)
    
#     # Closing
#     pdf.ln(5)
#     pdf.cell(0, 6, "Sincerely,", 0, 1)
#     pdf.ln(10)
    
#     # Signature with stylish accent
#     pdf.set_font('Helvetica', 'B', 12)
#     pdf.set_text_color(*pdf.accent_color)
#     pdf.cell(0, 6, data.get('name', 'Candidate'), 0, 1)
#     pdf.set_text_color(0, 0, 0)
    
#     # Save the file
#     output_filename = f"{data.get('name', 'Candidate').replace(' ', '_')}_Creative_Cover_Letter.pdf"
#     output_path = os.path.join(config.OUTPUT_DIR, output_filename)
#     pdf.output(output_path)
#     return output_path

# # Dictionary to store available resume templates
# RESUME_TEMPLATES = {
#     1: generate_resume_1,  # Default/Original template
#     2: generate_resume_2,  # Professional template
#     4: generate_resume_4,  # Creative Portfolio template
#     # Add more templates here when available
# }

# # Define a function to generate cover letter using template 2
# def generate_cover_letter_2(data, cover_letter_text):
#     """Generate cover letter using the professional template (template 2)."""
#     if isinstance(data, str):
#         try:
#             data = json.loads(data)
#         except json.JSONDecodeError:
#             data = {"name": "Candidate", "designation": "Professional"}
    
#     # Create PDF using similar approach to resume but with cover letter content
#     # This is a simplified version - implement according to your needs
#     from utils.template_pdf import ResumePDF
    
#     pdf = ResumePDF()
#     pdf.name = data.get('name', 'Candidate')
#     pdf.designation = data.get('designation', '')
#     pdf.contact = " | ".join(filter(None, [
#         data.get('phone', ''), 
#         data.get('email', ''), 
#         data.get('linkedin', '')
#     ]))
#     pdf.add_page()
    
#     # Add cover letter title
#     pdf.section_title('Cover Letter')
    
#     # Process the cover letter text into paragraphs
#     paragraphs = cover_letter_text.split('\n\n')
#     for paragraph in paragraphs:
#         if paragraph.strip():
#             pdf.section_body(paragraph.strip())
    
#     # Save the file
#     filename = f"{pdf.name.replace(' ', '_')}_Cover_Letter.pdf"
#     output_path = os.path.join(config.OUTPUT_DIR, filename)
#     pdf.output(output_path)
#     return output_path

# # Dictionary to store available cover letter templates
# COVER_LETTER_TEMPLATES = {
#     1: generate_cover_letter_pdf,  # Default/Original template
#     2: generate_cover_letter_2,    # Professional template
#     4: generate_cover_letter_4,    # Creative Portfolio template
#     # Add more templates here when available
# }

# def get_available_templates() -> Dict[str, List[Dict[str, Any]]]:
#     """
#     Get a list of all available templates with their details.
#     Useful for providing template options to the frontend.
    
#     Returns:
#         Dictionary with resume and cover letter template information
#     """
#     resume_templates = [
#         {"id": 1, "name": "Standard Template", "description": "Basic clean resume layout"},
#         {"id": 2, "name": "Professional Template", "description": "Modern professional resume with improved formatting"},
#         {"id": 4, "name": "Creative Portfolio", "description": "Colorful template with visual emphasis for creative professionals"}
#     ]
    
#     cover_letter_templates = [
#         {"id": 1, "name": "Standard Cover Letter", "description": "Basic clean cover letter layout"},
#         {"id": 2, "name": "Professional Cover Letter", "description": "Matching cover letter for professional resume template"},
#         {"id": 4, "name": "Creative Cover Letter", "description": "Matching cover letter for the Creative Portfolio template"}
#     ]
    
#     return {
#         "resume_templates": resume_templates,
#         "cover_letter_templates": cover_letter_templates
#     }

# def generate_resume(data: Any, template_id: int = 1) -> str:
#     """
#     Generate a resume with the specified template.
    
#     Args:
#         data: Resume data (dictionary or JSON string)
#         template_id: ID of the template to use
        
#     Returns:
#         Path to the generated PDF file
#     """
#     # Log the template_id for debugging
#     print(f"Generating resume with template_id: {template_id}")
    
#     # Get the generator function for the specified template
#     if template_id in RESUME_TEMPLATES:
#         template_func = RESUME_TEMPLATES[template_id]
#     else:
#         print(f"Warning: Template ID {template_id} not found, using default template")
#         template_func = RESUME_TEMPLATES[1]  # Default to template 1
    
#     # Pass data to the template function
#     try:
#         output_path = template_func(data)
        
#         # Ensure the file is in the output directory
#         if not output_path.startswith(config.OUTPUT_DIR):
#             filename = os.path.basename(output_path)
#             new_path = os.path.join(config.OUTPUT_DIR, filename)
            
#             # If the file exists but is not in output dir, copy it
#             if os.path.exists(output_path):
#                 import shutil
#                 shutil.copy2(output_path, new_path)
#                 return new_path
        
#         return output_path
#     except Exception as e:
#         print(f"Error generating resume with template {template_id}: {str(e)}")
#         raise

# def generate_cover_letter(data: Any, cover_letter_text: str, template_id: int = 1) -> str:
#     """
#     Generate a cover letter with the specified template.
    
#     Args:
#         data: Resume/candidate data (dictionary or JSON string)
#         cover_letter_text: Text content for the cover letter
#         template_id: ID of the template to use
        
#     Returns:
#         Path to the generated PDF file
#     """
#     # Log the template_id for debugging
#     print(f"Generating cover letter with template_id: {template_id}")
    
#     # Get the generator function for the specified template
#     if template_id in COVER_LETTER_TEMPLATES:
#         template_func = COVER_LETTER_TEMPLATES[template_id]
#     else:
#         print(f"Warning: Cover letter template ID {template_id} not found, using default template")
#         template_func = COVER_LETTER_TEMPLATES[1]  # Default to template 1
    
#     # Handle the different parameter requirements between templates
#     try:
#         if template_id == 1:
#             # Original template only needs name and text
#             if isinstance(data, dict):
#                 name = data.get('name', 'Candidate')
#             elif isinstance(data, str):
#                 try:
#                     data_dict = json.loads(data)
#                     name = data_dict.get('name', 'Candidate')
#                 except:
#                     name = 'Candidate'
#             else:
#                 name = 'Candidate'
                
#             output_path = template_func(cover_letter_text, name)
#         else:
#             # Other templates need full data and text
#             output_path = template_func(data, cover_letter_text)
        
#         # Ensure the file is in the output directory
#         if not output_path.startswith(config.OUTPUT_DIR):
#             filename = os.path.basename(output_path)
#             new_path = os.path.join(config.OUTPUT_DIR, filename)
            
#             # If the file exists but is not in output dir, copy it
#             if os.path.exists(output_path):
#                 import shutil
#                 shutil.copy2(output_path, new_path)
#                 return new_path
        
#         return output_path
#     except Exception as e:
#         print(f"Error generating cover letter with template {template_id}: {str(e)}")
#         raise




"""
Template manager module to handle different PDF resume and cover letter templates.
"""

import os
import json
from typing import Dict, Any, Callable, Optional, List
import config

# Import all template functions
from utils.pdf_utils import generate_resume_1, generate_cover_letter_pdf
from utils.template_pdf import generate_resume_2

# Import CreativeResumePDF from the code provided
from fpdf import FPDF
import re

class CreativeResumePDF(FPDF):
    bullet_image_path = "BP.jpeg"  # Ensure this exists in the directory
    
    def __init__(self):
        super().__init__()
        self.set_margins(10, 10, 10)  # Set left, top, and right margins
        self.set_auto_page_break(auto=True, margin=20)  # Ensure bottom margin

    def clean_text(self, text):
        """Cleans text by replacing special characters and encoding it properly."""
        if not isinstance(text, str):
            text = str(text)
        
        text = re.sub(r"[""]", '"', text)
        text = re.sub(r"['']", "'", text)
        text = re.sub(r"[–—]", "-", text)  # Replace long dashes
        
        # Encode to Latin-1 safely (ignore unsupported characters)
        text = text.encode("latin-1", "ignore").decode("latin-1")
        return text.strip()  # Ensure no extra spaces

    def header(self):
        """Creates an eye-catching header with a stylish background."""
        if self.page_no() == 1:
            # Add header background
            self.set_fill_color(30, 45, 80)  # Darker blue for top bar
            self.rect(0, 0, self.w, 50, 'F')

            # Add white space
            self.ln(18)

            # Centered Name
            self.set_text_color(255, 255, 255)  # White
            self.set_font('Arial', 'B', 26)
            self.cell(0, 12, self.clean_text(self.name), align='C', ln=True)

            # Centered Designation in Gold
            self.set_text_color(255, 215, 0)  # Gold
            self.set_font('Arial', 'B', 18)
            self.cell(0, 10, self.clean_text(self.designation), align='C', ln=True)

            # Centered Contact Details in Dark Blue
            self.set_font('Arial', 'B', 10)
            self.set_text_color(0, 51, 102)
            self.cell(0, 6, self.clean_text(self.contact), align='C', ln=True)
            
            self.ln(10)

    def add_bullet_point(self, text):
        """Adds a bullet point with an image or fallback symbol."""
        text = self.clean_text(text)
        if not text:  # Skip empty entries
            return  

        if os.path.exists(self.bullet_image_path):
            self.image(self.bullet_image_path, x=self.get_x(), y=self.get_y(), w=5, h=5)
            self.cell(6)  # Space between bullet and text
        else:
            self.cell(5, 6, "•", ln=False)  # Unicode bullet fallback

        self.multi_cell(0, 7, text)
        self.ln(1)
            
    def add_profile_section(self, profile_text):
        """Adds a centered profile section with a full-width colored bar for the title."""
        if not profile_text.strip():
            return  # Skip if empty

        self.set_font('Arial', 'B', 12)
        self.set_text_color(255, 255, 255)  # White text for contrast

        # Set the background color for the bar (Deep Blue)
        bar_height = 10
        self.set_fill_color(30, 45, 80)  # Dark Blue

        # Draw the colored bar (full-width)
        self.rect(0, self.get_y(), self.w, bar_height, 'F')

        # Place the title in the center of the bar
        self.cell(0, bar_height, "PROFILE", align='C', ln=True)

        # Move cursor below the bar
        self.ln(5)

        # Profile Text (Centered)
        self.set_font('Arial', '', 11)
        self.set_text_color(50, 50, 50)
        self.multi_cell(0, 7, self.clean_text(profile_text), align='C')
        
        self.ln(5)  # Extra space after the section
    
    def add_section(self, title, content):
        print(f"Adding section: {title}, Content: {content}")  # Debugging line

        if not content or (isinstance(content, list) and not any(isinstance(item, (str, dict)) and item for item in content)):
            return  # Skip empty sections

        self.set_font('Arial', 'B', 11)
        self.set_text_color(30, 45, 80)  # Deep Blue Title
        self.cell(0, 8, self.clean_text(title.upper()), ln=True)
        self.cell(0, 0, '', 'T', ln=True)  # Underline
        self.ln(5)

        self.set_font('Arial', '', 10)
        self.set_text_color(50, 50, 50)

        for item in content:
            if isinstance(item, dict) and 'title' in item:  # Handling cases like 'Courses'
                self.add_bullet_point(item['title'])
            elif isinstance(item, str) and item.strip():  # Ignore empty strings
                self.add_bullet_point(item)

        self.ln(3)

    def add_courses_section(self, courses):
        """Formats the Courses section separately with title and institution."""
        if not courses:
            return  # Skip if empty

        self.set_font('Arial', 'B', 11)
        self.set_text_color(30, 45, 80)  # Deep Blue Title
        self.cell(0, 8, "COURSES", ln=True)
        self.cell(0, 0, '', 'T', ln=True)  # Underline
        self.ln(5)

        self.set_font('Arial', '', 10)
        self.set_text_color(50, 50, 50)

        for course in courses:
            if 'title' in course and 'institution' in course:
                self.set_font('Arial', 'B', 10)
                self.cell(0, 6, f"{self.clean_text(course['title'])} - {self.clean_text(course['institution'])}", ln=True)
            self.ln(2)  # Add spacing

    def add_project_section(self, projects):
        """Formats the projects section, ensuring empty projects are skipped."""
        if not projects or not any(p.get('title', '').strip() for p in projects):
            return  # Skip if no valid projects

        self.set_font('Arial', 'B', 12)
        self.set_text_color(30, 45, 80)
        self.cell(0, 8, self.clean_text("PROJECTS"), ln=True)
        self.cell(0, 0, '', 'T', ln=True)
        self.ln(5)

        for project in projects:
            title = self.clean_text(project.get('title', ''))
            description = self.clean_text(project.get('description', ''))

            if not title:
                continue  # Skip projects without a title

            self.set_font('Arial', 'B', 11)
            self.add_bullet_point(title)

            if description:
                self.set_font('Arial', '', 10)
                self.multi_cell(0, 6, description)

            self.ln(5)

    def footer(self):
        """Adds a stylish footer with a thin underline."""
        self.set_y(-15)
        self.set_text_color(100, 100, 100)
        self.set_font('Arial', 'I', 10)
        self.cell(0, 10, f"Page {self.page_no()} | Resume", align='C')

# Define the function to generate a resume using the CreativeResumePDF template
def generate_resume_3(data):
    """
    Creative Resume template with blue header and modern styling
    
    This template features:
    - Blue header with gold accents
    - Modern typography
    - Clean section formatting
    - Elegant section styling
    """
    # Convert data to dict if it's a JSON string
    if isinstance(data, str):
        try:
            data = json.loads(data)
        except json.JSONDecodeError:
            data = {"name": "Candidate", "designation": "Professional"}
    
    pdf = CreativeResumePDF()
    pdf.name = data.get('name', '')
    pdf.designation = data.get('designation', '')
    
    # Handle contact information in different formats
    if isinstance(data.get('contact'), dict):
        pdf.contact = f"{data['contact'].get('phone', '')} | {data['contact'].get('email', '')} | {data['contact'].get('location', '')}"
    else:
        # Combine any available contact info
        contact_parts = []
        for field in ['phone', 'email', 'linkedin']:
            if data.get(field):
                contact_parts.append(data.get(field))
        pdf.contact = " | ".join(contact_parts) if contact_parts else ""
    
    pdf.add_page()
    
    # Add profile/summary section
    summary_text = data.get('summarized_objective', data.get('objective', ''))
    if summary_text:
        pdf.add_profile_section(summary_text)
    
    # Handle education in different formats
    education_data = data.get('education', "")
    if isinstance(education_data, str) and education_data.strip():
        pdf.add_section('Education', [education_data])
    elif isinstance(education_data, list):
        pdf.add_section('Education', education_data)
    
    # Handle skills in different formats
    if isinstance(data.get('skills'), dict):
        # Format from your template
        pdf.add_section('Technical Skills', data.get('skills', {}).get('technical', []))
        pdf.add_section('Soft Skills', data.get('skills', {}).get('soft', []))
        pdf.add_section('Languages', data.get('skills', {}).get('languages', []))
    elif isinstance(data.get('skills'), list):
        # Format from other templates
        pdf.add_section('Skills', data.get('skills', []))
    elif data.get('technical_skills'):
        # Another possible format
        for category, skill_list in data.get('technical_skills', {}).items():
            pdf.add_section(f"{category.replace('_', ' ').title()} Skills", skill_list)
    
    # Handle projects in different formats
    if data.get('projects'):
        pdf.add_project_section(data.get('projects'))
    elif data.get('project_details'):
        # Convert project_details to the format expected by add_project_section
        projects = []
        if isinstance(data['project_details'], dict):
            for key, project in data['project_details'].items():
                if isinstance(project, dict):
                    projects.append({
                        'title': project.get('name', ''),
                        'description': project.get('description', '')
                    })
        elif isinstance(data['project_details'], list):
            for project in data['project_details']:
                if isinstance(project, dict):
                    projects.append({
                        'title': project.get('name', ''),
                        'description': project.get('description', '')
                    })
        if projects:
            pdf.add_project_section(projects)
    
    # Add courses if available
    if 'courses' in data and isinstance(data['courses'], list) and data['courses']:
        pdf.add_courses_section(data['courses'])
    
    # Add declaration if available
    if data.get('declaration'):
        pdf.add_section('Declaration', [data['declaration']])
    
    # Generate filename and save to output directory
    output_filename = f"{data.get('name', 'Candidate').replace(' ', '_')}_Creative_Resume.pdf"
    output_path = os.path.join(config.OUTPUT_DIR, output_filename)
    pdf.output(output_path)
    return output_path

# Function to generate a matching cover letter for template 3
def generate_cover_letter_3(data, cover_letter_text):
    """
    Creative cover letter template with matching style to resume template 3
    
    Features:
    - Coordinated styling with the Creative Resume
    - Blue header with gold accents
    - Professional formatting
    """
    # Convert data to dict if it's a JSON string
    if isinstance(data, str):
        try:
            data = json.loads(data)
        except json.JSONDecodeError:
            data = {"name": "Candidate", "designation": "Professional"}
    
    # Create a new PDF using the CreativeResumePDF class
    pdf = CreativeResumePDF()
    pdf.name = data.get('name', '')
    pdf.designation = data.get('designation', '')
    
    # Handle contact information in different formats
    if isinstance(data.get('contact'), dict):
        pdf.contact = f"{data['contact'].get('phone', '')} | {data['contact'].get('email', '')} | {data['contact'].get('location', '')}"
    else:
        # Combine any available contact info
        contact_parts = []
        for field in ['phone', 'email', 'linkedin']:
            if data.get(field):
                contact_parts.append(data.get(field))
        pdf.contact = " | ".join(contact_parts) if contact_parts else ""
    
    pdf.add_page()
    
    # Add "COVER LETTER" header with blue background
    pdf.set_font('Arial', 'B', 12)
    pdf.set_text_color(255, 255, 255)  # White text for contrast
    bar_height = 10
    pdf.set_fill_color(30, 45, 80)  # Dark Blue
    pdf.rect(0, pdf.get_y(), pdf.w, bar_height, 'F')
    pdf.cell(0, bar_height, "COVER LETTER", align='C', ln=True)
    pdf.ln(5)
    
    # Add date
    import datetime
    today = datetime.datetime.now().strftime("%B %d, %Y")
    pdf.set_font('Arial', '', 10)
    pdf.set_text_color(0, 0, 0)
    pdf.cell(0, 6, today, 0, 1, 'R')
    pdf.ln(5)
    
    # Add greeting
    recipient = data.get('recipient', 'Hiring Manager')
    pdf.set_font('Arial', 'B', 11)
    pdf.set_text_color(30, 45, 80)  # Deep Blue
    pdf.cell(0, 6, f"Dear {recipient},", 0, 1)
    pdf.ln(5)
    
    # Add cover letter content
    pdf.set_font('Arial', '', 11)
    pdf.set_text_color(50, 50, 50)  # Dark gray for body text
    
    # Split into paragraphs and add each one
    paragraphs = cover_letter_text.split('\n\n')
    for paragraph in paragraphs:
        if paragraph.strip():
            pdf.multi_cell(0, 6, pdf.clean_text(paragraph.strip()))
            pdf.ln(5)
    
    # Add closing
    pdf.ln(5)
    pdf.cell(0, 6, "Sincerely,", 0, 1)
    pdf.ln(10)
    pdf.set_font('Arial', 'B', 11)
    pdf.set_text_color(30, 45, 80)  # Deep Blue
    pdf.cell(0, 6, pdf.clean_text(data.get('name', 'Candidate')), 0, 1)
    
    # Save to file
    output_filename = f"{data.get('name', 'Candidate').replace(' ', '_')}_Creative_Cover_Letter.pdf"
    output_path = os.path.join(config.OUTPUT_DIR, output_filename)
    pdf.output(output_path)
    return output_path

# Define the new template function for template 4
def generate_resume_4(data):
    """
    Creative Portfolio template with colorful layout and visual emphasis
    
    This template features:
    - Colorful header with accent colors
    - Modern typography
    - Emphasized skills and portfolio sections
    """
    # Convert data to dict if it's a JSON string
    if isinstance(data, str):
        try:
            data = json.loads(data)
        except json.JSONDecodeError:
            data = {"name": "Candidate", "designation": "Professional"}
    
    # Use the FPDF library to create a new PDF
    from fpdf import FPDF
    
    class CreativePortfolioPDF(FPDF):
        def __init__(self):
            super().__init__()
            self.accent_color = (142, 68, 173)  # Purple accent color
            self.accent_color_light = (187, 143, 206)  # Light purple for backgrounds
        
        def header(self):
            # Add colorful header
            self.set_fill_color(*self.accent_color)
            self.rect(0, 0, 210, 30, 'F')
            
            # Add name in white
            self.set_font('Helvetica', 'B', 20)
            self.set_text_color(255, 255, 255)
            self.cell(0, 20, data.get('name', 'Candidate'), 0, 1, 'C')
            
            # Add designation below name
            if data.get('designation'):
                self.set_font('Helvetica', 'I', 12)
                self.cell(0, 10, data.get('designation', ''), 0, 1, 'C')
            
            # Reset text color
            self.set_text_color(0, 0, 0)
            
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-15)
            # Add colored footer
            self.set_fill_color(*self.accent_color_light)
            self.rect(0, self.get_y(), 210, 15, 'F')
            # Add page number in white
            self.set_text_color(0, 0, 0)
            self.set_font('Helvetica', 'I', 8)
            self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')
        
        def section_title(self, title):
            # Add colored section title
            self.set_font('Helvetica', 'B', 14)
            self.set_fill_color(*self.accent_color)
            self.set_text_color(255, 255, 255)
            self.cell(0, 8, title.upper(), 0, 1, 'L', fill=True)
            self.set_text_color(0, 0, 0)
            self.ln(2)
        
        def add_skill_section(self, skills):
            if not skills:
                return
                
            self.section_title("SKILLS")
            
            if isinstance(skills, list):
                # Create a nice visual grid of skills
                skill_width = 60
                skill_height = 10
                col = 0
                
                for skill in skills:
                    if col >= 3:  # 3 skills per row
                        col = 0
                        self.ln(skill_height)
                    
                    # Add a nice skill box with light background
                    self.set_fill_color(*self.accent_color_light)
                    self.set_font('Helvetica', 'B', 9)
                    self.cell(skill_width, skill_height, skill, 1, 0, 'C', fill=True)
                    col += 1
                
                self.ln(skill_height + 5)
            
            elif isinstance(skills, dict):
                # Handle categorized skills
                for category, skill_list in skills.items():
                    if skill_list:
                        self.set_font('Helvetica', 'B', 11)
                        self.cell(0, 6, category.replace("_", " ").title(), 0, 1)
                        
                        # Create a grid of skills for each category
                        skill_width = 60
                        skill_height = 10
                        col = 0
                        
                        for skill in skill_list:
                            if col >= 3:  # 3 skills per row
                                col = 0
                                self.ln(skill_height)
                            
                            # Add a nice skill box with light background
                            self.set_fill_color(*self.accent_color_light)
                            self.set_font('Helvetica', '', 9)
                            self.cell(skill_width, skill_height, skill, 1, 0, 'C', fill=True)
                            col += 1
                        
                        self.ln(skill_height + 5)
    
    # Create PDF instance
    pdf = CreativePortfolioPDF()
    pdf.add_page()
    
    # Add sections
    
    # Summary
    if data.get('summarized_objective') or data.get('objective'):
        pdf.section_title("PROFESSIONAL SUMMARY")
        pdf.set_font('Helvetica', '', 10)
        pdf.multi_cell(0, 5, data.get('summarized_objective', data.get('objective', '')))
        pdf.ln(5)
    
    # Education
    if data.get('education'):
        pdf.section_title("EDUCATION")
        pdf.set_font('Helvetica', '', 10)
        
        education = data.get('education')
        if isinstance(education, list):
            for edu in education:
                pdf.multi_cell(0, 5, edu)
                pdf.ln(2)
        else:
            pdf.multi_cell(0, 5, education)
        
        pdf.ln(5)
    
    # Skills with custom formatting
    if data.get('skills'):
        pdf.add_skill_section(data.get('skills'))
    elif data.get('technical_skills'):
        pdf.add_skill_section(data.get('technical_skills'))
    
    # Projects or Experience
    if data.get('project_details') or data.get('projects'):
        pdf.section_title("PORTFOLIO")
        
        projects = data.get('projects', [])
        if not projects and data.get('project_details'):
            project_details = data.get('project_details')
            if isinstance(project_details, dict):
                projects = [{"title": p.get("name", ""), "description": p.get("description", "")} 
                           for p in project_details.values()]
            elif isinstance(project_details, list):
                projects = [{"title": p.get("name", ""), "description": p.get("description", "")} 
                           for p in project_details]
        
        for project in projects:
            # Add a project box with light background
            pdf.set_fill_color(*pdf.accent_color_light)
            pdf.set_font('Helvetica', 'B', 12)
            pdf.cell(0, 8, project.get('title', project.get('name', '')), 0, 1, 'L', fill=True)
            
            pdf.set_font('Helvetica', '', 10)
            pdf.multi_cell(0, 5, project.get('description', ''))
            pdf.ln(5)
    
    # Save the file
    output_filename = f"{data.get('name', 'Candidate').replace(' ', '_')}_Creative_Resume.pdf"
    output_path = os.path.join(config.OUTPUT_DIR, output_filename)
    pdf.output(output_path)
    return output_path

# Function to generate a matching cover letter with template 4
def generate_cover_letter_4(data, cover_letter_text):
    """
    Creative Portfolio cover letter template with matching style to resume template 4
    """
    # Convert data to dict if it's a JSON string
    if isinstance(data, str):
        try:
            data = json.loads(data)
        except json.JSONDecodeError:
            data = {"name": "Candidate", "designation": "Professional"}
    
    # Use the FPDF library to create a new PDF
    from fpdf import FPDF
    
    class CreativePortfolioPDF(FPDF):
        def __init__(self):
            super().__init__()
            self.accent_color = (142, 68, 173)  # Purple accent color
            self.accent_color_light = (187, 143, 206)  # Light purple for backgrounds
        
        def header(self):
            # Add colorful header
            self.set_fill_color(*self.accent_color)
            self.rect(0, 0, 210, 30, 'F')
            
            # Add name in white
            self.set_font('Helvetica', 'B', 20)
            self.set_text_color(255, 255, 255)
            self.cell(0, 20, data.get('name', 'Candidate'), 0, 1, 'C')
            
            # Add designation below name
            if data.get('designation'):
                self.set_font('Helvetica', 'I', 12)
                self.cell(0, 10, data.get('designation', ''), 0, 1, 'C')
            
            # Reset text color
            self.set_text_color(0, 0, 0)
            
        def footer(self):
            # Position at 1.5 cm from bottom
            self.set_y(-15)
            # Add colored footer
            self.set_fill_color(*self.accent_color_light)
            self.rect(0, self.get_y(), 210, 15, 'F')
            # Add page number in white
            self.set_text_color(0, 0, 0)
            self.set_font('Helvetica', 'I', 8)
            self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')
        
        def section_title(self, title):
            # Add colored section title
            self.set_font('Helvetica', 'B', 14)
            self.set_fill_color(*self.accent_color)
            self.set_text_color(255, 255, 255)
            self.cell(0, 8, title.upper(), 0, 1, 'L', fill=True)
            self.set_text_color(0, 0, 0)
            self.ln(2)
    
    # Create PDF instance
    pdf = CreativePortfolioPDF()
    pdf.add_page()
    
    # Add cover letter title
    pdf.section_title("COVER LETTER")
    
    # Date
    import datetime
    today = datetime.datetime.now().strftime("%B %d, %Y")
    pdf.set_font('Helvetica', '', 10)
    pdf.cell(0, 6, today, 0, 1, 'R')
    pdf.ln(5)
    
    # Recipient
    recipient = data.get('recipient', 'Hiring Manager')
    pdf.set_font('Helvetica', 'B', 10)
    pdf.cell(0, 6, f"Dear {recipient},", 0, 1)
    pdf.ln(5)
    
    # Cover letter content with nice formatting
    pdf.set_font('Helvetica', '', 10)
    paragraphs = cover_letter_text.split('\n\n')
    
    for paragraph in paragraphs:
        if paragraph.strip():
            pdf.multi_cell(0, 5, paragraph.strip())
            pdf.ln(5)
    
    # Closing
    pdf.ln(5)
    pdf.cell(0, 6, "Sincerely,", 0, 1)
    pdf.ln(10)
    
    # Signature with stylish accent
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(*pdf.accent_color)
    pdf.cell(0, 6, data.get('name', 'Candidate'), 0, 1)
    pdf.set_text_color(0, 0, 0)
    
    # Save the file
    output_filename = f"{data.get('name', 'Candidate').replace(' ', '_')}_Creative_Cover_Letter.pdf"
    output_path = os.path.join(config.OUTPUT_DIR, output_filename)
    pdf.output(output_path)
    return output_path

# Dictionary to store available resume templates
RESUME_TEMPLATES = {
    1: generate_resume_1,  # Default/Original template
    2: generate_resume_2,  # Professional template
    3: generate_resume_3,  # Creative Resume template (your provided code)
    4: generate_resume_4,  # Creative Portfolio template
    # Add more templates here when available
}

# Define a function to generate cover letter using template 2
def generate_cover_letter_2(data, cover_letter_text):
    """Generate cover letter using the professional template (template 2)."""
    if isinstance(data, str):
        try:
            data = json.loads(data)
        except json.JSONDecodeError:
            data = {"name": "Candidate", "designation": "Professional"}
    
    # Create PDF using similar approach to resume but with cover letter content
    # This is a simplified version - implement according to your needs
    from utils.template_pdf import ResumePDF
    
    pdf = ResumePDF()
    pdf.name = data.get('name', 'Candidate')
    pdf.designation = data.get('designation', '')
    pdf.contact = " | ".join(filter(None, [
        data.get('phone', ''), 
        data.get('email', ''), 
        data.get('linkedin', '')
    ]))
    pdf.add_page()
    
    # Add cover letter title
    pdf.section_title('Cover Letter')
    
    # Process the cover letter text into paragraphs
    paragraphs = cover_letter_text.split('\n\n')
    for paragraph in paragraphs:
        if paragraph.strip():
            pdf.section_body(paragraph.strip())
    
    # Save the file
    filename = f"{pdf.name.replace(' ', '_')}_Cover_Letter.pdf"
    output_path = os.path.join(config.OUTPUT_DIR, filename)
    pdf.output(output_path)
    return output_path

# Dictionary to store available cover letter templates
COVER_LETTER_TEMPLATES = {
    1: generate_cover_letter_pdf,  # Default/Original template
    2: generate_cover_letter_2,    # Professional template
    3: generate_cover_letter_3,    # Creative Resume template
    4: generate_cover_letter_4,    # Creative Portfolio template
    # Add more templates here when available
}

def get_available_templates() -> Dict[str, List[Dict[str, Any]]]:
    """
    Get a list of all available templates with their details.
    Useful for providing template options to the frontend.
    
    Returns:
        Dictionary with resume and cover letter template information
    """
    resume_templates = [
        {"id": 1, "name": "Standard Template", "description": "Basic clean resume layout"},
        {"id": 2, "name": "Professional Template", "description": "Modern professional resume with improved formatting"},
        {"id": 3, "name": "Creative Resume", "description": "Blue header with gold accents and elegant section styling"},
        {"id": 4, "name": "Creative Portfolio", "description": "Colorful template with visual emphasis for creative professionals"}
    ]
    
    cover_letter_templates = [
        {"id": 1, "name": "Standard Cover Letter", "description": "Basic clean cover letter layout"},
        {"id": 2, "name": "Professional Cover Letter", "description": "Matching cover letter for professional resume template"},
        {"id": 3, "name": "Creative Cover Letter", "description": "Blue header with gold accents for a stylish look"},
        {"id": 4, "name": "Creative Portfolio Cover Letter", "description": "Matching cover letter for the Creative Portfolio template"}
    ]
    
    return {
        "resume_templates": resume_templates,
        "cover_letter_templates": cover_letter_templates
    }

def generate_resume(data: Any, template_id: int = 1) -> str:
    """
    Generate a resume with the specified template.
    
    Args:
        data: Resume data (dictionary or JSON string)
        template_id: ID of the template to use
        
    Returns:
        Path to the generated PDF file
    """
    # Log the template_id for debugging
    print(f"Generating resume with template_id: {template_id}")
    
    # Get the generator function for the specified template
    if template_id in RESUME_TEMPLATES:
        template_func = RESUME_TEMPLATES[template_id]
    else:
        print(f"Warning: Template ID {template_id} not found, using default template")
        template_func = RESUME_TEMPLATES[1]  # Default to template 1
    
    # Pass data to the template function
    try:
        output_path = template_func(data)
        
        # Ensure the file is in the output directory
        if not output_path.startswith(config.OUTPUT_DIR):
            filename = os.path.basename(output_path)
            new_path = os.path.join(config.OUTPUT_DIR, filename)
            
            # If the file exists but is not in output dir, copy it
            if os.path.exists(output_path):
                import shutil
                shutil.copy2(output_path, new_path)
                return new_path
        
        return output_path
    except Exception as e:
        print(f"Error generating resume with template {template_id}: {str(e)}")
        raise

def generate_cover_letter(data: Any, cover_letter_text: str, template_id: int = 1) -> str:
    """
    Generate a cover letter with the specified template.
    
    Args:
        data: Resume/candidate data (dictionary or JSON string)
        cover_letter_text: Text content for the cover letter
        template_id: ID of the template to use
        
    Returns:
        Path to the generated PDF file
    """
    # Log the template_id for debugging
    print(f"Generating cover letter with template_id: {template_id}")
    
    # Get the generator function for the specified template
    if template_id in COVER_LETTER_TEMPLATES:
        template_func = COVER_LETTER_TEMPLATES[template_id]
    else:
        print(f"Warning: Cover letter template ID {template_id} not found, using default template")
        template_func = COVER_LETTER_TEMPLATES[1]  # Default to template 1
    
    # Handle the different parameter requirements between templates
    try:
        if template_id == 1:
            # Original template only needs name and text
            if isinstance(data, dict):
                name = data.get('name', 'Candidate')
            elif isinstance(data, str):
                try:
                    data_dict = json.loads(data)
                    name = data_dict.get('name', 'Candidate')
                except:
                    name = 'Candidate'
            else:
                name = 'Candidate'
                
            output_path = template_func(cover_letter_text, name)
        else:
            # Other templates need full data and text
            output_path = template_func(data, cover_letter_text)
        
        # Ensure the file is in the output directory
        if not output_path.startswith(config.OUTPUT_DIR):
            filename = os.path.basename(output_path)
            new_path = os.path.join(config.OUTPUT_DIR, filename)
            
            # If the file exists but is not in output dir, copy it
            if os.path.exists(output_path):
                import shutil
                shutil.copy2(output_path, new_path)
                return new_path
        
        return output_path
    except Exception as e:
        print(f"Error generating cover letter with template {template_id}: {str(e)}")
        raise