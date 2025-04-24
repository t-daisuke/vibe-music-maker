import React from "react";
import { audioEngine } from "../../lib/audio";
import { harmonyEngine } from "../../lib/harmony";

const GRID_SIZE = 8;

export const GridLayout: React.FC = () => {
  const [activeCells, setActiveCells] = React.useState<boolean[][]>(
    Array(GRID_SIZE)
      .fill(false)
      .map(() => Array(GRID_SIZE).fill(false))
  );

  const handleCellClick = async (row: number, col: number) => {
    const newActiveCells = [...activeCells];
    newActiveCells[row][col] = !newActiveCells[row][col];
    setActiveCells(newActiveCells);

    if (newActiveCells[row][col]) {
      // 行ごとに異なるコードを割り当て
      const chord = harmonyEngine.getChord(row + 1);
      const notes = harmonyEngine.getChordNotes(chord);
      await audioEngine.playChord(notes);
    }
  };

  return (
    <div className="grid grid-cols-8 gap-4">
      {activeCells.map((row, rowIndex) =>
        row.map((isActive, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            className={`
              w-16 h-16 rounded-lg transition-colors
              ${
                isActive
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }
            `}
          />
        ))
      )}
    </div>
  );
};
