import React, { Component } from "react";
import WelcomModal from "./Modals/WelcomeModal";
import ScoreModal from "./Modals/ScoreModal";
import { formatTime } from "../utils";
import { FaPause, FaPlay } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import PauseModal from "./Modals/PauseModal";

export default class CountDown extends Component {
  state = {
    welcomeModal: true,
    pauseModal: false,
    countDown: this.props.seconds,
    timerCount: 0,
  };

  startCountDown = () => {
    if (this.state.timerCount === 0) {
      this.props.toggleLockField(true);
      this.setState({
        timerCount: setInterval(() => {
          this.setState((prev) => ({ countDown: prev.countDown - 1 }));
        }, 1000),
      });
    } else {
      this.pasueCountdown();
    }

    if (this.state.countDown === 0) {
      this.setState({
        countDown: this.props.seconds,
      });
      this.props.resetRecord();
    }
  };

  pasueCountdown = () => {
    clearInterval(this.state.timerCount);
    this.setState({ timerCount: 0, pauseModal: true });
    this.props.toggleLockField(false);
  };

  restartGame = () => {
    clearInterval(this.state.timerCount);
    this.setState(
      {
        countDown: this.props.seconds,
        timerCount: 0,
        pauseModal: false,
      },
      this.startCountDown
    );
    this.props.resetRecord();
    this.props.toggleLockField(true);
  };

  componentDidUpdate() {
    if (this.state.countDown <= 0) {
      clearInterval(this.state.timerCount);
    }
  }

  render() {
    return (
      <>
        {this.state.countDown === 0 ? (
          <ScoreModal
            closeWelcomeModal={() => this.setState({ welcomeModal: false })}
            playerScore={this.props.playerScore}
            computerScore={this.props.computerScore}
            tieScore={this.props.tieScore}
            reStartGame={this.restartGame}
          />
        ) : (
          this.state.welcomeModal && (
            <WelcomModal
              closeWelcomeModal={() => this.setState({ welcomeModal: false })}
              startCountDown={this.startCountDown}
            />
          )
        )}
        {this.state.pauseModal && (
          <PauseModal
            closePaueCountdown={() => this.setState({ pauseModal: false })}
            startCountDown={this.startCountDown}
          />
        )}
        <p className={this.state.countDown < 11 ? "less-time" : "count-down"}>
          <MdTimer />: {formatTime(this.state.countDown)}
        </p>
        <button className="pause-play-btn" onClick={this.startCountDown}>
          {this.state.timerCount === 0 ? (
            <FaPlay />
          ) : (
            <FaPause onClick={this.pasueCountdown} />
          )}
        </button>
      </>
    );
  }
}
