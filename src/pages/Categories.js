import React from 'react'
import Base from '../Components/Base'
import {useParams} from 'react-router-dom'
import { useEffect ,useState} from 'react';
import { getPostsByCategoryWise } from '../Service/Categories-services';
import { toast } from 'react-toastify';
import { Col, Container, Row } from 'reactstrap';
import CategorySideMenu from '../Components/CategorySideMenu';
import Post from '../Components/Post';
import { deletePostByPostId } from '../Service/Post-service';

function Categories() {
    const {categoryId}=useParams();
    const [posts,setPosts]=useState();

    useEffect( ()=>{
    getPostsByCategoryWise(categoryId).then(
        (data)=>{
            console.log(data)
            setPosts(data)
        } ).catch(error=>{
            toast.error('error in loading posts !..')
            console.log(error)
        })

    },[categoryId])


    function deletePost(post){
        deletePostByPostId(post.postId).then(
          (res)=>{
            toast.success('post deleted successfully !..')
        //    let newPosts= posts.content.filter(p=>p.postId!=post.postId);
        //    setPosts({...posts,content:newPosts}) 
        setPosts(posts.filter((p)=>p.postId!==post.postId))
          } 
          
        ).catch(error=>{
          console.log(error)
          toast.error('post not deleted!..')
        
        })
    }

  return (
    
    <Base>
     <Container className='mt-2' >
        <Row>
            <Col md={3} className='pt-3'>
                <CategorySideMenu />

            </Col>
            <Col md={9} className='pt-3'>
                <h1>post ( {posts?.length})</h1>
                {
                   posts && posts.map( (post,index)=>{
                    return (
                        <Post post={post} key={index} deletePost={deletePost} />
                    )
                   }) 
                 }
                { posts?.length <= 0 ?<h1>No post available in this category </h1>:'' }
            </Col>
        </Row>

     </Container>


    </Base>
  )
}

export default Categories;