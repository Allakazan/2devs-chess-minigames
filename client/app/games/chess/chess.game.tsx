import { CameraControls, Environment, Html, Stats, useGLTF, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ChessBoard } from "~/components/chess/Board";

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}
export function ChessGame() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <Stats showPanel={0} className="stats" />
      <Suspense fallback={<Loader />}>
        <CameraControls />
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
