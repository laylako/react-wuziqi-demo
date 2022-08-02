import React, { useState, useRef, useEffect } from 'react';
import { checkWin } from '../utils/checkWin';
import { debounce } from '../utils/debounce';
import './ChessBoard.css';
const whiteImg = require('../assets/white.png')
const blackImg = require('../assets/black.png')
const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];

function ChessBoard() {
  const ref = useRef(null);
  const width = window.innerWidth < 544 ? window.innerWidth : 544;

  const [pieces, setPieces] = useState(new Array(15).fill([]).map(() => new Array(15).fill(null)));
  const [isGameOver, setIsGameOver] = useState(false);
  const [roundNum, setRoundNum] = useState(0);

  useEffect(() => {
    drawChessBoard();
  }, [])

  useEffect(() => {
    window.addEventListener("resize", debounce(resizeCanvas,200), false);
    return () => {
      window.removeEventListener('resize', resizeCanvas, false);
    }
  }, [])

  useEffect(() => {
    if (!isGameOver && roundNum !== 0) {
      const [x, y] = random();
      const newPieces = getNewPieces(x, y, false);
      if (newPieces !== null) {
        oneStep(x, y, false);
        setPieces(newPieces);
      }
    }
  }, [roundNum])

  const handleClick = (e) => {
    if (isGameOver) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const width = window.innerWidth < 544 ? window.innerWidth : 544;
    const cellSize = Math.floor(width / 16);
    const x = Math.floor((offsetX - width / (cellSize * 2)) / cellSize);
    const y = Math.floor((offsetY - width / (cellSize * 2)) / cellSize);
    if (x < 0 || y < 0 || x > 14 || y > 14) return;

    const newPieces = getNewPieces(x, y, true);
    if (newPieces !== null) {
      oneStep(x, y, true);
      setRoundNum(roundNum + 1);
      setPieces(newPieces);
    }
  };

  const drawChessBoard = () => {
    const ctx = ref.current.getContext('2d');
    const cellSize = getCellSize();
    for (let i = 0; i < 15; i++) {
      ctx.strokeStyle = '#7A5B2E';
      ctx.lineWidth = 1;
      ctx.moveTo(cellSize + i * cellSize, cellSize);
      ctx.lineTo(cellSize + i * cellSize, cellSize * 15);
      ctx.stroke();
      ctx.moveTo(cellSize, cellSize + i * cellSize);
      ctx.lineTo(cellSize * 15, cellSize + i * cellSize);
      ctx.stroke();
    }
    ctx.textAlign = "center";
    for (let i = 0; i < 15; i++) {
      ctx.fillText(arr[i], cellSize + i * cellSize, cellSize / 1.9);
      ctx.fillText(arr[i], cellSize + i * cellSize, 15 * cellSize + cellSize / 1.9);
      ctx.fillText(15 - i, cellSize / 1.9, 1.1 * cellSize + i * cellSize);
      ctx.fillText(15 - i, 15 * cellSize + cellSize / 1.9, 1.1 * cellSize + i * cellSize);
    }
  }

  const oneStep = (x, y, isWhite) => {
    const cellSize = getCellSize();
    const piecesSize = cellSize * 0.8;
    const ctx = ref.current.getContext('2d');
    const img = document.createElement("img");
    img.src = isWhite ? whiteImg : blackImg;
    setTimeout(() => {
      ctx.drawImage(img, (1 + x) * cellSize - piecesSize / 2, (1 + y) * cellSize - piecesSize / 2, piecesSize, piecesSize);
    }, 100);
  }

  const drawMarker = (arr) => {
    const cellSize = getCellSize();
    setTimeout(() => {
      const ctx = ref.current.getContext('2d');
      ctx.fillStyle = "red";
      ctx.font = '10px Arial';
      ctx.textAlign = "center";
      arr.forEach(ele => {
        const { x, y } = ele;
        ctx.fillText("✚", (1 + x) * cellSize, 3 + (1 + y) * cellSize);
      });
    }, 300)
  }

  const drawSteps = () => {
    for (let x = 0; x < pieces.length; x++) {
      const ele = pieces[x];
      for (let y = 0; y < pieces.length; y++) {
        const val = ele[y];
        if (val === 1 || val === 2) {
          oneStep(x, y, val == 1);
        }
      }
    }
  }

  const random = () => {
    const x = Math.floor(Math.random() * (15));
    const y = Math.floor(Math.random() * (15));
    if (pieces[x][y] == null) {
      return [x, y];
    } else {
      return random();
    }
  }

  const getCellSize = () => {
    const width = window.innerWidth < 544 ? window.innerWidth : 544;
    return Math.floor(width / 16);
  }

  const getNewPieces = (x, y, isWhite) => {
    const newPieces = [...pieces];
    const col = [...newPieces[x]];
    if (col[y] == null) {
      col[y] = isWhite ? 1 : 2;
      newPieces[x] = col;
      isWin(newPieces, x, y);
      return newPieces;
    }
    return null;
  }

  const isWin = (arr, x, y) => {
    const resArr = checkWin(arr, x, y)
    if (resArr.length === 5) {
      setIsGameOver(true);
      drawMarker(resArr);
    }
  }

  function resizeCanvas() {
    const w = window.innerWidth;
    if (w < 544) {
      ref.current.width = w;
      ref.current.height = w;
      drawChessBoard();
      drawSteps();
    }
  }

  return (
    <div className='border'>
      <div className='board-contain'>
        <div className='board'>
          <canvas ref={ref} width={width} height={width} onClick={handleClick}>
            您的浏览器不支持canvas，请更换浏览器.
          </canvas>
        </div>
      </div>
    </div>

  );
}

export default React.memo(ChessBoard);
