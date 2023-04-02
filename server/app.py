from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from sudoku import sudoku_solver

app = Flask(__name__)
CORS(app, support_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/', methods=['GET', 'POST'])
def index():
    return jsonify({'msg': 'success'})


@app.route('/api/solveSudoku', methods=['POST'])
@cross_origin(supports_credentials=True)
def solve_sudoku_api():
    try:
        print("Called")
        data = request.get_json()
        grid = data.get('grid')
        print(grid)
        if not grid:
            return jsonify({'error': 'Invalid input: Grid not provided.'}), 400
        solution = sudoku_solver(grid)
        return jsonify(solution)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
