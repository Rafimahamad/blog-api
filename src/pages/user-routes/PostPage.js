import React from 'react'
import Base from '../../Components/Base'
import { useParams , NavLink as Link} from 'react-router-dom'
import { Card, CardBody, CardHeader, CardText, Col, Container, Input, Row,Button, Label } from 'reactstrap'
import { useEffect } from 'react';
import { createComment, loadPostByPostId } from '../../Service/Post-service';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Base_URL } from '../../Service/helper';
import { isLoggedIn } from '../../auth';


function PostPage() {

  const [post,setPost]=useState();
 const {postId}= useParams();
 const [comment,setComment]=useState({
  content:''
 })
 useEffect(()=>{
//load post from db

loadPostByPostId(postId).then(
  (data)=>{ setPost(data)
  console.log(data);
}).catch(error=>{
  console.error();
  toast.error('error in loading the post ')
})

 },[])


const printDate=(number)=>{
return new Date(number).toLocaleString()
}

const addUrComment=()=>{
  if(!isLoggedIn()){
    toast.error('please login to add ur comments !..')
    return
  }
  if(comment.content.trim()===''){
    toast.error('empty comment not submitted  !')
    return
  }
  console.log(comment)
  createComment(comment,post.postId).then(
    (data)=>{
      console.log(comment)
      toast.success('your comment  added !..')
      setPost( {
        ...post,comments:[...post.comments,data]
      })
      setComment({
        content:''
      })
    }
  ).catch((error)=>{
    console.log(error)
toast.error('something went wrong !..')
  })
}

  return (
   <Base>

   
  <Container className='mt-3 ps-3'>

<Link to='/'>Home</Link>
<Card className='mt-3 border-0 shadow-sm'>
<Row>
  <Col md={  {size:12 }}>
   
  
   {
     (post) && (
      <CardBody>

      <CardHeader>
      posted By <b>{post.user.name}</b> on <b>{ printDate(post.addedDate)}</b>
        </CardHeader>
        <CardText>
          <span className='text-muted'>{post.category.categoryTitle}</span>
        </CardText>
      <CardText tag="h3">
       {post.title}
         </CardText>
<div className="image-container container  mt-3  shadow" style={{width:"40%"}} >
<img   alt="Card cap" className="img-fluid " src={Base_URL+'post/image/'+post.imageName}  />

</div>
<CardText className='mt-4' dangerouslySetInnerHTML={{__html: post.content}}>
 
</CardText>
    </CardBody>
     )


   }


  </Col>
</Row>

{/* ------comment section ------------- */}
<Row className='mt-2'>
<Col md={ { size:9, offset:1 }} >
{
 ( post) && (post.comments.length>0) &&
  (
  <CardHeader tag="h3">Comments({post.comments.length}) </CardHeader>)
  }

{

 (post) && post.comments.map( (c,index)=>(

<Card className="mt-1 border-0" key={index} > 
  <CardBody>
  <CardHeader>{c.content}</CardHeader>
  </CardBody>
</Card>

 ))
}


{/* ---------add comment ------------- */}
<Card className="mt-1 border-0"  > 
  <CardBody>
    <Label>Comments</Label>
 <Input
 name='content' value={comment.content}
 type="textarea"   placeholder='add your comments '
 onChange={(event)=>setComment({content:event.target.value})}
 />
 <Button onClick={addUrComment}>submit</Button>
  </CardBody>
</Card>

</Col > 
</Row>
</Card>
  </Container>
 
   </Base>
  )
}

export default PostPage;