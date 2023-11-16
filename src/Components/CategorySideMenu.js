import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../Service/Categories-services'
import { Link } from 'react-router-dom'


function CategorySideMenu() {
  


   
    useEffect( ()=>{
        loadAllCategories().then( (data)=>{
            setCategories(data)
           
         }).catch( error=>{
            console.log(error)
            toast.error('error in loading categories..!')
         })

    },[])
    const [categories,setCategories]=useState([])
  return (
 <div>
   <ListGroup >

<ListGroupItem action className='border-0' tag={Link} to='/' >
AllBlogs
</ListGroupItem>

{
    (categories) && categories.map( (cat,index)=>{
        return(
            <ListGroupItem tag={Link} to={'/categories/'+cat.categoryId} key={index}>
              {cat.categoryTitle}
            </ListGroupItem>
        )
    })
}


              </ListGroup>
 </div>

  )
}

export default CategorySideMenu