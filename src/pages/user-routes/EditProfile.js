import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Table } from 'reactstrap';
import { getCurrentUser, isLoggedIn } from '../../auth';
import male from '../../img/male.png'

function EditProfile( {user}) {

const [currentUser,setCurrentUser]=useState(null);
const [login,setLogin]=useState(false)


useEffect( ()=>{
setCurrentUser(getCurrentUser());
setLogin(isLoggedIn());
},[])

  return (
  
    <Card className='mt-2'>
         <CardHeader className='text-center' tag={'h3'}>Edit your Profile</CardHeader>
    <CardBody tag={'h6'}>

      <Container className='text-center'>
   
        <img  style={{width:'30%'}} src={male} />

      </Container >
      <Container style={{width:'40%'}} >
    
        <Table responsive  hover >
        <tbody>
      
        <tr>
            <td>User Id</td>
            <td>{user.id}</td>
          </tr>
          <tr>
            <td>User Name</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>email Id</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>about</td>
            <td>{user.about}</td>
          </tr>
          <tr>
            <td>Role</td>
            <td>{user.roles.map( (role=>{
              return ( <span key={role.id}>{role.name}</span>)
            }))}</td>
          </tr>
    
        </tbody>
      </Table>
      </Container>
    </CardBody>

{
    currentUser && (currentUser.id===user.id) ? (<CardFooter className='text-center'>
    <Button color='primary'>update</Button>
</CardFooter> )    :( <h2>please login</h2>)
}

  </Card>
  )
}

export default EditProfile