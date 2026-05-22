from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import os
import json

model = None

dimension = 384

INDEX_PATH = "vector_data/faiss_index.bin"

METADATA_PATH = "vector_data/chunks.json"


def get_model():

    global model

    if model is None:

        model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

    return model


# LOAD EXISTING INDEX
if os.path.exists(INDEX_PATH):

    index = faiss.read_index(INDEX_PATH)

else:

    index = faiss.IndexFlatL2(dimension)


# LOAD EXISTING CHUNKS
if os.path.exists(METADATA_PATH):

    with open(METADATA_PATH, "r") as f:

        chunks_store = json.load(f)

else:

    chunks_store = []


def save_vector_store():

    faiss.write_index(index, INDEX_PATH)

    with open(METADATA_PATH, "w") as f:

        json.dump(chunks_store, f, indent=2)


def store_chunks(chunks, file_name="unknown"):

    global chunks_store

    embeddings = get_model().encode(chunks)

    embeddings = np.array(
        embeddings
    ).astype("float32")

    index.add(embeddings)

    for chunk in chunks:

        chunks_store.append({
            "chunk": chunk,
            "file": file_name
        })

    save_vector_store()


def search_chunks(query, top_k=3):

    if len(chunks_store) == 0:

        return []

    query_embedding = get_model().encode([query])

    query_embedding = np.array(
        query_embedding
    ).astype("float32")

    distances, indices = index.search(
        query_embedding,
        top_k
    )

    results = []

    for idx in indices[0]:

        if idx < len(chunks_store):

            results.append(
                chunks_store[idx]
            )

    return results