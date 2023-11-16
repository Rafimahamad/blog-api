import { authToken, myAxios, privateAxios } from "./helper";


export const doCreatePost =(post)=>{

    return privateAxios.post(`/post/user/${post.userId}/category/${post.categoryId}`,post ).then(result => { return result.data } );

    //  return privateAxios.post(`/post/user/${post.userId}/category/${post.categoryId}`,post , { headers:authToken() }).then(result => { return result.data } );

    // return myAxios.post(`/post/user/${post.userId}/category/${post.categoryId}`,post, { headers:authToken() } ).then(result => { return result.data } );

}


export const getAllPosts=(pageNumber,pageSize)=>{

    return myAxios.get(`/post/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((response)=>{ return response.data  });
}

export const loadPostByPostId=(postId)=>{
    return myAxios.get('/post/'+postId).then((response)=>{ return response.data  });
}

export const createComment=(comment,postId)=>{
    return myAxios.post(`/comment/${postId}`,comment).then((response)=>{ return response.data  });
}

export const uploadPostImage=(image,postId)=>{
 let formData = new FormData();
    formData.append("image",image);
    return myAxios.post(`/post/image/upload/${postId}`,formData,{
        headers:{
            'content-Type':'multipart/form-data'
        }
    }).then( (response)=> {return response.data});
}

export  function getPostsByUserId(userId){
    return myAxios.get(`post/user/${userId}`).then( (response)=> {return response.data} )
}

export function deletePostByPostId(postId){
    return myAxios.delete(`post/${postId}`).then( (response)=> {return response.data} )
}

export function updatePostById(post){
    return myAxios.put('/post/'+post.postId,post).then( (response)=> {return response.data} )
}
































