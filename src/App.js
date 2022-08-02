import ChessBoard from './components/ChessBoard';
import './App.css';

const robotImg = require('./assets/robot.png')
const johnImg = require('./assets/John.png')
const whiteImg = require('./assets/white.png')
const blackImg = require('./assets/black.png')

function App() {

  return (
    <div className='main'>
      <div className='game-contain'>
        <div className='avatar-contain'>
          <div className='avatar-div'>
            <img src={robotImg}></img>
            <span className='avatar-span'>Robot</span>
            <img src={blackImg} width={26} height={26}></img>
          </div>
          <div className='avatar-div'>
            <img src={whiteImg} width={24} height={24} className='avatar-border'></img>
            <span className='avatar-span'>John</span>
            <img src={johnImg}></img>
          </div>
        </div>
        <ChessBoard />
      </div>
    </div>
  );
}

export default App;
