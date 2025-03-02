import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { motion } from "framer-motion-3d";
import { MotionProps } from "motion/react";

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

interface CustomMotionProps extends MotionProps {
  modelName: keyof GLTFResult["nodes"];
  color: THREE.Color;
  x: number;
  z: number;
  rotateY: number;
}

export function ChessPieceModel({
  modelName,
  color,
  x,
  z,
  rotateY,
  ...props
}: CustomMotionProps) {
  const { nodes } = useGLTF(
    `${modelPath}/${modelName.replace("Piece", "").toLowerCase()}.glb`
  ) as GLTFResult;

  return (
    <motion.mesh
      {...props}
      initial={{ x, z, rotateY }}
      animate={{ x, z, rotateY }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      castShadow={true}
      geometry={nodes[modelName].geometry}
    >
      <meshPhysicalMaterial color={color} roughness={0.2} />
    </motion.mesh>
  );
}
