import React from "react";
import CountDown from "./CountDown";

class GameLogic extends React.Component {
  state = {
    //this refers to the object which is the consrtuctor, this
    isWinner: false, //this.ref[block + index] is the ref to the dom element with the
    userClick: 0, // paramter passed to the handle click funtion
    computerClick: 0,
    isPlayerTurn: true,
    tieGames: 0,
    computerWin: 0,
    playerWin: 0,
    isClickable: true,
  };
  blockRef = [undefined, ...Array(9)].map(() => React.createRef());

  handleClick = (index) => {
    if (!this.state.isClickable) {
      // after clikced bececomes false
      return;
    }

    // if (this.refs["block" + index].className.length > 0) { //not sure
    //   return;
    // }
    console.log(this.state.isClickable);

    if (this.state.isWinner) {
      // if there is a current winner and i click, dont run function
      return;
    }

    this.blockRef[index].current.className = "x"; //set className
    this.blockRef[index].current.classList.add("x"); // add className
    this.checkForWinner(); //lets go down... chimooo
    this.setState(
      {
        userClick: parseInt(this.state.userClick) + 1,
        isClickable: false,
      },
      () => {
        this.computerTurn(index); // run computer funtion
      }
    );
  };

  resetGame = () => {
    for (let i = 1; i <= 9; i++) {
      this.blockRef[i].current.classList = ""; //loops and sets all block classNamelist to nothing
    }

    this.setState({
      userClick: 0,
      computerClick: 0,
      isWinner: false,
      isClickable: true,
    });
  };

  computerTurn = () => {
    if (this.state.isWinner) {
      //  if there is a current winner comp shouldnt run function
      return;
    }

    let notBlueOrRed = []; // set empty array
    let isAvailable = false;
    for (let i = 1; i <= 9; i++) {
      if (this.blockRef[i].current.className.length === 0) {
        //loop till 9
        notBlueOrRed.push(i); //push i to the new value in the array
        isAvailable = true;
      }
    }

    if (isAvailable) {
      //if isAvailable is true, in 1 sec get a random num from the array 1-9
      setTimeout(() => {
        var randomItem =
          notBlueOrRed[Math.floor(Math.random() * notBlueOrRed.length)];
        this.blockRef[randomItem].current.className = "o";
        this.blockRef[randomItem].current.classList.add("o");
        this.checkForWinner();
        this.setState({
          computerClick: parseInt(this.state.computerClick) + 1,
          isClickable: true,
        });
      }, 1000);
    } else {
      if (!this.state.isWinner) {
        // if no winner, parse and add 1 to tieGames
        this.setState(
          {
            tieGames: parseInt(this.state.tieGames) + 1,
          },
          () => {
            setTimeout(() => {
              this.resetGame();
            }, 2000);
          }
        );
      }
    }
  };

  checkForWinner = () => {
    const combinationCollection = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    combinationCollection.map((data) => {
      // maps through CC and checks if data[index] have a className and if the className are equal to each other
      if (
        this.blockRef[data[0]].current.className &&
        this.blockRef[data[1]].current.className &&
        this.blockRef[data[2]].current.className &&
        this.blockRef[data[0]].current.className.toLowerCase() ===
          this.blockRef[data[1]].current.className.toLowerCase() &&
        this.blockRef[data[1]].current.className.toLowerCase() ===
          this.blockRef[data[2]].current.className.toLowerCase() &&
        this.blockRef[data[2]].current.className.toLowerCase() ===
          this.blockRef[data[0]].current.className.toLowerCase()
      ) {
        this.setState(
          {
            isWinner: true,
            playerWin:
              this.blockRef[data[0]].current.className === "x"
                ? parseInt(this.state.playerWin) + 1
                : this.state.playerWin,
            computerWin:
              this.blockRef[data[0]].current.className === "o"
                ? parseInt(this.state.computerWin) + 1
                : this.state.computerWin,
          },
          () => {
            this.blockRef[data[0]].current.classList.add("blink"); // add styles after win score added
            this.blockRef[data[1]].current.classList.add("blink");
            this.blockRef[data[2]].current.classList.add("blink");
            setTimeout(() => {
              this.resetGame(); // resets game in 2 seconds... up up
            }, 2000);
          }
        );
      }
    });
  };

  render() {
    return (
      <>
        <CountDown seconds={15} />
        <div className="game">
          <div className="board">
            <div
              onClick={() => this.handleClick(1)}
              className="square top left"
            >
              <div className="hello" ref={this.blockRef[1]}></div>
            </div>
            <div onClick={() => this.handleClick(2)} className="square top">
              <div ref={this.blockRef[2]}></div>
            </div>
            <div
              onClick={() => this.handleClick(3)}
              className="square top right"
            >
              <div ref={this.blockRef[3]}></div>
            </div>
            <div onClick={() => this.handleClick(4)} className="square left">
              <div ref={this.blockRef[4]}></div>
            </div>
            <div onClick={() => this.handleClick(5)} className="square">
              <div ref={this.blockRef[5]}></div>
            </div>
            <div onClick={() => this.handleClick(6)} className="square right">
              <div ref={this.blockRef[6]}></div>
            </div>
            <div
              onClick={() => this.handleClick(7)}
              className="square bottom left"
            >
              <div ref={this.blockRef[7]}></div>
            </div>
            <div onClick={() => this.handleClick(8)} className="square bottom">
              <div ref={this.blockRef[8]}></div>
            </div>
            <div
              onClick={() => this.handleClick(9)}
              className="square bottom right"
            >
              <div ref={this.blockRef[9]}></div>
            </div>
          </div>
        </div>
        <div className="scores p1">
          <p className="player1">
            <span className="p1">Player</span>
            <span className="p2">Player 1</span> (<span className="x"></span>)
            <span className="score">{this.state.playerWin}</span>
          </p>
          <p className="ties">
            Tie<span className="score">{this.state.tieGames}</span>
          </p>
          <p className="player2">
            <span className="p1">Computer</span>
            <span className="p2">Player 2</span> (<span className="o"></span>)
            <span className="score">{this.state.computerWin}</span>
          </p>
        </div>
      </>
    );
  }
}

export default GameLogic;
