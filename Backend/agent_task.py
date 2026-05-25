from embeddings.vector_store import search_chunks
from openai import OpenAI
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPEN_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)


def run_agent_task(prompt):

    retrieved_chunks = search_chunks(
        prompt,
        top_k=10
    )

    context = "\n\n".join([
        chunk["chunk"]
        for chunk in retrieved_chunks
    ])

    full_prompt = f"""
You are an expert AI software engineer.

A user uploaded a repository.

USER TASK:
{prompt}

REPOSITORY CONTEXT:
{context}

Your task:
1. Identify the most relevant file
2. Fix the issue
3. Return response ONLY in valid JSON format

Example response:

{{
  "file": "auth.py",
  "fixed_code": "full corrected code"
}}

IMPORTANT:
- file must be an ACTUAL file from repository context
- never invent filenames
- Return ONLY JSON
- No markdown
- No explanations
- fixed_code must contain complete corrected code
"""

    response = client.chat.completions.create(

        model="deepseek/deepseek-chat",

        messages=[
            {
                "role": "user",
                "content": full_prompt
            }
        ]

    )

    content = response.choices[0].message.content

    print(content)

    return json.loads(content)