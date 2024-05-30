import React, { Component } from "react";
import "./modalstyles.css";

export default class ScoreModal extends Component {
  modalRef = React.createRef();

  swipeUP = () => {
    this.modalRef.current.classList.add("swipe-up");
    setTimeout(this.props.closeWelcomeModal, 750);
  };

  closeModalAndStartGame = () => {
    this.swipeUP();
    setTimeout(this.props.reStartGame, 800);
  };
  render() {
    return (
      <div ref={this.modalRef} className="modal-container">
        <div className="modal score-modal">
          <p className="score-record">
            <span>You scored: {this.props.playerScore}</span>
            <span> Computer scored: {this.props.computerScore}</span>
            <span> Tie score: {this.props.tieScore}</span>
          </p>
          <p style={{ fontWeight: "600" }}>
            {this.props.playerScore > this.props.computerScore
              ? "You win this round!"
              : this.props.computerScore > this.props.tieScore &&
                this.props.computerScore > this.props.playerScore
              ? "Computer wins this round!"
              : "Its a tie!"}
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
