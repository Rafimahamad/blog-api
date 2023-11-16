import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { getCurrentUser, isLoggedIn } from '../auth';
import UserContext from './UserContext'

function UserProvider( {children}) {

    const [user,setUser]=useState({
        data:{},
        login:false
    })
useEffect( ()=>{
  setUser({
    data:getCurrentUser(),
    login:isLoggedIn()
  })
 },[])

  return (
   
    <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>

  )
}

export default UserProvider;
