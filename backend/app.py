from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample data
users = [
    {'id': 1, 'name': 'John Doe', 'age': 25},
    {'id': 2, 'name': 'Jane Smith', 'age': 28}
]

@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(users)

@app.route('/api/users', methods=['POST'])
def add_user():
    new_user = request.json
    new_user['id'] = len(users) + 1
    users.append(new_user)
    return jsonify(new_user), 201

if __name__ == '__main__':
    app.run(debug=True)
