import React from "react";

export default class Board extends React.Component {
  state = {
    firstPlayer: 1,
    ticTacs: 0,
    toes: 0,
    chips: [
      { chip: "", owner: "" },
      { chip: "", owner: "" },
      { chip: "", owner: "" },
      { chip: "", owner: "" },
      { chip: "", owner: "" },
      { chip: "", owner: "" },
      { chip: "", owner: "" },
      { chip: "", owner: "" },
      { chip: "", owner: "" }
    ]
  };

  componentWillMount() {
    //set chip count
    Math.floor(Math.random() * 2 + 1) === 1
      ? this.setState({ ticTacs: 5, toes: 4 }, () => {
          this.setState({
            chips: this._setChips(this.state.ticTacs, this.state.toes, [])
          });
        })
      : this.setState({ ticTacs: 4, toes: 5 }, () =>
          this.setState({
            chips: this._setChips(this.state.ticTacs, this.state.toes, [])
          })
        );
  }

  _shuffleArray = array => {
    if (!Array.isArray(array)) {
      return null;
    }

    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      //pick remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      //swap current element
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  _setChips = (ticTacs, toes, array) => {
    while (0 < ticTacs) {
      array.push({ chip: "X", owner: "" });
      ticTacs--;
    }

    while (0 < toes) {
      array.push({ chip: "O", owner: "" });
      toes--;
    }

    //randomly arrange chips
    this._shuffleArray(array);

    return array;
  };

  _resetGame = () => {
    this.componentWillMount();
  };

  render() {
    return (
      <div>
        <button onClick={this._resetGame}>Reset </button>
        <h3>O = tictac, X = toe</h3>
        <p>
          {this.state.chips[0].chip}|
          {this.state.chips[1].chip}|
          {this.state.chips[2].chip}
        </p>
        <p>
          {this.state.chips[3].chip}|
          {this.state.chips[4].chip}|
          {this.state.chips[5].chip}
        </p>
        <p>
          {this.state.chips[6].chip}|
          {this.state.chips[7].chip}|
          {this.state.chips[8].chip}
        </p>

        <h4>Player 1:</h4>
        <h4>Player 2:</h4>
      </div>
    );
  }
}
