import {
  CameraControls,
  Environment,
  Html,
  Stats,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { ChessBoard } from "~/components/chess/Board";

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}
export function ChessGame() {
  const cameraControlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.setTarget(0, 0, 0, false);
    }
  }, []);

  return (
    <Canvas camera={{ position: [30, 30, 0], fov: 50 }}>
      {/*<Stats showPanel={0} className="stats" />*/}
      <Suspense fallback={<Loader />}>
        <CameraControls ref={cameraControlsRef} />
        <Environment preset="city" environmentIntensity={0.5} />
        <ambientLight intensity={Math.PI / 2} />
        <directionalLight position={[10, 10, 10]} intensity={Math.PI} />
        <ChessBoard />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(`/models/chess_pieces/bishop.glb`);
useGLTF.preload(`/models/chess_pieces/horse.glb`);
useGLTF.preload(`/models/chess_pieces/king.glb`);
useGLTF.preload(`/models/chess_pieces/pawn.glb`);
useGLTF.preload(`/models/chess_pieces/queen.glb`);
useGLTF.preload(`/models/chess_pieces/tower.glb`);
