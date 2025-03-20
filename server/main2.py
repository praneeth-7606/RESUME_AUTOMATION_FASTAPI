# import markdown
# import weasyprint

# # Load Markdown content (replace with actual content)
# md_content = """
# # <h1>Keerthana Priya Devaraj</h1>
# **<h2>AI Engineer</h2>**

# <hr>

# ## <h2>PROFESSIONAL SUMMARY</h2>

# <ul>
#     <li>Proficient in programming and software development, demonstrating strong coding skills and best practices.</li>
#     <li>Solid foundation in machine learning (ML) and deep learning (DL), applying algorithms to solve complex problems.</li>
#     <li>Adept at data engineering and preprocessing, ensuring data quality and readiness for model training.</li>
#     <li>Skilled in natural language processing (NLP), enabling machines to understand and process human language.</li>
#     <li>Experienced in computer vision, extracting insights and information from images and videos.</li>
#     <li>Proficient in AI model deployment and MLOps, managing the lifecycle of AI models from development to production.</li>
# </ul>

# <hr>

# ## <h2>PROJECT DETAILS</h2>

# ### <h3>Interview Bot</h3>
# **Description:**  
# <p>Developed an AI-powered interview bot using Python, LLMs, and NLP to streamline the recruitment process.</p>

# **Role:**  
# <p>AI/ML Developer</p>

# **Technology:**  
# <p>Python, LangChain, LLMs, NLP (SpaCy), Whisper, FastAPI, S3, EC2</p>

# **Role Played:**  
# <p>Led the development of the HR interview bot, integrating various technologies and ensuring its accuracy and reliability.</p>
# """

# # Convert Markdown to HTML
# html_content = markdown.markdown(md_content)

# # Define output PDF filename
# pdf_filename = "final_resume.pdf"

# # Convert HTML to PDF
# weasyprint.HTML(string=html_content).write_pdf(pdf_filename)

# print(f"✅ PDF generated successfully: {pdf_filename}")





import os
import json
import markdown
import pdfkit
import pdfplumber
import tempfile
import streamlit as st
from jinja2 import Template
from mistralai.client import MistralClient
from mistralai.models import ChatMessage

# from mistralai.models.chat_completion import ChatMessage

# Configure AI Agent with Mistral API
MISTRAL_API_KEY = "KYbOJ10ZoBXW7EgRNLjNCsup8b5uxOCQ"  # Replace with actual API key
mistral_client = MistralClient(api_key=MISTRAL_API_KEY)

# Function to extract structured text from PDF
def extract_text_from_pdf(pdf_path):
    extracted_text = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                extracted_text.append(page_text)

    markdown_text = "\n\n".join(extracted_text)
    return markdown_text

# Function to generate structured Markdown with HTML using Mistral AI
def generate_markdown_template(raw_text):
    messages = [
        ChatMessage(role="system", content="Convert the given resume text into a structured Markdown with HTML tags, preserving the structure."),
        ChatMessage(role="user", content=raw_text),
    ]
    
    response = mistral_client.chat(model="mistral-7b", messages=messages)
    return response.choices[0].message.content.strip()

# Function to fill the template with JSON data
def fill_resume_template(md_template, resume_data):
    try:
        template = Template(md_template)
        rendered_content = template.render(resume_data)
        return rendered_content
    except Exception as e:
        print(f"❌ Error rendering template: {e}")
        return ""

# Convert Markdown to PDF
def markdown_to_pdf(markdown_content, output_pdf):
    html_content = markdown.markdown(markdown_content)
    pdfkit.from_string(html_content, output_pdf)

# Main function to automate the entire process
def automate_resume_process(pdf_file, json_file):
    try:
        # Save uploaded files to a temporary location
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
            temp_pdf.write(pdf_file.read())
            pdf_path = temp_pdf.name

        with tempfile.NamedTemporaryFile(delete=False, suffix=".json") as temp_json:
            temp_json.write(json_file.read())
            json_path = temp_json.name

        # Extract template from PDF
        raw_text = extract_text_from_pdf(pdf_path)

        # Generate structured Markdown template using Mistral AI
        md_template = generate_markdown_template(raw_text)

        # Load JSON data
        with open(json_path, "r", encoding="utf-8") as file:
            json_data = json.load(file)

        # Fill the template with JSON data
        final_resume_md = fill_resume_template(md_template, json_data)

        # Convert Markdown to PDF
        output_pdf_path = "final_resume.pdf"
        markdown_to_pdf(final_resume_md, output_pdf_path)

        return output_pdf_path

    except Exception as e:
        print(f"❌ Error: {e}")
        return None

# Streamlit UI for file uploads
st.title("📄 AI Resume Formatter with Mistral")
st.write("Upload a **resume template (PDF)** and **old resume data (JSON)**. The AI will format it into a new structured resume.")

pdf_file = st.file_uploader("Upload Resume Template (PDF)", type=["pdf"])
json_file = st.file_uploader("Upload Resume Data (JSON)", type=["json"])

if st.button("Generate Resume"):
    if pdf_file and json_file:
        with st.spinner("Processing..."):
            output_pdf = automate_resume_process(pdf_file, json_file)
            if output_pdf:
                st.success("✅ Resume successfully generated!")
                with open(output_pdf, "rb") as f:
                    st.download_button("⬇️ Download Resume", f, file_name="formatted_resume.pdf", mime="application/pdf")
            else:
                st.error("❌ Failed to generate the resume.")
    else:
        st.warning("⚠️ Please upload both the PDF template and JSON file.")
