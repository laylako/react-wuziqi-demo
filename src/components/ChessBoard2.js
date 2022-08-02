import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { checkWin } from '../utils/checkWin';
import './ChessBoard2.css';

function ChessBoard() {
  const boardSize = Array(15 * 15).fill(null);

  const [pieces, setPieces] = useState(new Array(15).fill([]).map(() => new Array(15).fill(null)));
  const [roundNum, setRoundNum] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [marker, setMarker] = useState(new Array(15).fill([]).map(() => new Array(15).fill(null)));

  useEffect(() => {
    !isGameOver && roundNum !== 0 && setTimeout(() => {
      const newPieces = getNewPieces(random(15), random(15), false);
      newPieces && setPieces(newPieces);
    }, 500)
  }, [roundNum])

  const handleClick = (x, y) => {
    if (isGameOver) return;
    const newPieces = getNewPieces(x, y, true);
    if (newPieces !== null) {
      setRoundNum(roundNum + 1);
      setPieces(newPieces);
    }
  };

  const getNewPieces = (x, y, isBlack) => {
    const newPieces = [...pieces];
    const col = [...newPieces[x]];
    if (col[y] == null) {
      col[y] = isBlack ? 1 : 2;
      newPieces[x] = col;
      isWin(newPieces, x, y);
      return newPieces;
    } else {
      if (isBlack) {
        return null;
      } else {
        return getNewPieces(random(15), random(15), false);
      }
    }

  }

  const random = (n) => {
    return Math.floor(Math.random() * (n));
  }

  const isWin = (arr, x, y) => {
    const resArr = checkWin(arr, x, y)
    if (resArr.length === 5) {
      setIsGameOver(true);

      const newMaker = [...marker];
      resArr.forEach(item => {
        const { x, y } = item;
        const col = [...newMaker[x]];
        col[y] = true;
        newMaker[x] = col;
      })
      setMarker(newMaker);
    }
  }

  return (
    <div className='board'>
      {boardSize.map((ele, index) => {
        const indexY = Math.floor(index / 15)
        const indexX = index % 15;
        return (
          <div className={classNames({ 'board-cell': true, 'first-col': indexX === 0, 'first-row': indexY === 0, 'last-col': indexX === 14, 'last-row': indexY === 14 })} key={`${indexX}+${indexY}`}>
            <div className='cell-click' onClick={() => handleClick(indexX, indexY)}>
              {pieces[indexX][indexY] && (pieces[indexX][indexY] === 1
                ? <div className='main-cell-black'></div>
                : <div className='main-cell-white'></div>)}
            </div>
            {marker[indexX][indexY] && <span className='red-marker'>✚</span>}
          </div>
        )
      })}
    </div>
  );
}

export default React.memo(ChessBoard);
