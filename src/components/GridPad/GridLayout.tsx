import React from "react";
import { audioEngine } from "../../lib/audio";
import { harmonyEngine } from "../../lib/harmony";

type GridSize = 4 | 8 | 12;

interface GridLayoutProps {
  gridSize: GridSize;
}

export const GridLayout: React.FC<GridLayoutProps> = ({ gridSize }) => {
  const [activeCells, setActiveCells] = React.useState<boolean[][]>(
    Array(gridSize)
      .fill(false)
      .map(() => Array(gridSize).fill(false))
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

  // グリッドサイズが変更されたときにセルをリセット
  React.useEffect(() => {
    setActiveCells(
      Array(gridSize)
        .fill(false)
        .map(() => Array(gridSize).fill(false))
    );
  }, [gridSize]);

  return (
    <div
      className="grid-pad"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, var(--grid-cell-size))`,
        "--grid-cell-size": `${100 / gridSize}%` as any,
      }}
    >
      {activeCells.map((row, rowIndex) =>
        row.map((isActive, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            className={`grid-cell ${
              isActive ? "active glow-animation" : "inactive"
            }`}
            aria-label={`セル ${rowIndex + 1}-${colIndex + 1}`}
          />
        ))
      )}
    </div>
  );
};
