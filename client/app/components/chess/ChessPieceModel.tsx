import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

const modelPath = "/models/chess_pieces";

export type GLTFResult = GLTF & {
  nodes: {
    BishopPiece: THREE.Mesh;
    HorsePiece: THREE.Mesh;
    KingPiece: THREE.Mesh;
    PawnPiece: THREE.Mesh;
    QueenPiece: THREE.Mesh;
    TowerPiece: THREE.Mesh;
  };
  materials: { [key: string]: THREE.Material };
};

export interface ChessPieceProps {
  modelName: keyof GLTFResult["nodes"];
  color: THREE.Color;
}

export function ChessPieceModel({
  modelName,
  color,
  ...props
}: ChessPieceProps & JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF(
    `${modelPath}/${modelName.replace("Piece", "").toLowerCase()}.glb`
  ) as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh castShadow={true} geometry={nodes[modelName].geometry}>
        <meshPhysicalMaterial color={color} roughness={0.2} />
      </mesh>
    </group>
  );
}
