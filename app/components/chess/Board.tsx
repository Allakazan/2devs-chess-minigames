import { degToRad } from "three/src/math/MathUtils.js";
import { King, Pawn } from "./Pieces";
import { useTexture } from "@react-three/drei";
import { Color, IUniform, RepeatWrapping, Vector2 } from "three";

import boardFrag from "~/shaders/board.frag";
import defaultVert from "~/shaders/default.vert";
import { useMemo } from "react";

export function ChessBoard() {
  /*const textures = useTexture({
    map: "/textures/chess-board.png",
    clearcoatRoughnessMap: "/textures/Fingerprints07_2K.png",
  });
  textures.clearcoatRoughnessMap.repeat.set(1.7, 1.7);
  textures.clearcoatRoughnessMap.wrapS = textures.clearcoatRoughnessMap.wrapT = RepeatWrapping;*/

  const uniforms = useMemo<{ [key: string]: IUniform<any> }>(
    () => ({
      boxPositions: { value: Array(30).fill(new Vector2(0, 0)) },
      boxPositionsLength: { value: 2 },
      paintColor: { value: new Color("#FFE486") },
    }),
    []
  );

  return (
    <>
      <Pawn color="white" initialPosition={[0, 0]} />
      <mesh position={[-1.9, 0, 1.9]} rotation={[degToRad(-90), 0, 0]}>
        <planeGeometry args={[30, 30, 1]} />
        <shaderMaterial vertexShader={defaultVert} fragmentShader={boardFrag} uniforms={uniforms} />
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
