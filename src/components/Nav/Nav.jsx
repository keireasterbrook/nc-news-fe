import './Nav.css'
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Nav = () => {
return (
    <nav className="navbar">
            <Link to='/'><img src={Logo} alt="Logo" className='logo'/></Link>
            <Link to='/users' className='usersNav'>Users</Link>
        </nav>
)

}

export default Nav;