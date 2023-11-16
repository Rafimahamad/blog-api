
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/SignUp';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UserDashboard from './pages/user-routes/UserDashboard';
import PrivateRoute from './Components/PrivateRoute';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import AddPost from './pages/AddPost';
import PostPage from './pages/user-routes/PostPage';
import UserProvider from './context/UserProvider';
import About from './pages/About';
import Categories from './pages/Categories';
import UpdatePost from './pages/user-routes/Update-Post';



function App() {

  return (
    
    <div> 
 <UserProvider>
   <ToastContainer   position='top-center'/>
   <Router> 
 
    <Routes>
    <Route  path='/' element={<Home/>}/>
    
    <Route  path='/login' element={<Login />}/>
    <Route  path='/signup' element={<Signup />}/>
    <Route path='/about' element={<About /> } />
    <Route  path='/post/:postId'  element={<PostPage/>} />
    <Route  path='/categories/:categoryId'  element={<Categories/>} />

    
 
<Route path="/user" element={<PrivateRoute/>} >
<Route path="dashboard" element={<UserDashboard/>} />
<Route path="profile/:userId" element={<ProfileInfo/>} />
<Route path="addPost" element={<AddPost/>} />
<Route path="update/:postId" element={<UpdatePost />} />


</Route>

    

    </Routes> 
   
       </Router>
       </UserProvider>
    </div>  
   
  );
}

export default App;
