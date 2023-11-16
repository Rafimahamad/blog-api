import React, { useState } from 'react'
import { Button, Card, CardBody, CardText  } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { getCurrentUser, isLoggedIn } from '../auth';
import { toast } from 'react-toastify';
import { deletePostByPostId } from '../Service/Post-service';
import UserContext from '../context/UserContext';
import { useContext } from 'react';



function Post( { post ={id:-1, title:'this is default post',content:'this is default content'}, deletePost } ) {


  const [user,setUser]=useState(null);
  const [login,setLogin]=useState(null);
  const userContextData=useContext(UserContext);


  useEffect( ()=>{
    setUser(getCurrentUser())
    setLogin(isLoggedIn())
 
  },[])

  
 

  return (
   
<Card className='border-0 shadow-sm mt-3'>
    <CardBody>
       {post.title}  
        <CardText dangerouslySetInnerHTML={{__html: post.content.substring(0,32)+'...'}}>
    
        </CardText>
<div>
    <Link to={ '/post/'+post.postId }  className='btn btn-secondary border-0 '>Read More..</Link>

{
login && user.id===post.user.id ?  <Button color='danger'  className='ms-2 border-0' onClick={()=>deletePost(post)}>delete</Button> :''
}
{
login && user.id===post.user.id ?  <Button color='info'  className='ms-2 border-0' tag={Link} to={'/user/update/'+post.postId} >update</Button> :''
}
   
</div>

    </CardBody>


</Card>

  )
}

export default Post