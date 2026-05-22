from executors.python_executor import execute_python
from executors.javascript_executor import execute_javascript

def execute_code(code, language):

    language = language.lower().strip()

    if language == "python":

        return execute_python(code)

    elif language == "javascript":

        return execute_javascript(code)

    else:

        return {
            "success": False,
            "stdout": "",
            "stderr": f"Unsupported language: {language}"
        }