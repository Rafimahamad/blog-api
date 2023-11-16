import Base from "../Components/Base";
import {Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import { useState ,useEffect,useContext} from "react";
import { toast } from "react-toastify";
import { login } from "../Service/UserService";
import { doLogin } from "../auth";
import { useNavigate} from "react-router-dom"
import UserContext from "../context/UserContext";


const Login = () =>{

const [loginData,setLoginData]=useState(
   { email :'',
    password :''}
)

const userContextData=useContext(UserContext);

const navigate=useNavigate()

useEffect( ()=>{
    document.title='Login';
   
      },[loginData])
const handleLoginForm=(event)=>{

    event.preventDefault();
    if(loginData.email.trim()==='' || loginData.password.trim()==='' ){
        toast.error('userName / password is required')
        return 
    }

    // submit to server

    login(loginData).then((data)=>{ 
      
        console.log(data);
        toast.success('Login Successfully');
// save data to local storage
        doLogin(data ,()=>{
            console.log('login details saved in local storage',data);
            userContextData.setUser({
                data:data.user,
                login:true
            });

            // redirect to dashboard
            navigate("/user/dashboard");
        })

    }).catch( (err)=>{
        console.log(err)
if(err.response.status===404 || err.response.status===400){
    toast.error(err.response.data.message)  
}
else
        toast.error('Something went wrong! ...')
    })
    console.log(loginData)
}


const handleReset=()=>{
    setLoginData(
        { 
            email :'',
        password :''
       })
    }

    return (
      <Base>
      <Container>
<Row className="mt-3">
    <Col  sm={ {size:4,offset:4}}>
    <Card>
<CardHeader>
    <h3 className="text-center" >Login here !</h3>
</CardHeader>

<CardBody>
    <Form  onSubmit={handleLoginForm}>


<FormGroup>
    <Label for="email">email</Label>
    <Input
    type="email"
    name="email"
    placeholder="enter here"
    onChange={(event)=>
         {  setLoginData({...loginData,email:event.target.value}) } }
  />
</FormGroup>

<FormGroup>
    <Label for="password">password</Label>
    <Input
    type="password"
    name="password"
    placeholder="enter here"
onChange={ (e)=>{
    setLoginData( { ...loginData,password:e.target.value} )
}}

  />
</FormGroup>


<Container className="text-center">
    <Button outline color="primary" type="submit">Login</Button>{ '  '}
    <Button outline color="secondary" type="reset"  onClick={handleReset}>Reset</Button>
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
export default Login;