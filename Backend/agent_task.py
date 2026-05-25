from embeddings.vector_store import search_chunks

from openai import OpenAI

from dotenv import load_dotenv

import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPEN_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)


def run_agent_task(prompt):

    retrieved_chunks = search_chunks(prompt)

    context = "\n\n".join([
        chunk["chunk"]
        for chunk in retrieved_chunks
    ])

    full_prompt = f"""
You are an AI coding agent.

A user uploaded a repository.

USER TASK:
{prompt}

RELEVANT REPOSITORY CONTEXT:
{context}

Analyze the issue carefully.

Explain:
1. What the issue is
2. Which file/function is likely involved
3. Suggested fix
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

    return response.choices[0].message.content