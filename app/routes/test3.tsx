import { useEffect, useRef, useState } from "react";
import { atom, useAtom } from "jotai";
import { motion } from "framer-motion-3d";
import { Canvas } from "@react-three/fiber";
import { CameraControls, Environment, Grid } from "@react-three/drei";

const testAtom = atom<{ x: number; y: number; z: number[] }>({ x: -0.5, y: -0.5, z: [0.5] });

const INCR = 2;

export default function Index() {
  const [test, setTest] = useAtom(testAtom);
  const cameraControlsRef = useRef<CameraControls>(null);

  const triggerAnimation = (prop: "x" | "y", increment: boolean) => {
    setTest((prev) => ({
      ...prev,
      [prop]: increment ? prev[prop] + INCR : prev[prop] - INCR,

      // Workaround for keyframes not animating: Add some random value mutiplied by an small amount
      z: [0.5, 1.4 + Math.random() * 0.0001, 0.5],
    }));
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
        <div>
          X: {test.x}, Y: {test.y}, Z: {test.z[1]}
        </div>
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
        <motion.mesh
          initial={{ x: test.x, y: 0, z: test.y }}
          animate={{
            x: test.x,
            y: test.z,
            z: test.y,
          }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          <boxGeometry args={[1, 2, 1]} />
          <meshStandardMaterial color="red" />
        </motion.mesh>
        <Grid position={[0, -0.5, 0]} args={[20, 20]} />
      </Canvas>
    </div>
  );
}
