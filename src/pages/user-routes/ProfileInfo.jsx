import React from 'react'
import { useContext } from 'react';
import Base from '../../Components/Base'
import UserContext from '../../context/UserContext';
import {useParams} from 'react-router-dom';
import { getUser } from '../../Service/UserService';
import { Col, Row } from 'reactstrap';

import { useState } from 'react';
import { useEffect } from 'react';
import EditProfile from './EditProfile';
import { toast } from 'react-toastify';


function ProfileInfo() {
  const object=useContext(UserContext);

const {userId}=useParams();
const [user,setUser]=useState(null)



useEffect(()=>{
  console.log(object)
  getUser(userId).then(
    data=>{
      console.log(data)
      setUser({...data})
      
    }
  )
},[])

const userView=()=>{

  return(
   
    <Row>
      <Col md={{size:8,offset:2}}>
     {
(object.user.data.id === user.id) ?
(<EditProfile user={user}/>) : 'you dont have a permission to view this page'
 }
      </Col>
    </Row>
    
  )
}

  return (
    <Base>
   {  user ? userView() :' loading user details..' }
    </Base>
  )
}

export default ProfileInfo;