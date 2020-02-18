import React, { Component } from "react";
import "./App.css";
import ResultComponent from "./components/ResultComponent";
import KeyPadComponent from "./components/KeyPadComponent";

class App extends Component {
  constructor() {
    super();
    this.state = {
      result: "",
      data: 0
    };
  }

  onClick = button => {
    if (button === "=") {
      this.calculate();
    } else if (button === "C") {
      this.reset();
    } else if (button === "CE") {
      this.backspace();
    } else {
      this.setState({
        result: this.state.result + button
      });
    }
  };

  parseCalculationString = s => {
    var calculation = [],
      current = "";
    for (let i = 0, ch; (ch = s.charAt(i)); i++) {
      if ("^*/%+-".indexOf(ch) > -1) {
        if (current == "" && ch == "-") {
          current = "-";
        } else {
          calculation.push(parseFloat(current), ch);
          current = "";
        }
      } else {
        current += s.charAt(i);
      }
    }
    if (current != "") {
      calculation.push(parseFloat(current));
    }
    return calculation;
  };

  calculateVal = calc => {
    // --- Perform a calculation expressed as an array of operators and numbers
    var ops = [
        { "^": (a, b) => Math.pow(a, b) },
        { "%": (a, b) => a % b, "%": (a, b) => a % b },
        { "*": (a, b) => a * b, "/": (a, b) => a / b },
        { "+": (a, b) => a + b, "-": (a, b) => a - b }
      ],
      newCalc = [],
      currentOp;
    for (var i = 0; i < ops.length; i++) {
      for (var j = 0; j < calc.length; j++) {
        if (ops[i][calc[j]]) {
          currentOp = ops[i][calc[j]];
        } else if (currentOp) {
          newCalc[newCalc.length - 1] = currentOp(
            newCalc[newCalc.length - 1],
            calc[j]
          );
          currentOp = null;
        } else {
          newCalc.push(calc[j]);
        }
        console.log(newCalc);
      }
      calc = newCalc;
      newCalc = [];
    }
    if (calc.length > 1) {
      console.log("Error: unable to resolve calculation");
      return calc;
    } else {
      return calc[0];
    }
  };

  calculate = () => {
    var checkResult = "";
    if (this.state.result.includes("--")) {
      checkResult = this.state.result.replace("--", "+");
    } else {
      checkResult = this.state.result;
    }

    console.log(
      this.calculateVal(this.parseCalculationString(this.state.result))
    );
    try {
      // new value
      // end of new value
      this.setState({
        // data: (eval(checkResult) || "0") + ""
        data:
          (this.calculateVal(this.parseCalculationString(this.state.result)) ||
            "0") + ""
      });
    } catch (e) {
      this.setState({
        data: "error"
      });
    }
  };

  reset = () => {
    this.setState({
      result: "",
      data: 0
    });
  };

  backspace = () => {
    this.setState({
      result: this.state.result.slice(0, -1)
    });
  };

  render() {
    return (
      <div>
        <div className="calculator-body">
          <ResultComponent result={this.state.result} data={this.state.data} />
          <KeyPadComponent onClick={this.onClick} />
        </div>
      </div>
    );
  }
}

export default App;
