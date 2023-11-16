import React from 'react'
import { isLoggedIn } from '../auth'
import Base from '../Components/Base'
import UserContext from '../context/UserContext'




function About() {
  return (
   
<UserContext.Consumer>
{
    (object)=>(
        <Base>
        <h1>this is about page</h1>
        <p>we are designing blog application</p>
        {/* {console.log(object)}
        <h1>welcome User : { object.user.login && object.user.data.user.name}</h1> */}
{
  isLoggedIn() && 
  (<h1>welcome User : { object.user.login && object.user.data.name}</h1>)
}

        </Base>
    )
}
</UserContext.Consumer>

  )
}

export default About