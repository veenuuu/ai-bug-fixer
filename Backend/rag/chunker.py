import re
import ast

def chunk_python_code(code):

    chunks = []

    tree = ast.parse(code)

    for node in tree.body:

        if isinstance(node, ast.FunctionDef):

            chunk = ast.get_source_segment(code, node)

            chunks.append(chunk)

        elif isinstance(node, ast.ClassDef):

            chunk = ast.get_source_segment(code, node)

            chunks.append(chunk)

    return chunks

def chunk_javascript_code(code):

    pattern = r"(function .*?{[\s\S]*?})"
    matches = re.findall(pattern, code)
    return matches

def chunk_code(code, language):
    language = language.lower().strip()
    if language == "python":
        return chunk_python_code(code)
    elif language == "javascript":
        return chunk_javascript_code(code)
    return []