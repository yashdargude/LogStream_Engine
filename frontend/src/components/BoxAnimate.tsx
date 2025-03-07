"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { distance } from "@popmotion/popcorn";

const grid = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
];

const size = 20;
const gap = 10;

const Square = ({ active, setActive, colIndex, rowIndex, x, y }) => {
  const isDragging = colIndex === active.col && rowIndex === active.row;
  const d = distance(
    { x: active.col, y: active.row },
    { x: colIndex, y: rowIndex }
  );
  const springConfig = {
    stiffness: Math.max(700 - d * 120, 0),
    damping: 20 + d * 5,
  };
  const dx = useSpring(x, springConfig);
  const dy = useSpring(y, springConfig);

  // Grey color gradient effect (left to right)
  const totalCols = grid[0].length;
  const greyScale = Math.floor((colIndex / (totalCols - 1)) * 255);
  const backgroundColor = `rgb(${greyScale}, ${greyScale}, ${greyScale})`;

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.5}
      onDragStart={() => setActive({ row: rowIndex, col: colIndex })}
      onDragEnd={() => {
        dx.set(0);
        dy.set(0);
      }}
      className="absolute rounded-full"
      style={{
        background: backgroundColor,
        width: size,
        height: size,
        top: rowIndex * (size + gap),
        left: colIndex * (size + gap),
        x: isDragging ? x : dx,
        y: isDragging ? y : dy,
        zIndex: isDragging ? 1 : 0,
      }}
    />
  );
};

export default function BoxAnimate() {
  const [active, setActive] = useState({ row: 0, col: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.div
      className="absolute bottom-4 left-4 w-72 h-72"
      drag
      dragElastic={0.8}
      style={{ x, y }}
      onDragEnd={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        <motion.div
          animate={{ "--base-hue": 360 } as any}
          initial={{ "--base-hue": 0 } as any}
          transition={{ duration: 10, loop: Infinity, ease: "linear" }}
          className="relative"
        >
          <motion.div className="relative flex w-[calc(4*35px-5px)] h-[calc(4*35px-5px)]">
            {grid.map((row, rowIndex) =>
              row.map((_item, colIndex) => (
                <Square
                  x={x}
                  y={y}
                  active={active}
                  setActive={setActive}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  key={rowIndex + colIndex}
                />
              ))
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
