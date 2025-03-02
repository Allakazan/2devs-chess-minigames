import { Color } from "three";
import { ChessPieceModel, GLTFResult } from "./ChessPieceModel";
import { useEffect, useState } from "react";
import { useCursor } from "@react-three/drei";
import { useAtom } from "jotai";
import { motion } from "framer-motion-3d";
import { boardAtom, BoardPieces, piecePositions } from "../atoms/board.atom";
import { degToRad } from "three/src/math/MathUtils.js";

interface BaseChessPieceProps {
  //piece: keyof GLTFResult["nodes"];
  id: number;
  piece: BoardPieces;
  color: "white" | "black";
  position: [number, number];
}

const pieceToModelName: { [key in BoardPieces]: keyof GLTFResult["nodes"] } = {
  [BoardPieces.PAWN]: "PawnPiece",
  [BoardPieces.ROOK]: "TowerPiece",
  [BoardPieces.KNIGHT]: "HorsePiece",
  [BoardPieces.BISHOP]: "BishopPiece",
  [BoardPieces.QUEEN]: "QueenPiece",
  [BoardPieces.KING]: "KingPiece",
};

const colorSet = {
  white: 0xf4edd3,
  black: 0x1e2324,
};

const hoveredColor = 0xee33dd;
const selectedColor = 0x22aadd;

const BOARD_SIZE = 30;

const BOARD_SPACES = 8;

const ADDER = BOARD_SIZE / BOARD_SPACES;

const OFFSET = BOARD_SIZE / 2 - ADDER / 2;

export function ChessPiece({
  id,
  piece,
  color,
  position,
}: BaseChessPieceProps) {
  //const [position, setPosition] = useState(position);
  //const [isCaptured, setIsCaptured] = useState(false);

  const [{ pieces, selectedPiece }, setBoardData] = useAtom(boardAtom);
  const [positions] = useAtom(piecePositions);

  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  useCursor(hovered);
  //console.log(`${pieceToModelName[piece]} - RENDER`)

  useEffect(() => {
    if (!selectedPiece) {
      setSelected(false);
      return;
    }

    if (
      positions[selectedPiece.id][0] === position[0] &&
      positions[selectedPiece.id][1] === position[1]
    ) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedPiece]);

  const calculatePossibleMoves = (
    pos: [number, number]
  ): [number, number][] => {
    const isMoveLegal = (move: [number, number]) => {
      if (
        positions.filter((pos) => pos[0] === move[0] && pos[1] === move[1])
          .length
      )
        return;

      return (
        move[0] >= 0 &&
        move[0] < BOARD_SPACES &&
        move[1] >= 0 &&
        move[1] < BOARD_SPACES
      );
    };

    const moves: [number, number][] = [
      [pos[0], pos[1] + (color == "black" ? -1 : 1)],
      [pos[0] + 1, pos[1] + (color == "black" ? -1 : 1)],
      [pos[0] - 1, pos[1] + (color == "black" ? -1 : 1)],
    ];

    return moves.filter((move) => isMoveLegal(move));
  };

  const onPieceSelection = () => {
    setBoardData((prev) => ({
      ...prev,
      selectedPiece: {
        id,
        piece,
        color,
      },
      possibleMoves: calculatePossibleMoves(position),
    }));
  };

  //console.log("RENDER");

  return (
    <>
      <ChessPieceModel
        modelName={pieceToModelName[piece]}
        color={new Color().setHex(
          selected ? selectedColor : hovered ? hoveredColor : colorSet[color]
        )}
        x={OFFSET - ADDER * position[0]}
        z={OFFSET - ADDER * position[1]}
        rotateY={
          piece == BoardPieces.KNIGHT
            ? degToRad(color == "white" ? -90 : 90)
            : 0
        }

        //isCaptured={isCaptured}
        //onMove={(newPosition: [number, number]) => setPosition(newPosition)}
        //onCapture={() => setIsCaptured(true)}
      />
      <mesh
        position={[
          OFFSET - ADDER * position[0],
          2,
          OFFSET - ADDER * position[1],
        ]}
        onClick={(e) => {
          e.stopPropagation();

          onPieceSelection();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        visible={false}
      >
        <cylinderGeometry args={[ADDER / 3.5, ADDER / 3.5, 4, 16]} />
        <meshStandardMaterial wireframe={true} color="red" />
      </mesh>
    </>
  );
}
