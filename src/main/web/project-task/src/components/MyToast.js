import React, { Component } from "react";
import { Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

class MyToast extends Component {
  render() {
    return (
      <Toast
        className={"mt-5"}
        show={this.props.show}
        style={{
          position: "absolute",
          top: 60,
          right: 30,
          zIndex: 1,
        }}
      >
        <Toast.Body className="pr-5 ">
          <span>
            {" "}
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-success"
            />{" "}
            {this.props.message}
          </span>
        </Toast.Body>
      </Toast>
    );
  }
}
export default MyToast;
