import React, { Component } from "react";

import "./modalstyles.css";

export default class WelcomModal extends Component {
  closeModalAndStartGame = () => {
    setTimeout(this.props.closeWelcomeModal, 100);
    setTimeout(this.props.startCountDown, 120);
  };

  render() {
    return (
      <div className="modal-container">
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
