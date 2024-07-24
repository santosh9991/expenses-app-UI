import { useContext, useState } from "react"
import './login.css';
import axios from 'axios'
import UserContext from "../utils/UserContex";
import { useNavigate } from "react-router";

const Login = ()=>{
    const [registerUserView, setRegisterUserView] = useState(false);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        name:'',
        email:'',
        password:''
    });
    const {setUserName} = useContext(UserContext);
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setUserInfo({
            ...userInfo,
            [name]:value
        })
    }
    const handleOnsubmit = async (e)=>{
        e.preventDefault();
        try{
            const url = registerUserView?'https://jobs-tracker-api-ry52.onrender.com/api/v1/auth/register':'https://jobs-tracker-api-ry52.onrender.com/api/v1/auth/login'
            const response = await axios.post(url,{
                email: userInfo.email,
                password: userInfo.password,
                ...(registerUserView && { name: userInfo.name })
            });
            const {token, user:{name}} = response.data;
            setUserName(name)
            console.log('Login/Register successful, token:', token);

            // Save the token in localStorage or state
            localStorage.setItem('token', token);
            navigate('/home')
            // Redirect or perform additional actions
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        registerUserView?<div className="register">
        <form onSubmit={handleOnsubmit}>
                <label>UserName</label>
                <input name="name" value={userInfo.name} onChange={handleChange}></input> 
                <label>Email</label>
                <input name="email" value={userInfo.email} onChange={handleChange}></input>
                <label>Password</label>
                <input type="password" name="password" value={userInfo.password} onChange={handleChange}></input>
                <button type="submit"> Register </button>
            </form>
            <div>
                <button onClick={()=>setRegisterUserView(false)}> Login </button>
            </div>
        </div>:<div className="login">
            <form onSubmit={handleOnsubmit}>
                <label>Email</label>
                <input name="email" value={userInfo.email} onChange={handleChange}></input>
                <label>Password</label>
                <input type="password" name="password" value={userInfo.password} onChange={handleChange}></input>
                <button type="submit"> Submit </button>
            </form>
            <div>
                <button onClick={()=>setRegisterUserView(true)}> Register </button>
            </div>
        </div>
    )
}
export default Login;