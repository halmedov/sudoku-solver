import React, { useState } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';


function SudokuSolver() {
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [solved, setSolved] = useState(false);

  const solveSudoku = async () => {
    console.log("Clicked");
    const api_url = 'http://127.0.0.1:5000/api/solveSudoku'
    try {
      const response = await axios({
        method: "POST",
        url: api_url,
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          grid: grid
        }
      });
      const solution = response.data;
      console.log(solution);
      setGrid(solution);
      setSolved(true);
    } catch (error) {
      console.error(error);
    }
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
        <Col md={6} xs={4}>
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
