import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
const Menu=()=>{
    return (
        <div>
          <ListGroup>
          <ListGroupItem  tag="a" action  href="/">Home</ListGroupItem>
            <ListGroupItem tag="a" action  href="/add" >Add Course</ListGroupItem>
            <ListGroupItem>All-Courses</ListGroupItem>
            <ListGroupItem>About</ListGroupItem>

          </ListGroup>
        </div>
    )
}
export default Menu;