import React, { Component } from "react";
import { LuMonitorPause } from "react-icons/lu";

export default class PauseModal extends Component {
  modalRef = React.createRef();

  swipeOut = () => {
    this.modalRef.current.classList.add("swipe-out");
    setTimeout(this.props.closePaueCountdown, 350);
  };

  resumeCountdown = () => {
    this.swipeOut();
    this.props.startCountDown();
  };
  render() {
    return (
      <div ref={this.modalRef} className="modal-container pause-mode">
        <div className="modal">
          <p className="welcome-text pause-text">
            <LuMonitorPause />
          </p>
          <div className="btn-container">
            <button>
              <div className="start-game" onClick={this.resumeCountdown}>
                Resume Game
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
