import React, { Suspense } from "react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { atom, useAtom } from "jotai";
import { motion } from "framer-motion-3d";
import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  Environment,
  Grid,
  useCursor,
  useGLTF,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { MotionProps } from "motion/react";

type test2AtomProps = {
  id: number;
  model: keyof GLTFResult["nodes"];
};

const test2Atom = atom<test2AtomProps[]>([
  {
    id: 0,
    model: "PawnPiece",
  },
  {
    id: 1,
    model: "KingPiece",
  },
]);

const test3Atom = atom<{ x: number; y: number; z: number[] }[]>([
  { x: -0.5, y: -0.5, z: [-0.5] },
  { x: -0.5, y: -2.5, z: [-0.5] },
]);

const INCR = 1;

export type GLTFResult = GLTF & {
  nodes: {
    PawnPiece: THREE.Mesh;
    KingPiece: THREE.Mesh;
  };
  materials: { [key: string]: THREE.Material };
};

interface CustomMotionProps extends MotionProps {
  modelName: keyof GLTFResult["nodes"];
  color: THREE.Color;
  x: number;
  y: number[];
  z: number;
}

const ModelObject = ({
  modelName,
  color,
  x,
  y,
  z,
  ...props
}: CustomMotionProps) => {
  const { nodes } = useGLTF(
    `/models/chess_pieces/${modelName.replace("Piece", "").toLowerCase()}.glb`
  ) as GLTFResult;

  console.log(`${modelName} - ${x} - ${y} - ${z}`);

  return (
    <motion.mesh
      {...props}
      scale={0.5}
      initial={{ x, y: 0.5, z }}
      animate={{ x, y, z }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      castShadow={true}
      geometry={nodes[modelName].geometry}
    >
      <meshPhysicalMaterial color={color} roughness={0.2} />
    </motion.mesh>
  );
};

const Model = (test: test2AtomProps) => {
  const [postions] = useAtom(test3Atom);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <>
      <ModelObject
        modelName={test.model}
        color={new THREE.Color().setColorName(hovered ? "blue" : "red")}
        x={postions[test.id].x}
        y={postions[test.id].z}
        z={postions[test.id].y}
      />
      <motion.mesh
        initial={{
          x: postions[test.id].x,
          y: 0.5,
          z: postions[test.id].y,
        }}
        animate={{
          x: postions[test.id].x,
          z: postions[test.id].y,
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        visible={false}
      >
        <cylinderGeometry args={[0.5, 0.5, 2, 16]} />
        <meshStandardMaterial wireframe={true} color="red" />
      </motion.mesh>
    </>
  );
};

export default function Test4() {
  const [tests] = useAtom(test2Atom);
  const [postions, setPostions] = useAtom(test3Atom);
  const cameraControlsRef = useRef<CameraControls>(null);

  const triggerAnimation = (prop: "x" | "y", increment: boolean) => {
    setPostions((prev) =>
      prev.map((p) => ({
        ...p,
        [prop]: increment ? p[prop] + INCR : p[prop] - INCR,
        // Workaround for keyframes not animating: Add some random value mutiplied by an small amount
        z: [-0.5, 0.4 + Math.random() * 0.0001, -0.5],
      }))
    );
  };

  console.log("render");
  useEffect(() => {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.setTarget(0, 0, 0, false);
    }
  }, []);

  return (
    <div style={{ height: "90vh" }}>
      <div className="flex flex-col">
        {postions.map((pos) => (
          <div key={`${JSON.stringify(pos)}`}>
            X: {pos.x}, Y: {pos.y}
          </div>
        ))}
        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => triggerAnimation("x", true)}
          >
            X+
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => triggerAnimation("x", false)}
          >
            X-
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => triggerAnimation("y", true)}
          >
            Y+
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => triggerAnimation("y", false)}
          >
            Y-
          </button>
        </div>
      </div>
      <Canvas camera={{ position: [5, 5, 10], fov: 50 }}>
        <CameraControls ref={cameraControlsRef} />
        <Environment preset="city" environmentIntensity={0.1} />
        <ambientLight intensity={Math.PI / 2} />
        <directionalLight position={[10, 10, 0]} intensity={Math.PI} />
        <Suspense fallback={null}>
          {tests.map((test) => (
            <Model key={JSON.stringify(test)} {...test} />
          ))}
        </Suspense>
        <Grid position={[0, -0.5, 0]} args={[20, 20]} />
      </Canvas>
    </div>
  );
}

useGLTF.preload(`/models/chess_pieces/king.glb`);
