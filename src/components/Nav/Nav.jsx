import './Nav.css'
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Nav = () => {
return (
    <nav className="navbar">
            <Link to='/'><img src={Logo} alt="Logo" className='logo'/></Link>
            <Link to='/Articles'><button>Articles</button></Link>
        </nav>
)

}

export default Nav;