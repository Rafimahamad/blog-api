import React from 'react'
import { useState ,useEffect,useRef} from 'react';
import { Button, Card, CardBody, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { loadAllCategories } from '../Service/Categories-services';
import  JoditEditor from 'jodit-react'
import { toast } from 'react-toastify';
import { doCreatePost, uploadPostImage } from '../Service/Post-service'
import { getCurrentUser } from '../auth';
import { useNavigate } from 'react-router-dom'

function AddPost() {

    useEffect( ()=>{

        setUser(getCurrentUser())
        loadAllCategories().then( (data)=>{
           console.log(data);
           setCategories(data)
        }).catch( error=>{
           console.log(error)
        })
       },[])


    const editor=useRef(null);
    
    const[content,setContent]=useState('')


    const config={
        placeholder:'start typing'
    }

    const [categories,setCategories]=useState([]);
    const [user,setUser]=useState(undefined);
    const navigate=useNavigate();
    const [image,setImage]=useState()

    const [post,setPost]=useState({
        title:'',
        content:'',
        categoryId:''
    })


    const resetData=()=>{
      setPost(
        {
            title:'',
            content:'',
            categoryId:''
        }
      ) 
    }

// field change

const fieldChanged=(event)=>{
setPost({...post,[event.target.name]:event.target.value})

}

const contentFieldChanged=(data)=>{
setPost({...post,'content':data})
}

const createPost=(event)=>{
    event.preventDefault();
    console.log(post)


if(post.title.trim()==='' || post.content.trim()==='' || post.categoryId.trim()===''){
    toast.error('all fields are required')

    return
}


// creating post
    post['userId']=user.id
    doCreatePost(post).then( data =>{
        uploadPostImage(image,data.postId).then(data=>{
            toast.success('Image uploaded !..')
          }).catch( error=>{toast.error('error in uploading !')
          console.log(error)
         
          }) 

        toast.success('post created .......!');
       
       
    }).catch( (error)=>{
       alert('error');
       console.log(error)
    })

}

const handleFileChange=(event)=>{
console.log(event.target.files[0])
setImage(event.target.files[0])
}


  return (

    <div className='wrapper '>

<Card className='shadow-sm mt-2'>
    <CardBody>
<h2 className='text-center'>Add post </h2>
        <Form  onSubmit={createPost}>

{/* {JSON.stringify(post)} */}
<FormGroup>
<Label for='title'>Title</Label>
    <Input  type='text' 
    name='title'
    placeholder='enter here'
    id='title'
    className='rounded-0'
    onChange={fieldChanged}
    />

</FormGroup>

<FormGroup>
<Label for='content'>Post Content</Label>
    {/* <Input  type='textarea'
   
    name='content' 
    placeholder='enter here'
    id='content'
    className='rounded-0'
    style={{heght:'500px'}}
    /> */}

    <JoditEditor 

    ref={editor}
    value={content}
   /* config={config}  --------- optional ------ */
     onChange={contentFieldChanged}
    />
</FormGroup>

{/* ---------------- file field ------------ */}
<FormGroup>
    <Label for='image'>Select Post Image</Label>
    <Input type='file' id='image'    onChange={handleFileChange}  / >
</FormGroup>


<FormGroup>
<Label for='category'>Category</Label>
    <Input  type='select' 
    name='categoryId'
    placeholder='enter here'
    id='category'
    className='rounded-0'
    onChange={fieldChanged}
    defaultValue={0}
    >
<option disabled value={0} > ----select category-----</option>

{/* <option> general</option>
<option> programming</option>
<option> Mathematics</option>
<option> Financial</option> */}

{
categories.map( (category)=>(
    <option value={category.categoryId} key={category.categoryId} > {category.categoryTitle} </option>
))

}

    </Input>
</FormGroup>

<Container className='text-center'>
<Button outline color='primary' className='rounded-0' type='submit'> Create Post</Button>
<Button outline color='danger' className='ms-2 rounded-0' type='reset'onClick={resetData}> Reset</Button>


</Container>

        </Form>
    </CardBody>
</Card>


   </div>
  )
}

export default AddPost; 