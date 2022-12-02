import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import CreateProduct from './pages/CreateProduct'
import Product from './pages/Product'
import { Routes, Route, Link } from "react-router-dom"
import { AuthContext } from './helpers/AuthContext'
import { useEffect, useState } from 'react'
import { useNavigate } from'react-router-dom'
import axios from 'axios'
 
function App() {
 const navigate = useNavigate()
 
 const [authState, setAuthState] = useState({
   username: "",
   id: 0,
   status: false
 })
 
 useEffect(() => {
   axios.get('http://localhost:3001/auth/auth', {
     headers: {
       accessToken: localStorage.getItem("accessToken")
     }
   })
   .then((response) => {
     if (response.data.error) {
       setAuthState({
         username: "",
         id: 0,
         status: false
       })
     } else {
       setAuthState({
         username: response.data.username,
         id: response.data.id,
         status: true
       })
     }
   })
 },[])
 
 const logout = () => {
   localStorage.removeItem("accessToken")
   setAuthState({
     username: "",
     id: 0,
     status: false
   })
   navigate('/login')
 }
 
 return (
   <div className="App">
     <AuthContext.Provider value={{authState, setAuthState}}>
     <div className="navbar">
     <div className="links">
         {authState.status && (
           <>
             <Link to="/"> Home</Link>
           </>
         )}
         {!authState.status && (
           <>
             <Link to="/login"> Login</Link>
             <Link to="/registration"> Registration</Link>
           </>
         )}
         {authState.username === "admin" && (
           <>
             <Link to="/create-product"> Create Product</Link>
           </>
         )}
       </div>
       <div className="loggedInContainer">
         {authState.status && <h2>Hello, {authState.username}</h2>}
         {authState.status && <button onClick={logout}> Logout</button>}
       </div>
     </div>
     <Routes>
       <Route exact path="/" element={<Home authState={authState}/>} />
       <Route exact path="/login" element={<Login />} />
       <Route exact path="/registration" element={<Registration />} />
       <Route exact path="/create-product" element={<CreateProduct authState={authState}/>} />
       <Route exact path="/products/:id" element={<Product/>} />
     </Routes>
     </AuthContext.Provider>
   </div>
 );
}
 
export default App;
