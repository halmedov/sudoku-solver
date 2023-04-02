import React, { useState } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';

function SudokuSolver() {
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [solved, setSolved] = useState(false);

  const solveSudoku = async () => {
    const response = await fetch('/api/solveSudoku', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ grid })
    });
    const solution = await response.json();
    setGrid(solution);
    setSolved(true);
  };

  const handleCellValueChange = (event, row, col) => {
    const value = event.target.value ? parseInt(event.target.value) : 0;
    const newGrid = [...grid];
    newGrid[row][col] = value;
    setGrid(newGrid);
    setSolved(false);
  };

  return (
    <Container fluid className="bg-secondary">
      <h1>Welcome To Sudoku Solver</h1>
      <Row className="justify-content-center mt-5">
        <Col md={4} xs={4}>
          <Table bordered responsive border={"dark"}>
            <tbody>
              {grid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`}>
                      <input
                        className="form-control form-control-lg text-center"
                        type="number"
                        min="1"
                        max="9"
                        value={value || ''}
                        onChange={(event) => handleCellValueChange(event, rowIndex, colIndex)}
                        disabled={solved}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-center">
            <Button variant="primary" size="xl" onClick={solveSudoku} disabled={solved}>
              {solved ? 'Solved!' : 'Solve'}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SudokuSolver;
