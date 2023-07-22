// import image
import logoNavbar from '../../image.componen/FOOTER.png'

// import navbar css
import navbar from './navbar.module.css'

import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useContext, useState } from 'react';

// inpot di router
import { AutContext } from '../../router';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { state, dispatch } = useContext(AutContext)

    const togle = () => setIsOpen(!isOpen)

    const hendleLogout = () => {
        localStorage.removeItem('jwtToken')

        dispatch({ type: 'LOGOUT' })
    }

    return (
        <div className={navbar.container}>
            <div className={navbar.componen1}>
                <div className={navbar.img}>
                    <img className={navbar.logo} alt="logo brend" src={logoNavbar} />
                </div>
                <div className={navbar.menu}>
                    <ul className={navbar.lis_menu}>
                        <li><Link className={navbar.link_1} to='/'>Home</Link></li>
                        <li><Link className={navbar.link_1} to='/product'>Posting Product</Link></li>
                        <li><Link className={navbar.link_1} to='/tentang'>Tentang Kami</Link></li>
                    </ul>
                </div>
            </div>
            <div className={navbar.componen2}>
                <div onClick={togle}>
                    {state.isAuthenticated ? (
                        <button className={navbar.link_1} onClick={hendleLogout}>
                            <Link to="/login">Logout</Link>
                        </button>
                    ) : (
                        <Link className={navbar.link_1} to='/login'>
                            Akun Saya
                        </Link>
                    )}

                </div>
                <div>
                    <Link className={navbar.link_2} to='/kranjang'><AiOutlineShoppingCart /></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar