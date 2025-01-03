import { degToRad } from "three/src/math/MathUtils.js";
import { boardAtom, BoardPiece } from "../atoms/board.atom";
import { pieces } from "./Pieces";
import { useTexture } from "@react-three/drei";
import { Color, IUniform, RepeatWrapping, Vector2 } from "three";

import boardFrag from "~/shaders/board.frag";
import defaultVert from "~/shaders/default.vert";
import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";

export function ChessBoard() {
  const textures = useTexture({
    map: "/textures/chess-board.png",
    clearcoatRoughnessMap: "/textures/Fingerprints07_2K.png",
  });
  textures.clearcoatRoughnessMap.repeat.set(1.7, 1.7);
  textures.clearcoatRoughnessMap.wrapS = textures.clearcoatRoughnessMap.wrapT = RepeatWrapping;

  /*const uniforms = useMemo<{ [key: string]: IUniform<any> }>(
    () => ({
      boxes: {
        value: Array(30).fill({ pos: new Vector2(0, 0), colorIndex: 0, enabled: false }),
      },
      colors: { value: [new Color("#FFE486"), new Color("#FFE486"), new Color("#FFE486")] },
    }),
    []
  );*/

  const [boardData, setBoardData] = useAtom(boardAtom);

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

  useEffect(() => {
    console.log("Putting pieces on the board");
    boardInitialize();
  }, []);

  return (
    <>
      {boardData.pieces.map(({ piece, color, position }) => {
        const PieceElement = pieces[piece];

        return (
          <PieceElement key={`${position[0]}-${position[1]}`} color={color} position={position} />
        );
      })}
      <mesh position={[0, 0, 0]} rotation={[degToRad(-90), 0, degToRad(-90)]}>
        <planeGeometry args={[30, 30, 1]} />
        {/*<shaderMaterial vertexShader={defaultVert} fragmentShader={boardFrag} uniforms={uniforms} />*/}
        <meshPhysicalMaterial
          {...textures}
          ior={1.46}
          roughness={0.8}
          clearcoat={0.1}
          clearcoatRoughness={1}
          metalness={0.1}
        />
      </mesh>
    </>
  );
}
