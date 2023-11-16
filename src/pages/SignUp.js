import Base from "../Components/Base";
import {Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";
import { useEffect, useState } from "react";
import { SignUpUser } from "../Service/UserService";
import { toast } from "react-toastify";




const Signup = () =>{

const [data,setData]=useState({
   name:'',
   'email':'',
  about:'',
   'password':''

});

const [error,setError]=useState({
   errors:{},
   isError:false 
});


// handler
// const handleChange=(event)=>{
//     setData({...data,name:event.target.value})
//     console.log(data)
// }


useEffect( ()=>{
    document.title='Signup';
    // console.log(data)
      },[data])

const handleChange=(event,property)=>{
    setData({...data,[property]:event.target.value})
  
}

// const submitForm=(event)=>{
//     event.preventDefault();
//     console.log(data);
//     //validate data
// if(error.isError){
//     toast.error("Fsa orm data invalid please check");
//     return
// }
// else
//     //send to server
//     axios.post(`http://localhost:8080/register`,data).then(
//         (response)=>{
//             toast.success('Registered Successfully !..',response.id);
//             setData({
//                 name:'',
//                 email:'',
//                 designation:'',
//                 city:'',
//                 state:'',
//                 pincode:'',
//                 password:''
//             })
//         }
//     ).catch( (error)=>{
//         console.log(error);
//         //handle errors
//         setError({
//             errors:error,
//             isError:true
//         })
//     } )

// }



const submitForm=(event)=>{
    event.preventDefault();
    console.log(error,"method called")
// if(error.isError){
//     toast.error("form data is invalid ,check the details ..!")
//     return  }

    //validate


    //call on server
    SignUpUser(data).then( (response)=>{
        console.log(response);
        toast.success("user registered successfully !...."+response.id);
                  setData({
                            name:'',
                            email:'',
                            about:'',
                            password:''
                        })


    }).catch((error)=>{ 
        console.log(error)
        setError({ errors:error,
                        isError:true
                    })
  
                });
}



const resetData=()=>{
    setData({
        name:'',
        email:'',
        designation:'',
        city:'',
        state:'',
        pincode:'',
        password:''
    })
}

    return (
      <Base>
          <Container>
<Row className="mt-4">
    <Col  sm={ {size:4,offset:4}}>
    <Card color="dark" inverse >
        {/* {JSON.stringify(data)} */}
<CardHeader>
    <h3 className="text-center">Register here !</h3>
</CardHeader>

<CardBody>
    {/* ------------------from ----------------*/}
    <Form onSubmit={submitForm}  >
 
{/* name field */}
<FormGroup> 
    <Label for="name">Enter Name</Label>
    <Input 
    type="text" placeholder="enter here" id="name"
    onChange={(e)=>handleChange(e,'name')}
    value={data.name}
    invalid={  error.errors?.response?.data?.name ? true: false }
   
    />  
    <FormFeedback>{  error.errors?.response?.data?.name }</FormFeedback>
</FormGroup>

 

{/* email field */}
 

<FormGroup>
    <Label for="email">Enter email</Label>
    <Input className="form-control"
    type="email" placeholder="enter here" id='email'
    onChange={(e)=>handleChange(e,'email')}
    value={data.email}
    invalid={  error.errors?.response?.data?.email ? true: false }
    />
    <FormFeedback>{  error.errors?.response?.data?.email }</FormFeedback>

</FormGroup>


{/* designation field */}
<FormGroup>
    <Label for="About">About</Label>
    <Input className="form-control"
    type="textarea" placeholder="enter here" id="about"
    onChange={(e)=>handleChange(e,'about')}
    value={data.about}
    invalid={  error.errors?.response?.data?.about ? true: false }
    />
    <FormFeedback>{  error.errors?.response?.data?.about }</FormFeedback>

    
   
</FormGroup>



{/* password field */}
<FormGroup>
    <Label for="password">Enter password</Label>
    <Input className="form-control"
   type="password" placeholder="enter here" id='password'
   onChange={(e)=>handleChange(e,'password')}
   value={data.password}
   invalid={  error.errors?.response?.data?.password ? true: false }
   />
   <FormFeedback>{  error.errors?.response?.data?.password }</FormFeedback>

</FormGroup>

<Container className="text-center">
<Button  outline color="light" type="submit"  className="ms-3">register</Button>
<Button  onClick={resetData} outline color="secondary" type="reset" className="ms-3" >reset</Button>
</Container>
    </Form>
</CardBody>



</Card>
    </Col>
</Row>
      </Container>
      </Base>
    )
}
export default Signup;