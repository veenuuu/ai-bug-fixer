from RAG.chunker import chunk_code

code = """
class MathUtils:

    def add(self,a,b):
        return a+b

def divide(a,b):
    return a/b
"""

chunks = chunk_code(code, "python")

print(chunks)