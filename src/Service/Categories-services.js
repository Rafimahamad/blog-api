import { myAxios } from "./helper";

export const loadAllCategories=()=> {
 return myAxios.get('/categories/').then(response=>{ return response.data})
}

export const getPostsByCategoryWise=(categoryId)=>{
    return myAxios.get(`/post/category/${categoryId}`).then(response=>{ return response.data});
}