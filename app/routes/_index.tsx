import type { MetaFunction } from "@remix-run/node";
import { ChessGame } from "~/games/chess/chess.game";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export default function Index() {
  return (
    <ChessGame/>
  );
}