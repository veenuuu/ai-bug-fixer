def parse_error(error_text):

    lines = error_text.strip().split("\n")

    if not lines:
        return "Unknown Error"

    last_line = lines[-1]

    return last_line