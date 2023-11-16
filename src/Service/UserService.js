import { myAxios } from "./helper"

export const SignUpUser =(user) => {
 return myAxios.post("/user/register",user).then( (response) => response.data );
}


export const login=(loginData) =>{
    return myAxios.post('/user/login',loginData).then( (response)=>response.data);
}

export const getUser=(userId)=>{
    return myAxios.get('/user/'+userId).then( res=>res.data);
}