import axios from "axios";
import { getToken } from "../auth";

export const Base_URL='http://localhost:8080/api/';

export const myAxios=axios.create(
   {  baseURL:Base_URL }
);

export const privateAxios=axios.create({
   baseURL:Base_URL
});

privateAxios.interceptors.request.use( 
   (config)=>{
 const token = getToken();

 if(token){
   // config.headers.common.Authorization=`Bearer ${token}`;
   // config.headers['Authorization'] = `Bearer ${token}`;

   config.headers['Authorization']='Bearer '+token
  console.log(config.headers['Authorization']);
  return config;
 } 
 return config;
},
(error) => Promise.reject(error) );



export const  authToken=()=>{
   const token = getToken();

   if(token){
     // config.headers.common.Authorization=`Bearer ${token}`;
     // config.headers['Authorization'] = `Bearer ${token}`;
  console.log(token)
     return { 'Authorization': `Bearer ${token}`};
}
else
return {}
}

// myAxios.post({
//    "data": 'sample',
//   },
 
//   {
//     headers: {
      
//     'Authorization':'Bearer '+getToken(),
//     'Content-Type':'application/json'
//     }
//   })
//   .then((res) => {
//     console.log(res);
//   })