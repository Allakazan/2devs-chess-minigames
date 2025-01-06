import { atom } from "jotai";

export enum BoardPieces {
  PAWN,
  ROOK,
  KNIGHT,
  BISHOP,
  QUEEN,
  KING,
}

export type BoardPiece = {
  piece: BoardPieces;
  color: "white" | "black";
  position: [number, number];
};

export type BoardAtom = {
  pieces: BoardPiece[];
  selectedPiece: BoardPiece | null;
  possibleMoves: [number, number][]
};

export const boardAtom = atom<BoardAtom>({ pieces: [], selectedPiece: null, possibleMoves: [] });
