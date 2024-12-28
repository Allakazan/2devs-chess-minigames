import { atom } from "jotai";

export enum BoardPieces {
  EMPTY,
  WHITE_PAWN,
  BLACK_PAWN,
  WHITE_ROOK,
  BLACK_ROOK,
  WHITE_KNIGHT,
  BLACK_KNIGHT,
  WHITE_BISHOP,
  BLACK_BISHOP,
  WHITE_QUEEN,
  BLACK_QUEEN,
  WHITE_KING,
  BLACK_KING,
}

export type BoardAtom = {
  board: BoardPieces[][];
};

export const boardAtom = atom<BoardAtom>({
  //board: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => BoardPieces.EMPTY)),
  board: [
    [4, 2, 0, 0, 0, 0, 1, 3],
    [6, 2, 0, 0, 0, 0, 1, 5],
    [8, 2, 0, 0, 0, 0, 1, 7],
    [10, 2, 0, 0, 0, 0, 1, 9],
    [12, 2, 0, 0, 0, 0, 1, 11],
    [8, 2, 0, 0, 0, 0, 1, 7],
    [6, 2, 0, 0, 0, 0, 1, 5],
    [4, 2, 0, 0, 0, 0, 1, 3],
  ],
});
