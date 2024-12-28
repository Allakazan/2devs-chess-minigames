import { Color } from "three";
import { ChessPieceModel, GLTFResult } from "./ChessPieceModel";

interface BaseChessPieceProps {
  piece: keyof GLTFResult["nodes"];
  color: "white" | "black";
  initialPosition: [number, number];
}

const colorSet = {
  white: 0xf4edd3,
  black: 0x1e2324,
};

export function ChessPiece({ piece, color, initialPosition }: BaseChessPieceProps) {
  //const [position, setPosition] = useState(initialPosition);
  //const [isCaptured, setIsCaptured] = useState(false);

  return (
    <ChessPieceModel
      piece={piece}
      color={new Color().setHex(colorSet[color])}
      //position={position}
      //isCaptured={isCaptured}
      //onMove={(newPosition: [number, number]) => setPosition(newPosition)}
      //onCapture={() => setIsCaptured(true)}
    />
  );
}
