import { Color } from "three";
import { ChessPieceModel, GLTFResult } from "./ChessPieceModel";
import { useEffect, useState } from "react";
import { useCursor } from "@react-three/drei";
import { useAtom } from "jotai";
import { boardAtom, BoardPieces } from "../atoms/board.atom";
import { degToRad } from "three/src/math/MathUtils.js";

interface BaseChessPieceProps {
  //piece: keyof GLTFResult["nodes"];
  piece: BoardPieces;
  color: "white" | "black";
  position: [number, number];
}

const pieceToModelName: {[key in BoardPieces]: keyof GLTFResult["nodes"]} = {
  [BoardPieces.PAWN]: 'PawnPiece',
  [BoardPieces.ROOK]: 'TowerPiece',
  [BoardPieces.KNIGHT]: 'HorsePiece',
  [BoardPieces.BISHOP]: 'BishopPiece',
  [BoardPieces.QUEEN]: 'QueenPiece',
  [BoardPieces.KING]: 'KingPiece',
}

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

export function ChessPiece({ piece, color, position }: BaseChessPieceProps) {
  //const [position, setPosition] = useState(position);
  //const [isCaptured, setIsCaptured] = useState(false);

  const [{ selectedPiece }, setBoardData] = useAtom(boardAtom);

  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  
  useCursor(hovered);
  //console.log(`${pieceToModelName[piece]} - RENDER`)

  useEffect(() => {
    if (!selectedPiece) return;

    if (selectedPiece.position[0] === position[0] && selectedPiece.position[1] === position[1]) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedPiece])
  
  const onPieceSelection = () => {
    setBoardData(prev => ({...prev, 
      selectedPiece: {
        piece,
        color,
        position,
      },
      possibleMoves: [
        [position[0], position[1]],
        [position[0], position[1] + (color == 'black' ? -1: 1)],
        [position[0] + 1, position[1] + (color == 'black' ? -1: 1)],
        [position[0] - 1, position[1] + (color == 'black' ? -1: 1)],
      ]
    }))
  }

  return (
    <>
      <ChessPieceModel
        modelName={pieceToModelName[piece]}
        color={new Color().setHex(selected ? selectedColor : hovered ? hoveredColor : colorSet[color])}
        position={[OFFSET - ADDER * position[0], 0, OFFSET - ADDER * position[1]]}
        rotation={[0,piece == BoardPieces.KNIGHT ? degToRad(color == 'white' ? -90 : 90) : 0,0]}

        //isCaptured={isCaptured}
        //onMove={(newPosition: [number, number]) => setPosition(newPosition)}
        //onCapture={() => setIsCaptured(true)}
      />
      <mesh 
        position={[OFFSET - ADDER * position[0], 2, OFFSET - ADDER * position[1]]}
        onClick={e => {
          e.stopPropagation()
          
          onPieceSelection()
        }}
        onPointerOver={e => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={e => {
          e.stopPropagation()
          setHovered(false)
        }}
        visible={false}
      >
        <cylinderGeometry args={[ADDER / 3.5, ADDER / 3.5, 4, 16]} />
        <meshStandardMaterial wireframe={true} color='red' />
      </mesh>
    </>
  );
}
