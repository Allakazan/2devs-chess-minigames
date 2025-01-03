import { Color } from "three";
import { ChessPieceModel, GLTFResult } from "./ChessPieceModel";

interface BaseChessPieceProps {
  piece: keyof GLTFResult["nodes"];
  color: "white" | "black";
  position: [number, number];
}

const colorSet = {
  white: 0xf4edd3,
  black: 0x1e2324,
};

const BOARD_SIZE = 30;

const BOARD_SPACES = 8;

const ADDER = BOARD_SIZE / BOARD_SPACES;

const OFFSET = BOARD_SIZE / 2 - ADDER / 2;

export function ChessPiece({ piece, color, position }: BaseChessPieceProps) {
  //const [position, setPosition] = useState(position);
  //const [isCaptured, setIsCaptured] = useState(false);

  return (
    <ChessPieceModel
      piece={piece}
      color={new Color().setHex(colorSet[color])}
      position={[OFFSET - ADDER * position[0], 0, OFFSET - ADDER * position[1]]}
      //isCaptured={isCaptured}
      //onMove={(newPosition: [number, number]) => setPosition(newPosition)}
      //onCapture={() => setIsCaptured(true)}
    />
  );
}
