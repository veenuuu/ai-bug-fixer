def fetch_user():
    return {'email': 'user@example.com'}

def login():
    user = fetch_user()
    print(user['email'])