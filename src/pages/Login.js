import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'
 
const Login = () => {
   const navigate = useNavigate()
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const {setAuthState} = useContext(AuthContext)
 
   const login = () => {
       const data = { username: username, password: password }
       axios.post("http://localhost:3001/auth/login", data).then((response) => {
           //check if it's error, if not store in sessionstorage
           if (response.data.error) {
             alert(response.data.error);
           } else {
             localStorage.setItem("accessToken", response.data.token)
             setAuthState({
               username: response.data.username,
               id: response.data.id,
               status: true
             })
             navigate("/")
           }
       })
   }
 
 return (
   <div className="loginContainer">
     <label>Username:</label>
     <input type="text" onChange={(e) => {setUsername(e.target.value)}}/>
   
     <label>Password:</label>
     <input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
 
     <button onClick={login}> Login </button>
   </div>
 )
}
 
export default Login
