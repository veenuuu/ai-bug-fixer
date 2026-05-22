import subprocess
import tempfile
import os

def run_code(code, extension, command):

    try:

        with tempfile.NamedTemporaryFile(
            mode="w",
            suffix=extension,
            delete=False
        ) as temp_file:

            temp_file.write(code)

            temp_path = temp_file.name

        final_command = command(temp_path)

        result = subprocess.run(
            final_command,
            capture_output=True,
            text=True,
            timeout=5
        )

        os.remove(temp_path)

        return {
            "success": result.returncode == 0,
            "stdout": result.stdout,
            "stderr": result.stderr
        }

    except Exception as e:

        return {
            "success": False,
            "stdout": "",
            "stderr": str(e)
        }