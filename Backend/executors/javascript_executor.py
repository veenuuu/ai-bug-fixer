from executors.base_executor import run_code

def execute_javascript(code):

    return run_code(
        code,
        ".js",
        lambda path: ["node", path]
    )