import { Link, useNavigate } from 'react-router-dom'
import './header.css'
import { useContext } from 'react';
import UserContext from '../utils/UserContex';
const Header = ()=>{
    const navigate = useNavigate();
    const {setUserName} = useContext(UserContext);
    const onLogoutClickHandler = (e)=>{
        localStorage.setItem('token', '');
        setUserName('');
        navigate('/login')
    }
    return (
        <div className="header">
            <img src='https://st2.depositphotos.com/4428871/9614/v/950/depositphotos_96144580-stock-illustration-expenses-word-cloud.jpg' alt='Expenses'></img>
            <ul>
                <li><Link to='/home'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/expenses'>Expenses</Link></li>
                <li><Link to='/contact'>Contact Us</Link></li>
                <li ><button onClick={onLogoutClickHandler}>Logout</button></li>
            </ul>
        </div>
    )
}

export default Header;