import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: null,
      words: []
    }
    this.submitBoard = this.submitBoard.bind(this);
  }

  changeCellValue(x, y, ev) {
    let board = this.state.board;
    board[x][y] = ev.target.value.toLowerCase().substr(0, 1);
    this.setState({ board: board })
  }

  initBoard(ev) {
    let dimension = ev.target.value;
    let board = [];
    for (let i = 0; i < dimension; i++) {
      let row = [];
      for (let j = 0; j < dimension; j++) {
        row.push('');
      }
      board.push(row);
    }

    this.setState({
      board: board,
      words: []
    })
  }

  async submitBoard() {
    let resp = await fetch('/board', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.board)
    })
    let words = await resp.json();
    console.log(words);
    this.setState({ words: words })
  }


  render() {
    let wordList = this.state.words.map((word, i) => {
      return <div className = 'word' key={i} className='word'>{word}</div>
    });

    let board = null;
    if (this.state.board) {
      board = this.state.board.map((col, i) => {
        let row = col.map((cell, j) => {
          // return an input with the onChange bound to the current row, col of the board
          return <input onChange={this.changeCellValue.bind(this, i, j)} type='text' key={j} className='cell' value={cell} />
        })
        return <div key={i} >{row}</div>
      })
    }


    return (

      <div className="App" >
        <header className="App-header">
          <h1 className="App-title">Welcome to Boggle Solver</h1>
          <h1 className="App-author">Rob Thuleen</h1>
        </header>
        <div className='body'>

          <div>
            <span>Enter Board Size: </span>
            <input className = 'board-size' onChange={this.initBoard.bind(this)} />
          </div>
          <div className='buttonRow'>
            <button onClick={this.submitBoard}>Solve</button>
          </div>
          <div className='board'>{board}</div>
          <div className='words'>{wordList}</div>
        </div>

      </div >
    );
  }
}

export default App;
