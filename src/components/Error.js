import React from "react";

class Error extends React.Component {
  state = { set: false };

  static getDerivedStateFromError(error) {
    return { set: true };
  }

  render() {
    return !this.state.set ? (
      this.props.children
    ) : (
      <div>
        <h1>Some thing went wrong......</h1>
      </div>
    );
  }
}

export default Error;
