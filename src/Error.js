import React from "react";
import Error from "./logo.svg";

export default class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      message: ""
    };
  }
  componentDidCatch(err, errInfo) {
    console.log(err);
    console.log(errInfo);
    this.setState({
      error: true,
      message: errInfo.componentStack.toString()
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div style={styles.errorContainer}>
          <img
            source={Error}
            style={{  height: 150, width: 200 }}
          />
          <span style={{ textAlign: "center", fontSize: 16, padding: 10 }}>
            Something Went Wrong. Try Again Later
          </span>
          {/* {__DEV__ ? ( */}
            <details style={{ textAlign: "center", fontSize: 8, padding: 10 }}>
              {this.state.message}
            </details>
          {/* ) : null} */}
        </div>
      );
    }
    return this.props.children;
  }
}

const styles = {
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};
