import { Component, OnInit } from '@angular/core';
import { CellEnum } from '../CellEnum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private currentPlayer: CellEnum;
  public board: CellEnum[][];
  private isGameOver: boolean;
  public statusMessage;
  public countDraw: number = 0;
  public countYWin: number = 0;
  public countXWin: number = 0;


  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  gameOver(): boolean {
    console.log("caiu aqui?");
    return this.isGameOver;
  }

  newGame()  {
    console.log('new game?');
    this.board = [];
    for (let row = 0; row < 3; row++) {
      this.board[row] = [];
      for (let col = 0; col < 3; col++) {
        this.board[row][col] = CellEnum.EMPITY
      }
    }
    this.currentPlayer = CellEnum.X;
    this.isGameOver = false;
    this.statusMessage = `${this.currentPlayer} player`;
  }

  move(row: number, col: number): void {
    if(!this.isGameOver && this.board[row][col] === CellEnum.EMPITY) {
      this.board[row][col] = this.currentPlayer;
      if(this.isDraw()) {
        this.statusMessage = 'Empatou!';
        this.isGameOver = true;
        this.countDraw++;
      } else if (this.isWin()){
        this.statusMessage = `O ${this.currentPlayer} venceu!`;
        this.isGameOver = true;
        this.currentPlayer === CellEnum.X ? this.countXWin++ : this.countYWin++
      } else {
        this.currentPlayer = this.currentPlayer === CellEnum.X ? CellEnum.O : CellEnum.X;
      }
    }
  }

  isDraw(): boolean {
    for (const columns of this.board) {
      for (const col of columns) {
        if (col === CellEnum.EMPITY)  {
          return false;
        }
      }

    }
    return !this.isWin();
  }

  isWin(): boolean {
      // horizontal
    for (const columns of this.board) {
      if (columns[0] === columns[1] && columns[0] === columns[2] && columns[0] !== CellEnum.EMPITY) {
        return true;
      }
    }

    //vertical
    for (let col = 0; col < this.board[0].length; col++) {
      if (
        this.board[0][col] === this.board[1][col] &&
        this.board[0][col] === this.board[2][col] &&
        this.board[0][col] !== CellEnum.EMPITY
        ) {
          return true;
        }
    }

    // diagonal
    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2] &&
      this.board[0][0] !== CellEnum.EMPITY
    ) {
      return true;
    }

    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[0][2] === this.board[2][2] &&
      this.board[0][2] !== CellEnum.EMPITY
    ) {
      return true;
    }

    return false;
  }
}
