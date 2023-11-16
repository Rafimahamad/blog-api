
import React, { useState } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import logo from './../logo.svg';
import {NavLink as ReactLink ,useNavigate} from "react-router-dom";
import { useEffect ,useContext} from 'react';
import { doLogout, getCurrentUser, isLoggedIn } from '../auth';
import UserContext from '../context/UserContext';


const CustomNavbar =()=>{

    const [collapsed, setCollapsed] = useState(false);

    const userContextData=useContext(UserContext);
    const [login,setLogin]=useState(false);
    const [user,setUser]=useState(undefined);

    const navigate=useNavigate();


useEffect( ()=>{
setLogin(isLoggedIn())
setUser(getCurrentUser())
} ,[login])

const handleLogout=()=>{
doLogout( ()=>{
  setLogin(false);
  userContextData.setUser({
    data:null,
    login:false
  })
  navigate("/")
})

}

    return (
        <div>
        <Navbar color="dark" dark expand="md" fixed='' className='px-5'>
          <NavbarBrand to="/" tag={ReactLink} >
          <img className="App-logo"
        alt="logo"
        src={logo}
        style={{
          height: 50,
          width: 50
        }}
      />
            
             reactstrap</NavbarBrand>

{/* toggle bar */}
          <NavbarToggler onClick={ ()=>setCollapsed(!collapsed)} />

          <Collapse isOpen={collapsed} navbar>

            <Nav className="me-auto" navbar>
              
              <NavItem>
                <NavLink tag={ReactLink} to="/">Home</NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={ReactLink} to="/about"> ContactUs </NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  More
                </DropdownToggle>

                <DropdownMenu right>
                  <DropdownItem tag={ReactLink} to="/user/dashboard">Post article</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>

            <Nav navbar>
              {
               
                login && (
                 <>
                  <NavItem>
                  <NavLink tag={ReactLink} onClick={handleLogout}>Logout</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to={'/user/profile/'+user.id}>{user.email}</NavLink>
                </NavItem>
                 </>
                 
                
                )
              }



           {
                !login && (
                 <>
                  <NavItem>
                <NavLink tag={ReactLink} to="/login">Login</NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={ReactLink} to="/signup"> signUp </NavLink>
              </NavItem>
                 </>
                 
                
                )
              }
          

           
            </Nav>
            <NavbarText></NavbarText>
          </Collapse>
        </Navbar>
      </div>
    )
}
export default CustomNavbar;