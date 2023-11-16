import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Container } from 'reactstrap';
import { getCurrentUser } from "../../auth";
import Base from '../../Components/Base';
import Post from "../../Components/Post";
import AddPost from '../../pages/AddPost';
import { deletePostByPostId, getPostsByUserId } from "../../Service/Post-service";




const UserDashboard =()=>{

const [user,setUser]=useState();
const [posts,setPosts]=useState([]);


useEffect( ()=>{
  setUser(getCurrentUser())
 loadPosts()

},[])

function loadPosts(){
  getPostsByUserId(getCurrentUser().id).then(
    data=>setPosts(data)
  ).catch(error=>{
    console.log(error);
    toast.error('error in loading User Posts')
   })
}

 

function deletePost(post){
  deletePostByPostId(post.postId).then(
    res=>{
      toast.success('post deleted successfully !..')
      loadPosts()
    }
  ).catch(error=>{
    console.log(error)
    toast.error('post not deleted!..')
  
  })

}

    return (
      <Base>
      <Container>
    
      <AddPost/>
      <h2 className="my-3">Post Count : ({posts ?.length}) </h2>
      {
        posts.map((post,index)=>{
          return (
            <Post post={post} key={index}  deletePost={()=>deletePost(post)}/>
          )
        })
      }
     
      </Container>
      </Base>
    )
}
export default UserDashboard;