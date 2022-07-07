import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import styles from "./App.module.css";
import { useOthers, useUpdateMyPresence } from "./liveblocks.config";

// https://liveblocks.io/docs/get-started/react

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// Object {key: value}
// {
//     x: 1,
//     y: 2
// }

// [x] [] []
// [] [x] []
// [] [] [x]

const DEFAULT_MAP = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

function App() {
  const others = useOthers()
    .toArray()
    .some((user) => user.presence?.isPlayer1);
  const updateMyPresence = useUpdateMyPresence();

  // const CELLS: GridCell[] = [
  //   { x: 0, y: 0 },
  //   { x: 1, y: 0 },
  //   { x: 2, y: 0 },
  //   { x: 0, y: 1 },
  //   { x: 1, y: 1 },
  //   { x: 2, y: 1 },
  //   { x: 0, y: 2 },
  //   { x: 1, y: 2 },
  //   { x: 2, y: 2 },
  // ];
  const [isPlayer1, setIsPlayer1] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [clickMap, setClickMap] = useState<("O" | "X" | undefined)[]>([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  useEffect(() => {
    if (isOver) {
      setClickMap([...DEFAULT_MAP]);
      setIsOver(false);
    }
    console.log("user count is", others);
  }, [isOver, others]);

  const calculateWinner = (res: any) => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const comb = WINNING_COMBINATIONS[i];
      // comb = [0, 1, 2]
      //
      // clickMap = ["0", "X,", undefined, ... "O", "undefined", "X"]
      if (
        res[comb[0]] === res[comb[1]] &&
        res[comb[1]] === res[comb[2]] &&
        res[comb[0]] === res[comb[2]]
      ) {
        if (isPlayer1 && res[comb[0]] === "O") {
          // setClickMap([...DEFAULT_MAP]);
          setIsOver(true);
          alert("Player 1 Wins");
        } else if (!isPlayer1 && res[comb[0]] === "X") {
          // setClickMap([...DEFAULT_MAP]);
          setIsOver(true);
          alert("Player 2 Wins");
        } else {
          alert("no winner");
          setIsOver(true);
        }
      }
    }
  };

  const changeState = (index: number) => {
    const res = [...clickMap];
    // const empty = DEFAULT_MAP;

    if (clickMap[index] === undefined) {
      isPlayer1 ? (res[index] = "O") : (res[index] = "X");
      setClickMap(res);
      calculateWinner(res);
    }
  };

  return (
    <div className={styles.rootWrapper}>
      <div className={styles.root}>
        {clickMap.map((c, index) => (
          <div
            className={styles.gridItem}
            onClick={() => {
              setIsPlayer1(!isPlayer1);
              updateMyPresence({ currentPlayer: isPlayer1 });
              changeState(index);
            }}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
