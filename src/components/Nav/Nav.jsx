import './Nav.css'
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { useContext } from 'react';
import { UserContext } from '../Users/Users'

const Nav = () => {
    const { currUser } = useContext(UserContext)
  
return (
    <nav className="navbar">
            <Link to='/'><img src={Logo} alt="Northcoders Logo" className='logo'/></Link>
            <Link to='/users' className='usernameNav'>
                {currUser} is logged in
            </Link>
            <Link to='/users' className='usersNav'>User</Link>
        </nav>
)

}

export default Nav;