from embeddings.VectorStore import search_chunks

from repository.graph_store import graph_data


def retrieve_context(error_message):

    results = search_chunks(
        error_message,
        top_k=3
    )

    related_files = set()

    context = ""

    for item in results:

        related_files.add(item["file"])

        context += f"""
FILE: {item['file']}

CODE:
{item['chunk']}

-------------------
"""

    for file in related_files:

        if file not in graph_data:

            continue

        dependencies = graph_data[file]

        context += f"""

DEPENDENCY INFO:

FILE: {file}

IMPORTS:
{dependencies['imports']}

FUNCTIONS:
{dependencies['functions']}

FUNCTION CALLS:
{dependencies['function_calls']}

-------------------
"""

    return context