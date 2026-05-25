from repository.indexer import index_repository

from embeddings.vector_store import search_chunks


result = index_repository(
    "repository/sample_repo"
)

print(result)


results = search_chunks(
    "authentication token"
)

print(results)