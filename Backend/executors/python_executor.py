from executors.base_executor import run_code

def execute_python(code):

    return run_code(
        code,
        ".py",
        lambda path: ["python", path]
    )