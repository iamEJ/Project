import React, { Component } from "react";
import { Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

class MyToast extends Component {
  render() {
    return (
      <Toast
        className={"rounded-0"}
        show={this.props.show}
        style={{
          position: "absolute",
          top: 60,
          right: 30,
          zIndex: 1,

          borderLeft: "3px solid #28a745",
        }}
      >
        <Toast.Body className="pr-5 ">
          <h6 className="mr-auto text-success m-0 ">
            <FontAwesomeIcon icon={faCheckCircle} /> Success
          </h6>
          <span>{this.props.message}</span>
        </Toast.Body>
      </Toast>
    );
  }
}
export default MyToast;
