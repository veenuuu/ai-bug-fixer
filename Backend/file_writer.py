import os


def save_fixed_file(
    repo_path,
    file_name,
    fixed_code
):

    file_path = os.path.join(
        repo_path,
        file_name
    )

    directory = os.path.dirname(file_path)

    if directory:

        os.makedirs(
            directory,
            exist_ok=True
        )

    with open(
        file_path,
        "w",
        encoding="utf-8"
    ) as f:

        f.write(fixed_code)

    return file_path