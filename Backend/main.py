from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel

from agent import fix_bug
from executors.executor_manager import execute_code
from error_parser import parse_error
from fastapi import UploadFile, File
import shutil
import zipfile
import os
from repository.indexer import index_repository
from agent_task import run_agent_task

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeInput(BaseModel):
    code: str
    language: str

class AgentTaskInput(BaseModel):
    prompt: str

@app.get("/")
def home():
    return {
        "message": "AI Bug Fixer Running"
    }

@app.post("/fix")
def fix_code(data: CodeInput):

    execution_result = execute_code(
        data.code,
        data.language
    )

    if execution_result["success"]:

        return {
            "success": True,
            "message": "Code executed successfully",
            "output": execution_result["stdout"]
        }

    fixed_result = fix_bug(
        data.code,
        execution_result["stderr"],
        data.language
    )

    validation_result = execute_code(
        fixed_result["fixed_code"],
        data.language
    )

    return {
        "success": False,

        "runtime_error": parse_error(
            execution_result["stderr"]
        ),

        "original_code": data.code,

        "fixed_code": fixed_result["fixed_code"],

        "explanation": fixed_result["explanation"],

        "fix_validation": validation_result["success"],

        "validation_output": validation_result["stdout"],

        "validation_error": validation_result["stderr"]
    }

@app.post("/agent-task")

def agent_task(data: AgentTaskInput):

    result = run_agent_task(data.prompt)

    return {
        "result": result
    }

@app.post("/upload")

async def upload_file(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:

        content = await file.read()

        buffer.write(content)

    decoded_content = content.decode("utf-8")

    return {
        "filename": file.filename,
        "content": decoded_content
    }

@app.post("/upload-repository")

def upload_repository(file: UploadFile = File(...)):

    upload_path = f"uploads/{file.filename}"

    with open(upload_path, "wb") as buffer:

        shutil.copyfileobj(file.file, buffer)

    extract_path = f"repository/{file.filename.replace('.zip', '')}"

    os.makedirs(extract_path, exist_ok=True)

    with zipfile.ZipFile(upload_path, 'r') as zip_ref:

        zip_ref.extractall(extract_path)

    result = index_repository(extract_path)

    return {

        "message": "Repository indexed successfully",

        "indexed_files": result["indexed_files"],

        "total_chunks": result["total_chunks"]
    }