import React from "react";
import { Navbar,NavbarBrand } from 'reactstrap';
import logo from './../logo.svg'


function Header(){
    return (
        <div>
  <Navbar
    className="my-2 "
    color="dark"
    dark
  >
    <NavbarBrand href="/" >
      <img className="App-logo"
        alt="logo"
        src={logo}
        style={{
          height: 50,
          width: 50
        }}
      />
     <span >React Js Application Courses</span>
    </NavbarBrand>
  </Navbar>

        </div>
    )
}
export default Header;