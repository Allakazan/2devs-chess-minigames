import { useCursor } from "@react-three/drei";
import { useState } from "react";

export interface BoardPositionProps {
  move: [number, number];
  onPositionClick: (position: [number, number]) => void;
}

const BOARD_SIZE = 30;

const BOARD_SPACES = 8;

const ADDER = BOARD_SIZE / BOARD_SPACES;

const OFFSET = BOARD_SIZE / 2 - ADDER / 2;

export function BoardPosition({ move, onPositionClick }: BoardPositionProps) {
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  return (
    <mesh
      key={`position-${move[0]}-${move[1]}`}
      position={[OFFSET - ADDER * move[0], 0, OFFSET - ADDER * move[1]]}
      onClick={(e) => {
        e.stopPropagation();

        onPositionClick(move);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <boxGeometry args={[2.5, 0.5, 2.5]} />
      <meshBasicMaterial
        visible={true}
        wireframe={true}
        color={hovered ? "red" : "blue"}
      />
    </mesh>
  );
}
