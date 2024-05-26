import React, { Component } from "react";
import "./modalstyles.css";

export default class ScoreModal extends Component {
  closeModalAndStartGame = () => {
    setTimeout(this.props.closeWelcomeModal, 100);
    setTimeout(this.props.reStartGame, 120);
  };
  render() {
    return (
      <div className="modal-container">
        <div className="modal score-modal">
          <p className="score-record">
            {`You scored: ${this.props.playerScore}
            Computer scored: ${this.props.computerScore}
            Tie score: ${this.props.tieScore}
            `}
          </p>
          <p>
            {this.props.playerScore > this.props.computerScore
              ? "You win this round!"
              : this.props.computerScore > this.props.tieScore &&
                this.props.computerScore > this.props.playerScore
              ? "Computer wins this round!"
              : "its a tie!"}
          </p>
          <div className="btn-container">
            <button>
              <div className="start-game" onClick={this.closeModalAndStartGame}>
                Restart Game
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
