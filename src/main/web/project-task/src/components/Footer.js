import React, { Component } from 'react';
import { Navbar } from "react-bootstrap";

 class Footer extends Component {
    render() {
        return (
            <div>
                <Navbar
                    expand="lg"
                    fixed="bottom"
                    style={{background:"#fef8f5",marginTop:"50px",color:"#4e4039"}}
                    className="d-flex justify-content-center align-baseline"
                    >
                        <p>&copy; Copyright 2020. All Rights Reserved.</p>
                </Navbar>
            </div>
        )
    }
}

export default Footer;
