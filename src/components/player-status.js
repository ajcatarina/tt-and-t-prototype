import React from "react";
import PropTypes from "prop-types";

export default class PlayerStatus extends React.Component {
  static propTypes: {
    name: PropTypes.string,
    chipCount: PropTypes.integer,
    active: PropTypes.boolean.isRequired
  };

  componentDidUpdate() {
    if (this.props.chipCount === 4) {
      setTimeout(() => alert("Hello"));
    }
  }

  render() {
    const { name, chipCount, active } = this.props;
    return (
      <div>
        <h4 style={{ color: active ? "green" : "black" }}>
          {name}: {chipCount}
        </h4>
      </div>
    );
  }
}
