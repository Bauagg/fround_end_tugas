// import image
import logoNavbar from '../../image.componen/FOOTER.png'

// import navbar css
import './navbar.css'

import { Link } from 'react-router-dom'
import { BsFillCartFill } from "react-icons/bs";

const Navbar = () => {
    return (
        <div className='container'>
            <div className='img'>
                <img alt="logo brend" src={logoNavbar} />
            </div>
            <div className='menu'>
                <ul className='lis_menu'>
                    <li><Link className='link' to='/'>Home</Link></li>
                    <li><Link className='link' to='/product'>Product</Link></li>
                    <li><Link className='link' to='/tentang'>Tentang Kami</Link></li>
                </ul>
            </div>
            <div>
                <Link to='/login'>akun saya</Link>
            </div>
            <div>
                <Link><BsFillCartFill /></Link>
            </div>
        </div>
    )
}

export default Navbar