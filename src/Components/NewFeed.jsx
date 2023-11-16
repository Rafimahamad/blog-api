import React,{useEffect} from 'react'
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import { getAllPosts,deletePostByPostId } from '../Service/Post-service'
import Post from './Post';

function NewFeed() {

  const [posts,setPosts]=useState({
    content:[],
    totalElements:'',
    totalPages:'',
    pageSize:'',
    lastPage:false,
    pageNumber:''

  });

  const [currentPage,setCurrentPage]=useState(0)
    
useEffect(()=>{
    //load all posts
    // getAllPosts(0,5).then((data)=>{
    //     console.log(data);
    //     setPosts(data)
      
    // }).catch( error=>{
    //     console.log(error)
    // })
    changePage(currentPage)
  
    
   },[currentPage]);

const changePage=( pageNumber=0,pageSize=5)=>{
 if(pageNumber> posts.pageNumber && posts.lastPage){
  return
 }
 if(pageNumber<posts.pageNumber && posts.pageNumber===0){
  return
 }
  getAllPosts(pageNumber,pageSize).then(
    (data)=>{
      // setPosts(data);
      // window.scroll(0,0)
setPosts({
  content:[...posts.content,...data.content],
  totalPages:data.totalPages,
  totalElements:data.totalElements,
  pageSize:data.pageSize,
  lastPage:data.lastPage,
  pageNumber:data.pageNumber

})

    }
  ).catch( error=>{
    console.log(error)
})

}

function deletePost(post){
  deletePostByPostId(post.postId).then(
    res=>{
      toast.success('post deleted successfully !..')
     let newPosts= posts.content.filter(p=>p.postId!=post.postId)
     setPosts({...posts,content:newPosts})
     
    }
  ).catch(error=>{
    console.log(error)
    toast.error('post not deleted!..')
  
  })

}


const changePageInfinite=()=>{
  console.log('page changed ')
  setCurrentPage(currentPage + 1)
}


  return (
   <div className="container-fluid ">
    <Row>
      <Col md={ {size:13} } >
      
      <h1>Posts ({posts?.totalElements}) </h1>

      <InfiniteScroll 
           dataLength={posts.content?.length}
            next={changePageInfinite}
           hasMore={!posts.lastPage}
           loader={ <h4>loading...</h4>}
           endMessage={
            <p style={{textAlign:'center'}}>
            <b>Hey! you have seen it all</b>
            </p>
           }
           >

      {
        posts.content.map((post)=>(<Post post={post} key={post.postId} deletePost={deletePost} /> ))
      }

      </InfiniteScroll>




{/* 
<Container className='mt-2'>
  <Pagination size='lg'>
    <PaginationItem  onClick={()=>changePage(posts.pageNumber-1)} disabled={posts.pageNumber===0}>
      <PaginationLink previous>
      previous
      </PaginationLink>
    </PaginationItem>
    {
      [...Array(posts.totalPages)].map((item,index) => (

<PaginationItem  onClick={()=>changePage(index,5)}  active={index===posts.pageNumber} key={index}     >
  <PaginationLink>
    {index+1}
  </PaginationLink>
</PaginationItem>

      ))

    }

    <PaginationItem disabled={posts.lastPage} onClick={()=>changePage(posts.pageNumber+1,5)} >
      <PaginationLink next>
          next
      </PaginationLink>
    </PaginationItem>
  </Pagination>

  
</Container> */}

      </Col>
    </Row>
   </div>
  )
}

export default NewFeed