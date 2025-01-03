import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { motion } from "motion/react";

const testAtom = atom<{ x: number; y: number }>({ x: 40, y: 60 });

const INCR = 60;

export default function Index() {
  const [test, setTest] = useAtom(testAtom);

  console.log("render");
  useEffect(() => {
    //console.log("render");
  }, [test]);

  return (
    <div>
      <div className="flex gap-5">
        X: {test.x}, Y: {test.y}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setTest((prev) => ({ ...prev, x: prev.x + INCR }))}
        >
          X+
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setTest((prev) => ({ ...prev, y: prev.y + INCR }))}
        >
          Y+
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setTest((prev) => ({ ...prev, x: prev.x - INCR }))}
        >
          X-
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setTest((prev) => ({ ...prev, y: prev.y - INCR }))}
        >
          Y-
        </button>
      </div>
      <motion.div
        initial={{ top: 60, left: 40 }}
        animate={{ top: test.y, left: test.x }}
        layout
        className="bg-red-800 w-14 h-14 fixed"
      ></motion.div>
    </div>
  );
}
