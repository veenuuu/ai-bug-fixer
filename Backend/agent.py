from openai import OpenAI
from dotenv import load_dotenv
from rag.retriever import retrieve_context
import os
import json
import re

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPEN_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

def fix_bug(code, error_message, language):

    retrieved_context = retrieve_context(error_message)

    prompt = f"""
You are an expert {language} debugger.

Fix the following {language} code.

CODE:
{code}

ERROR:
{error_message}

RELATED REPOSITORY CONTEXT:
{retrieved_context}

Return ONLY valid JSON in this format:

{{
    "fixed_code": "...",
    "explanation": "..."
}}

IMPORTANT:
- Return valid {language} code only.
- Do not return markdown.
- Do not use backticks.
"""

    response = client.chat.completions.create(
        model="deepseek/deepseek-chat",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response.choices[0].message.content

    try:

        return json.loads(content)

    except:

        match = re.search(r'\{.*\}', content, re.DOTALL)

        if match:

            return json.loads(match.group())

        return {
            "fixed_code": code,
            "explanation": "Failed to parse AI response."
        }