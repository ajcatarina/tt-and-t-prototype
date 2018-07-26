import React from "react";

import PlayerStatus from "./player-status";

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
      currentPlayer = this.state.firstPlayerActive ? 1 : 2,
      previousChip = this.state.chips.find(
        chip => chip.owner === currentPlayer
      );

    if (previousChip) {
      if (previousChip.chip !== currentChip) {
        //call reset player chips & chipcount
        this._resetOwnedChips(currentPlayer);
        this.setState({
          firstPlayerActive: !this.state.firstPlayerActive
        });
        return;
      }
    }

    chips[index].disabled = true;
    chips[index].owner = currentPlayer;

    this.setState({
      chips: chips
    });

    this._countOwnedChips(chips[index].owner);
    this._checkWin();
  };

  _resetOwnedChips = player => {
    //create local copy of array
    //set to state array
    let chips = this.state.chips;

    chips.forEach(
      chip =>
        chip.owner === player
          ? ((chip.owner = ""), (chip.disabled = false))
          : ""
    );
    this.setState({ chips: chips });
  };

  _countOwnedChips = player => {
    const count = this.state.chips.filter(chip => chip.owner === player).length;

    const playerUpdate =
      player === 1
        ? { firstPlayer: { chipCount: count } }
        : { secondPlayer: { chipCount: count } };

    this.setState(playerUpdate);
  };

  _checkWin = () => {
    const currentPlayer = this.state.firstPlayerActive ? 1 : 2;
    const count = this.state.chips.filter(chip => chip.owner === currentPlayer)
      .length;
    //disable all
    if (count === 4) {
      this._disableAllChips();
    } else {
      this.setState({
        firstPlayerActive: !this.state.firstPlayerActive
      });
    }
  };

  _disableAllChips = () => {
    let chips = this.state.chips;

    chips.forEach(
      chip => (chip.disabled === false ? (chip.disabled = true) : "")
    );
    this.setState({ chips: chips });
  };

  render() {
    const {
      firstPlayerActive,
      ticTacs,
      toes,
      chips,
      firstPlayer,
      secondPlayer
    } = this.state;

    const defaultC = "transparent";

    return (
      <div>
        <button onClick={this._resetGame}>Reset</button>
        <h3>O = tictac, X = toe</h3>
        <div>
          <button
            style={
              chips[0].owner
                ? { color: chips[0].owner === 1 ? "red" : "blue" }
                : { color: defaultC }
            }
            id={0}
            disabled={chips[0].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {chips[0].chip}
          </button>|
          <button
            style={
              chips[1].owner
                ? { color: chips[1].owner === 1 ? "red" : "blue" }
                : { color: defaultC }
            }
            id={1}
            disabled={chips[1].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {chips[1].chip}
          </button>|
          <button
            style={
              chips[2].owner
                ? { color: chips[2].owner === 1 ? "red" : "blue" }
                : { color: defaultC }
            }
            id={2}
            disabled={chips[2].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {chips[2].chip}
          </button>
        </div>
        <div>
          <button
            style={
              chips[3].owner
                ? { color: chips[3].owner === 1 ? "red" : "blue" }
                : { color: defaultC }
            }
            id={3}
            disabled={chips[3].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {chips[3].chip}
          </button>|
          <button
            style={
              chips[4].owner
                ? { color: chips[4].owner === 1 ? "red" : "blue" }
                : { color: defaultC }
            }
            id={4}
            disabled={chips[4].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {chips[4].chip}
          </button>|
          <button
            style={
              chips[5].owner
                ? { color: chips[5].owner === 1 ? "red" : "blue" }
                : { color: defaultC }
            }
            id={5}
            disabled={chips[5].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {chips[5].chip}
          </button>
        </div>
        <div>
          <button
            style={
              chips[6].owner
                ? { color: chips[6].owner === 1 ? "red" : "blue" }
                : { color: defaultC }
            }
            id={6}
            disabled={chips[6].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {chips[6].chip}
          </button>|
          <button
            style={
              chips[7].owner
                ? { color: chips[7].owner === 1 ? "red" : "blue" }
                : { color: defaultC }
            }
            id={7}
            disabled={chips[7].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {chips[7].chip}
          </button>|
          <button
            style={
              chips[8].owner
                ? { color: chips[8].owner === 1 ? "red" : "blue" }
                : { color: defaultC }
            }
            id={8}
            disabled={chips[8].disabled}
            onClick={e => this._onChipClick(e)}
          >
            {chips[8].chip}
          </button>
        </div>

        <PlayerStatus
          name="Player 1"
          chipCount={firstPlayer.chipCount}
          active={firstPlayerActive ? true : false}
        />
        <PlayerStatus
          name="Player 2"
          chipCount={secondPlayer.chipCount}
          active={!firstPlayerActive ? true : false}
        />
      </div>
    );
  }
}
