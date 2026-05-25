def fetch_user():

    return {
        "id": 1,
        "name": "Veenu"
    }


def login():

    user = fetch_user()

    print(user["email"])


login()