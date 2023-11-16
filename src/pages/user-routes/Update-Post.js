import React from 'react'
import Base from '../../Components/Base'
import {useParams,useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useEffect,useState,useRef } from 'react';
import { loadPostByPostId, updatePostById } from '../../Service/Post-service';
import { toast } from 'react-toastify';
import  JoditEditor from 'jodit-react'
import { loadAllCategories } from '../../Service/Categories-services';
import { Button, Card, CardBody, Container, Form, FormGroup, Input, Label } from 'reactstrap';

function UpdatePost()
 {


  const {postId}=useParams();
  const object=useContext(UserContext)
  const navigate=useNavigate();
  const [post,setPost]=useState(null)
  const [categories,setCategories]=useState(null);
  const editor=useRef(null);

useEffect( ()=>{

  loadAllCategories().then( (data)=>{
    console.log(data);
    setCategories(data)
 }).catch( error=>{
    console.log(error)
 })

  loadPostByPostId(postId).then(
    data=>{
      setPost({...data,categoryId:data.category.categoryId})
      console.log(data)
    }
  ).catch( error=>{
    console.log(error)
    toast.error('error im loading post detials!..')
  });
},[]);


useEffect( ()=>{
  console.log('first',post)
if(post){
  if(post.user.id!== object.user.data.id){
    toast.error('you cannot edit this post')
    navigate("/")
  }
}
},[post])


const handleChange=(event)=>{
  setPost({...post,[event.target.name]:event.target.value })
}

const updatePostForm=(event)=>{
  event.preventDefault();
  console.log(post)
updatePostById({...post,category:{categoryId:post.categoryId}}).then(data=>{
  toast.success('post updated Successfully !..')
}).catch(error=>{
  console.log(error)
  toast.error('error while on updating !..')
})

}


const updateHtml=()=>{
  return (

    <div className='wrapper '>

    <Card className='shadow-sm mt-2'>
        <CardBody>
    <h2 className='text-center'>update post </h2>
     <Form onSubmit={updatePostForm}>
    <FormGroup>
    <Label for='title'>Title</Label>
        <Input  type='text' 
        name='title'
        placeholder='enter here'
        id='title'
        value={post.title}
        className='rounded-0'
        onChange={handleChange}
        />
    
    </FormGroup>
    
    <FormGroup>
    <Label for='content'>Post Content</Label>
     <JoditEditor 
    
        ref={editor}
        value={post.content}
       /* config={config}  --------- optional ------ */
         onChange={newContent=>setPost({...post,content:newContent})}
        />
    </FormGroup>
    
    {/* ---------------- file field ------------ */}
    <FormGroup>
        <Label for='image'>Select Post Image</Label>
        <Input type='file' id='image'
     
        onChange={''}  / >
    </FormGroup>
    
    
    <FormGroup>
    <Label for='category'>Category</Label>
        <Input  type='select' 
        name='categoryId'
        placeholder='enter here'
        id='categoryId'
        className='rounded-0'
      
        value={post.categoryId}
        onChange={handleChange}
        >
    <option disabled value={0}  > ----select category-----</option>
   
    {
    categories?.map( (category)=>(
        <option value={category.categoryId} key={category.categoryId} > {category.categoryTitle} </option>
    ))
    
    }
    
        </Input>
    </FormGroup>
    
    <Container className='text-center'>
    <Button outline color='primary' className='rounded-0' type='submit'> update Post</Button>
    <Button outline color='danger' className='ms-2 rounded-0' > Reset</Button>
    
    
    </Container>
    
            </Form>
        </CardBody>
    </Card>
    
    
       </div>

  )
}


  return (
   <Base>

<Container>
{  post && updateHtml()}
</Container>
   </Base>
  )
}

export default UpdatePost