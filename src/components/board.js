import React from "react";

export default class Board extends React.Component {
  state = {
    firstPlayerActive: true,
    ticTacs: 0,
    toes: 0,
    chips: [
      { chip: "", owner: "", disabled: false },
      { chip: "", owner: "", disabled: false },
      { chip: "", owner: "", disabled: false },
      { chip: "", owner: "", disabled: false },
      { chip: "", owner: "", disabled: false },
      { chip: "", owner: "", disabled: false },
      { chip: "", owner: "", disabled: false },
      { chip: "", owner: "", disabled: false },
      { chip: "", owner: "", disabled: false }
    ],
    firstPlayer: { chipCount: null },
    secondPlayer: { chipCount: null }
  };

  componentDidMount() {
    this._initialize();
  }

  _initialize = () => {
    this.setState({
      firstPlayerActive: true,
      ticTacs: 0,
      toes: 0,
      chips: [
        { chip: "", owner: "", disabled: false },
        { chip: "", owner: "", disabled: false },
        { chip: "", owner: "", disabled: false },
        { chip: "", owner: "", disabled: false },
        { chip: "", owner: "", disabled: false },
        { chip: "", owner: "", disabled: false },
        { chip: "", owner: "", disabled: false },
        { chip: "", owner: "", disabled: false },
        { chip: "", owner: "", disabled: false }
      ],
      firstPlayer: { chipCount: null },
      secondPlayer: { chipCount: null }
    });

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
  };

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
      array.push({ chip: "X", owner: "", disabled: false });
      ticTacs--;
    }

    while (0 < toes) {
      array.push({ chip: "O", owner: "", disabled: false });
      toes--;
    }

    //randomly arrange chips
    this._shuffleArray(array);

    return array;
  };

  _resetGame = () => {
    this._initialize();
  };

  _onChipClick = e => {
    let chips = this.state.chips;
    const currentChip = e.target.innerHTML,
      index = e.target.id,
      currentUser = this.state.firstPlayerActive ? 1 : 2,
      previousChip = this.state.chips.find(chip => chip.owner === currentUser);

    if (previousChip) {
      if (previousChip.chip !== currentChip) {
        //call reset user chips & chipcount
        this._resetOwnedChips(currentUser);
        this.setState({
          firstPlayerActive: !this.state.firstPlayerActive
        });
        return;
      }
    }

    chips[index].disabled = true;
    chips[index].owner = currentUser;

    this.setState({
      firstPlayerActive: !this.state.firstPlayerActive,
      chips: chips
    });

    this._countOwnedChips(chips[index].owner);
  };

  _resetOwnedChips = user => {
    //create local copy of array
    //set to state array
    let chips = this.state.chips;

    chips.forEach(
      chip =>
        chip.owner === user ? ((chip.owner = ""), (chip.disabled = false)) : ""
    );
    this.setState({ chips: chips });
  };

  _countOwnedChips = user => {
    const count = this.state.chips.filter(chip => chip.owner === user).length;

    const userUpdate =
      user === 1
        ? { firstPlayer: { chipCount: count } }
        : { secondPlayer: { chipCount: count } };

    this.setState(userUpdate, () => {
      if (count === 4) {
        //modal appears
        alert(`Player ${user} wins`);
        //disable all
      }
    });
  };

  render() {
    return (
      <div>
        <button onClick={this._resetGame}>Reset</button>
        <h3>O = tictac, X = toe</h3>
        <div>
          <button
            style={
              this.state.chips[0].owner
                ? { color: this.state.chips[0].owner === 1 ? "red" : "blue" }
                : {}
            }
            id={0}
            disabled={this.state.chips[0].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {this.state.chips[0].chip}
          </button>|
          <button
            style={
              this.state.chips[1].owner
                ? { color: this.state.chips[1].owner === 1 ? "red" : "blue" }
                : {}
            }
            id={1}
            disabled={this.state.chips[1].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {this.state.chips[1].chip}
          </button>|
          <button
            style={
              this.state.chips[2].owner
                ? { color: this.state.chips[2].owner === 1 ? "red" : "blue" }
                : {}
            }
            id={2}
            disabled={this.state.chips[2].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {this.state.chips[2].chip}
          </button>
        </div>
        <div>
          <button
            style={
              this.state.chips[3].owner
                ? { color: this.state.chips[3].owner === 1 ? "red" : "blue" }
                : {}
            }
            id={3}
            disabled={this.state.chips[3].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {this.state.chips[3].chip}
          </button>|
          <button
            style={
              this.state.chips[4].owner
                ? { color: this.state.chips[4].owner === 1 ? "red" : "blue" }
                : {}
            }
            id={4}
            disabled={this.state.chips[4].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {this.state.chips[4].chip}
          </button>|
          <button
            style={
              this.state.chips[5].owner
                ? { color: this.state.chips[5].owner === 1 ? "red" : "blue" }
                : {}
            }
            id={5}
            disabled={this.state.chips[5].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {this.state.chips[5].chip}
          </button>
        </div>
        <div>
          <button
            style={
              this.state.chips[6].owner
                ? { color: this.state.chips[6].owner === 1 ? "red" : "blue" }
                : {}
            }
            id={6}
            disabled={this.state.chips[6].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {this.state.chips[6].chip}
          </button>|
          <button
            style={
              this.state.chips[7].owner
                ? { color: this.state.chips[7].owner === 1 ? "red" : "blue" }
                : {}
            }
            id={7}
            disabled={this.state.chips[7].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {this.state.chips[7].chip}
          </button>|
          <button
            style={
              this.state.chips[8].owner
                ? { color: this.state.chips[8].owner === 1 ? "red" : "blue" }
                : {}
            }
            id={8}
            disabled={this.state.chips[8].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {this.state.chips[8].chip}
          </button>
        </div>

        <h4 style={{ color: this.state.firstPlayerActive ? "green" : "black" }}>
          Player 1: {this.state.firstPlayer.chipCount}
        </h4>
        <h4
          style={{ color: !this.state.firstPlayerActive ? "green" : "black" }}
        >
          Player 2: {this.state.secondPlayer.chipCount}
        </h4>
      </div>
    );
  }
}
