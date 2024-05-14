import React from "react";
import "./App.css";
import GameLogic from "./Components/GameLogic";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <GameLogic />
      </div>
    );
  }
}
