import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import styles from "./App.module.css";

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
  // const others = useOthers()
  //   .toArray()
  //   .some((user) => user.presence?.isPlayer1);

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
  }, [isOver]);

  const calculateWinner = (res: any) => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const comb = WINNING_COMBINATIONS[i];
      // comb = [0, 1, 2]
      //
      // clickMap = ["0", "X,", undefined, ... "O", "undefined", "X"]
      // FIX: added the res[comb[0]] guard so three empty squares can never
      // count as a win, and return true so the caller can skip the tie check.
      if (
        res[comb[0]] &&
        res[comb[0]] === res[comb[1]] &&
        res[comb[1]] === res[comb[2]]
      ) {
        if (isPlayer1 && res[comb[0]] === "O") {
          // setClickMap([...DEFAULT_MAP]);
          setIsOver(true);
          alert("Player 1 Wins");
          return true;
        } else if (!isPlayer1 && res[comb[0]] === "X") {
          // setClickMap([...DEFAULT_MAP]);
          setIsOver(true);
          alert("Player 2 Wins");
          return true;
        }
      }
    }
    return false;
  };
  const tie = (res: any) => {
    let i = 0;
    let count = 0;
    while (i < res.length) {
      if (res[i] !== undefined) {
        count += 1;
      }
      i += 1;
    }
    if (count === 9) {
      alert("no winner");
      setIsOver(true);
    }
  };
  const changeState = (index: number) => {
    const res = [...clickMap];
    // const empty = DEFAULT_MAP;

    if (clickMap[index] === undefined) {
      isPlayer1 ? (res[index] = "O") : (res[index] = "X");
      setClickMap(res);
      // FIX: previously tie() ran even after a win, so a winning 9th move
      // could fire both a win alert and a "no winner" alert.
      const won = calculateWinner(res);
      if (!won) {
        tie(res);
      }
    }
  };

  return (
    <div className={styles.rootWrapper}>
      <div className={styles.root}>
        {clickMap.map((c, index) => (
          <div
            key={index}
            className={styles.gridItem}
            onClick={() => {
              // FIX: previously the turn flipped even on an occupied square,
              // because the toggle ran before changeState() checked it.
              if (clickMap[index] === undefined) {
                setIsPlayer1(!isPlayer1);
                // updateMyPresence({ currentPlayer: isPlayer1 });
                changeState(index);
              }
            }}
          >
            {c}
          </div>
        ))}
      </div>
      <div className={styles.footer}>Made by Tiger Hong</div>
    </div>
  );
}

export default App;
