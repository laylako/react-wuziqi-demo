import ChessBoard from './ChessBoard';
import classNames from 'classnames';
import './BoardContainer2.css';

function BoardContainer() {
  const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];

  const NumIndex = (props) => {
    return (
      <div className={classNames({ 'num-contain': true, [props.className]: true })}>
        {arr.map((ele, index) => {
          return <div key={ele}>{index + 1}</div>
        })}
      </div>
    )
  }
  const CharIndex = (props) => {
    return (
      <div className={classNames({ 'char-contain': true, [props.className]: true })}>
        {arr.map((ele) => {
          return <div key={ele}>{ele}</div>
        })}
      </div>
    )
  }

  return (
    <div className='border'>
      <div className='board-contain'>
        <CharIndex className='index-top' />
        <NumIndex className='index-left' />
        <ChessBoard />
        <CharIndex className='index-bottom' />
        <NumIndex className='index-right' />
      </div>
    </div>

  );
}

export default BoardContainer;
