import { degToRad } from "three/src/math/MathUtils.js";
import { boardAtom, BoardPiece } from "../atoms/board.atom";
import { pieceToComponent } from "./Pieces";
import { useTexture } from "@react-three/drei";
import {
  Color,
  IUniform,
  RepeatWrapping,
  ShaderMaterial,
  Vector2,
} from "three";

import boardFrag from "~/shaders/board.frag";
import defaultVert from "~/shaders/default.vert";
import { useEffect, useMemo, useRef } from "react";
import { useAtom } from "jotai";
import { BoardPosition } from "./BoardPosition";

export function ChessBoard() {
  {
    /*const textures = useTexture({
    map: "/textures/chess-board.png",
    clearcoatRoughnessMap: "/textures/Fingerprints07_2K.png",
  });
  textures.clearcoatRoughnessMap.repeat.set(1.7, 1.7);
  textures.clearcoatRoughnessMap.wrapS = textures.clearcoatRoughnessMap.wrapT = RepeatWrapping;*/
  }

  const shaderMatRef = useRef<ShaderMaterial>(null);
  const [{ pieces, possibleMoves }, setBoardData] = useAtom(boardAtom);

  const formatShaderCoords = ([y, x]: [number, number]) => {
    return new Vector2(9 - (x + 1), y + 1);
  };

  useEffect(() => {
    if (!shaderMatRef.current) return;

    shaderMatRef.current.uniforms.boxes = {
      value: [
        // 30 is the maximum box array length
        ...Array(30 - possibleMoves.length).fill({
          pos: new Vector2(0, 0),
          colorIndex: 0,
          enabled: false,
        }),
        ...possibleMoves.map((move) => ({
          pos: formatShaderCoords(move),
          colorIndex: 0,
          enabled: true,
        })),
      ],
    };
  }, [possibleMoves]);

  const uniforms = useMemo<{ [key: string]: IUniform<any> }>(() => {
    return {
      boxes: {
        value: Array(30).fill({
          pos: new Vector2(0, 0),
          colorIndex: 0,
          enabled: false,
        }),
      },
      colors: {
        value: [
          new Color("#FFE486"),
          new Color("#FFE486"),
          new Color("#FFE486"),
        ],
      },
    };
  }, []);

  const boardInitialize = () => {
    const board = [
      [1, 0, -1, -1, -1, -1, 0, 1],
      [2, 0, -1, -1, -1, -1, 0, 2],
      [3, 0, -1, -1, -1, -1, 0, 3],
      [5, 0, -1, -1, -1, -1, 0, 5],
      [4, 0, -1, -1, -1, -1, 0, 4],
      [3, 0, -1, -1, -1, -1, 0, 3],
      [2, 0, -1, -1, -1, -1, 0, 2],
      [1, 0, -1, -1, -1, -1, 0, 1],
    ];

    setBoardData((prev) => ({
      ...prev,
      pieces: board.flatMap((row, y) =>
        row
          .map((piece, x) => {
            if (piece < 0) return null;

            return {
              piece,
              color: x <= 3 ? "white" : "black",
              position: [y, x],
            };
          })
          .filter((item) => item !== null)
      ) as BoardPiece[],
    }));
  };

  const movePiece = (position: [number, number]) => {
    console.log("Moving a piece");

    setBoardData((prev) => {
      const currentPiece = prev.pieces.findIndex(
        (piece) => JSON.stringify(piece) === JSON.stringify(prev.selectedPiece)
      );

      return {
        ...prev,
        pieces:
          currentPiece === -1
            ? prev.pieces
            : [
                ...prev.pieces.slice(0, currentPiece),
                {
                  ...prev.pieces[currentPiece],
                  position,
                },
                ...prev.pieces.slice(currentPiece + 1),
              ],
        possibleMoves: [],
        selectedPiece: null,
      };
    });
  };

  useEffect(() => {
    //console.log("Putting pieces on the board");
    boardInitialize();
  }, []);

  return (
    <>
      {pieces.map(({ piece, color, position }) => {
        const PieceElement = pieceToComponent[piece];

        return (
          <PieceElement
            key={`${position[0]}-${position[1]}`}
            color={color}
            position={position}
          />
        );
      })}
      {possibleMoves.map((move) => (
        <BoardPosition
          key={`pos-${move[0]}-${move[1]}`}
          move={move}
          onPositionClick={(pos) => movePiece(pos)}
        />
      ))}
      <mesh position={[0, 0, 0]} rotation={[degToRad(-90), 0, degToRad(-90)]}>
        <planeGeometry args={[30, 30, 1]} />
        <shaderMaterial
          ref={shaderMatRef}
          vertexShader={defaultVert}
          fragmentShader={boardFrag}
          uniforms={uniforms}
          needsUpdate={true}
        />
        {/*<meshPhysicalMaterial
          {...textures}
          ior={1.46}
          roughness={0.8}
          clearcoat={0.1}
          clearcoatRoughness={1}
          metalness={0.1}
        />*/}
      </mesh>
    </>
  );
}
