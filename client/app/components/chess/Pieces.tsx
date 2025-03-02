import { BoardPieces } from "../atoms/board.atom";
import { ChessPiece } from "./ChessPiece";

export interface PieceDefaultProps {
  id: number;
  position: [number, number];
  color: "white" | "black";
}

export function Bishop({ id, color, position }: PieceDefaultProps) {
  return <ChessPiece {...{ id, color, position }} piece={BoardPieces.BISHOP} />;
}

export function Knight({ id, color, position }: PieceDefaultProps) {
  return <ChessPiece {...{ id, color, position }} piece={BoardPieces.KNIGHT} />;
}

export function King({ id, color, position }: PieceDefaultProps) {
  return <ChessPiece {...{ id, color, position }} piece={BoardPieces.KING} />;
}

export function Pawn({ id, color, position }: PieceDefaultProps) {
  return <ChessPiece {...{ id, color, position }} piece={BoardPieces.PAWN} />;
}

export function Queen({ id, color, position }: PieceDefaultProps) {
  return <ChessPiece {...{ id, color, position }} piece={BoardPieces.QUEEN} />;
}

export function Rook({ id, color, position }: PieceDefaultProps) {
  return <ChessPiece {...{ id, color, position }} piece={BoardPieces.ROOK} />;
}

export const pieceToComponent: {
  [key in BoardPieces]: (props: PieceDefaultProps) => JSX.Element;
} = {
  [BoardPieces.PAWN]: Pawn,
  [BoardPieces.ROOK]: Rook,
  [BoardPieces.KNIGHT]: Knight,
  [BoardPieces.BISHOP]: Bishop,
  [BoardPieces.QUEEN]: Queen,
  [BoardPieces.KING]: King,
};
