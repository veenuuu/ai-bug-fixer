from repository.dependency_graph import extract_dependencies


result = extract_dependencies(
    "repository/sample_repo/auth.py"
)

print(result)