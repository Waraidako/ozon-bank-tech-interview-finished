"use client"

import React, { useEffect, useState } from "react";

const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4 ,6]
]

function checkEndgame(field: string[]): string { // returns "X"/"O" for a winner, "T" for a tie, "" for non-endgame
    const winningLine = winningLines.find(([i, j, k]) => {
        return field[i] && field[i] === field[j] && field[i] === field[k]
    })
    if (winningLine) return field[winningLine[0]];
    if (field.every((cell) => cell)) return "T";
    return "";
}

export default function Home() {

  const [turnX, setTurnX] = useState(true);
  const [field, setField] = useState(Array.from({ length: 9 }, () => ""));

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const cell = target.closest(".cell") as HTMLElement | null;
    if (!cell) return;
    const cellIndex = cell.dataset.itemkey;
    if (!cellIndex) return;
    const fieldCopy = Array.from(field);
    fieldCopy[Number(cellIndex)] = turnX ? "X" : "O";
    setField(fieldCopy);
    setTurnX(!turnX);
    }

    useEffect(() => {
        const gameState = checkEndgame(field);
        if (gameState) {
            if (gameState === "T") alert("Tie");
            else alert(`${gameState} won`);
            setTimeout(() => {
                setField(Array.from({ length: 9 }, () => ""));
                setTurnX(true);
            }, 0);
        }
    }, [field]);

    return (
        <div className={"wrapper flex flex-col w-full h-full justify-center items-center"}>
            <div className={"playfield w-[300px] h-[300px] grid grid-cols-3 bg-gray-100"}
                onClick={handleClick}
            >
            {
                field.map((el, index) => {
                return <div
                    key={index}
                    data-itemkey={index}
                    className={"cell w-[100px] h-[100px] border border-gray-500 flex justify-center items-center text-6xl font-bold"}
                >
                    <span className={"mb-2"}>{el}</span>
                </div>
                })
            }
        </div>
      </div>
  );

}
