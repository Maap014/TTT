import React, { Component } from "react";
import "./modalstyles.css";

export default class WelcomModal extends Component {
  modalRef = React.createRef();

  swipeUP = () => {
    this.modalRef.current.classList.add("swipe-up");
    setTimeout(this.props.closeWelcomeModal, 750);
  };

  closeModalAndStartGame = () => {
    this.swipeUP();
    setTimeout(this.props.startCountDown, 800);
  };

  render() {
    return (
      <div ref={this.modalRef} className="modal-container">
        <div className="modal">
          <p className="welcome-text">Welcome aboard!.. Shall we?</p>
          <div className="btn-container">
            <button>
              <div className="start-game" onClick={this.closeModalAndStartGame}>
                Start Game
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
