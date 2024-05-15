import React, { Component } from "react";

import "./modalstyles.css";

export default class WelcomModal extends Component {
  render() {
    return (
      <div className="modal-container">
        <div className="modal">
          <p className="welcome-text">Welcome aboard!.. Shall we?</p>
          <div className="btn-container">
            <button>
              <div
                className="start-game"
                onClick={() => {
                  setTimeout(this.props.closeWelcomeModal, 100);
                }}
              >
                Start Game
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
