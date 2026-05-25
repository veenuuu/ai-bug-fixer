from embeddings.vector_store import (
    store_chunks,
    search_chunks
)

chunks = [

    "def login(user): return True",

    "def calculate_total(price,tax): return price+tax",

    "def generate_token(user): return token"
]

store_chunks(
    chunks,
    "auth.py"
)

results = search_chunks(
    "authentication token"
)

print(results)