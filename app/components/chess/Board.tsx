import { degToRad } from "three/src/math/MathUtils.js";
import { boardAtom, BoardPieces } from "../atoms/board.atom";
import { pieces } from "./Pieces";
import { useTexture } from "@react-three/drei";
import { Color, IUniform, RepeatWrapping, Vector2 } from "three";

import boardFrag from "~/shaders/board.frag";
import defaultVert from "~/shaders/default.vert";
import { useMemo } from "react";
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
      boxPositions: { value: Array(30).fill(new Vector2(0, 0)) },
      boxPositionsLength: { value: 2 },
      paintColor: { value: new Color("#FFE486") },
    }),
    []
  );*/

  const [boardAtomValue, setBoardAtomValue] = useAtom(boardAtom);

  const pieceLookup = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

  return (
    <>
      {boardAtomValue.board.map((row, posY) =>
        row.map((piece, posX) => {
          if (piece === 0) return <></>;

          const isBlack = piece % 2 === 0;
          const pieceIndex = pieceLookup[piece - 1];

          const Piece = pieces[pieceIndex];

          return (
            <Piece
              key={`${posX}-${posY}`}
              color={isBlack ? "black" : "white"}
              initialPosition={[posY, posX]}
            />
          );
        })
      )}
      <mesh position={[0, 0, 0]} rotation={[degToRad(-90), 0, degToRad(-90)]}>
        <planeGeometry args={[30, 30, 1]} />
        {/*shaderMaterial vertexShader={defaultVert} fragmentShader={boardFrag} uniforms={uniforms} />*/}
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
