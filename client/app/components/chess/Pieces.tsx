import { BoardPieces } from "../atoms/board.atom";
import { ChessPiece } from "./ChessPiece";

export interface PieceDefaultProps {
  position: [number, number];
  color: "white" | "black";
}

export function Bishop({ color, position }: PieceDefaultProps) {
  return <ChessPiece piece={BoardPieces.BISHOP} color={color} position={position} />;
}

export function Knight({ color, position }: PieceDefaultProps) {
  return <ChessPiece piece={BoardPieces.KNIGHT} color={color} position={position} />;
}

export function King({ color, position }: PieceDefaultProps) {
  return <ChessPiece piece={BoardPieces.KING} color={color} position={position} />;
}

export function Pawn({ color, position }: PieceDefaultProps) {
  return <ChessPiece piece={BoardPieces.PAWN} color={color} position={position} />;
}

export function Queen({ color, position }: PieceDefaultProps) {
  return <ChessPiece piece={BoardPieces.QUEEN} color={color} position={position} />;
}

export function Rook({ color, position }: PieceDefaultProps) {
  return <ChessPiece piece={BoardPieces.ROOK} color={color} position={position} />;
}

export const pieceToComponent: { [key in BoardPieces]: (props: PieceDefaultProps) => JSX.Element } = {
  [BoardPieces.PAWN]: Pawn,
  [BoardPieces.ROOK]: Rook,
  [BoardPieces.KNIGHT]: Knight,
  [BoardPieces.BISHOP]: Bishop,
  [BoardPieces.QUEEN]: Queen,
  [BoardPieces.KING]: King,
};
