import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

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
    <>
      <Table bordered responsive>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`}>
                  <input
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
      <Button variant="primary" onClick={solveSudoku} disabled={solved}>
        {solved ? 'Solved!' : 'Solve'}
      </Button>
    </>
  );
}

export default SudokuSolver;
