import React, { Component } from "react";

class ResultComponent extends Component {
  render() {
    let { result, data } = this.props;
    return (
      <div className="result">
        <p>{result}</p>
        <p>{data}</p>
      </div>
    );
  }
}

export default ResultComponent;
