import React from "react";
import { motion } from "framer-motion";
import { GridCell as GridCellType } from "@/types";
import { useSessionStore } from "@/stores/sessionStore";

interface GridCellProps {
  cell: GridCellType;
  row: number;
  col: number;
}

export const GridCell: React.FC<GridCellProps> = ({ cell, row, col }) => {
  const updateGridCell = useSessionStore((state) => state.updateGridCell);

  const handleClick = () => {
    updateGridCell(row, col, { isActive: !cell.isActive });
  };

  return (
    <motion.button
      className={`w-16 h-16 rounded-lg border-2 ${
        cell.isActive
          ? "bg-blue-500 border-blue-700"
          : "bg-gray-200 border-gray-400"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      aria-label={`Grid cell ${row}-${col}`}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-sm font-medium">
          {cell.chord.root}
          {cell.chord.quality}
        </span>
        {cell.chord.tension && (
          <span className="text-xs">{cell.chord.tension.join(",")}</span>
        )}
      </div>
    </motion.button>
  );
};
