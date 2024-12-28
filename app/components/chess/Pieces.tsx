import { ChessPiece } from "./ChessPiece";

export interface PieceDefaultProps {
  initialPosition: [number, number];
  color: "white" | "black";
}

export function Bishop({ color, initialPosition }: PieceDefaultProps) {
  return <ChessPiece piece="BishopPiece" color={color} initialPosition={initialPosition} />;
}

export function Knight({ color, initialPosition }: PieceDefaultProps) {
  return <ChessPiece piece="HorsePiece" color={color} initialPosition={initialPosition} />;
}

export function King({ color, initialPosition }: PieceDefaultProps) {
  return <ChessPiece piece="KingPiece" color={color} initialPosition={initialPosition} />;
}

export function Pawn({ color, initialPosition }: PieceDefaultProps) {
  return <ChessPiece piece="PawnPiece" color={color} initialPosition={initialPosition} />;
}

export function Queen({ color, initialPosition }: PieceDefaultProps) {
  return <ChessPiece piece="QueenPiece" color={color} initialPosition={initialPosition} />;
}

export function Hook({ color, initialPosition }: PieceDefaultProps) {
  return <ChessPiece piece="TowerPiece" color={color} initialPosition={initialPosition} />;
}
