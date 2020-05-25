import React, { Component } from 'react';
import { Navbar, Nav,Button, Form,FormControl } from "react-bootstrap";

 class Footer extends Component {
    render() {
        return (
            <div style={{background:"#fef8f5",marginTop:"50px",color:"#4e4039"}} className="d-flex justify-content-center align-baseline">
                <Navbar expand="lg" sticky="bottom" >
                   
                    <p>&copy; Copyright 2020. All Rights Reserved.</p>

                
                </Navbar>
            </div>
        )
    }
}

export default Footer;
