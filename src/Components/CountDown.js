import React, { Component } from "react";
import WelcomModal from "./Modals/WelcomeModal";
import ScoreModal from "./Modals/ScoreModal";
import { formatTime } from "../utils";
import { FaPause, FaPlay } from "react-icons/fa";
import { MdTimer } from "react-icons/md";

export default class CountDown extends Component {
  state = {
    welcomeModal: true,
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
      clearInterval(this.state.timerCount);
      this.setState({ timerCount: 0 });
      this.props.toggleLockField(false);
    }

    if (this.state.countDown === 0) {
      this.setState({
        countDown: this.props.seconds,
      });
      this.props.resetRecord();
      this.startCountDown();
    }
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
            reStartGame={this.startCountDown}
          />
        ) : (
          this.state.welcomeModal && (
            <WelcomModal
              closeWelcomeModal={() => this.setState({ welcomeModal: false })}
              startCountDown={this.startCountDown}
            />
          )
        )}
        <p className={this.state.countDown < 11 ? "less-time" : "count-down"}>
          <MdTimer />: {formatTime(this.state.countDown)}
        </p>
        <button className="pause-play-btn" onClick={this.startCountDown}>
          {this.state.timerCount === 0 ? <FaPlay /> : <FaPause />}
        </button>
      </>
    );
  }
}
