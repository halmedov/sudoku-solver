from ortools.sat.python import cp_model


def sudoku_solver(puzzle):
    # Create a model
    model = cp_model.CpModel()

    # Define the variables
    grid = []
    for i in range(9):
        row = []
        for j in range(9):
            var = model.NewIntVar(1, 9, f"cell_{i}_{j}")
            row.append(var)
        grid.append(row)

    # Define the constraints
    # Each cell must have a unique value
    for i in range(9):
        for j in range(9):
            model.AddAllDifferent([grid[i][j]])

    # Each row must have unique values
    for i in range(9):
        model.AddAllDifferent(grid[i])

    # Each column must have unique values
    for j in range(9):
        column = [grid[i][j] for i in range(9)]
        model.AddAllDifferent(column)

    # Each 3x3 block must have unique values
    for i in range(3):
        for j in range(3):
            block = []
            for k in range(3):
                for l in range(3):
                    block.append(grid[i * 3 + k][j * 3 + l])
            model.AddAllDifferent(block)

    # Add the given values to the model
    for i in range(9):
        for j in range(9):
            if puzzle[i][j] != 0:
                model.Add(grid[i][j] == puzzle[i][j])

    # Solve the puzzle
    solver = cp_model.CpSolver()
    solver.Solve(model)

    # Print the solution
    for i in range(9):
        for j in range(9):
            puzzle[i][j] = solver.Value(grid[i][j])

    return puzzle


# Define the puzzle to be solved
puzzle = [
    [7, 2, 0, 8, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 5, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 9, 0, 7, 0],
    [0, 0, 6, 0, 0, 0, 0, 8, 0],
    [0, 0, 0, 0, 5, 0, 3, 0, 9],
    [8, 0, 0, 4, 0, 0, 0, 0, 0],
    [0, 0, 9, 0, 0, 0, 0, 0, 0],
]

print(sudoku_solver(puzzle))