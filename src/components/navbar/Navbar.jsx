import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import { AppContext } from '../AppContext'
import { observer } from 'mobx-react-lite'
import CheckAuth from '../CheckAuth'

import vk from '../../image/header-img/vk.png'
import ok from '../../image/header-img/ok.png'
import pinterest from '../../image/header-img/pinter.png'
import headerIco from '../../image/header-img/sviktIco.png'
import { logout } from '../../http/userApi'

const Navbar = observer(() => {
   const { user, bascet } = useContext(AppContext)

   const handleLogout = (event) => {
      logout()
      user.logout()
      alert('Вы вышли из аккаунта')
  }

   return (<section className='navbar-body'>
      <div className="container">
         <nav className="header-nav">
            <img className="logo" src={headerIco} alt="ico" />

            <div className="navbar-pages">
                     <Link className='nav-link' to="/">главная</Link>
                     <Link className='nav-link' to="/contacts">контакты</Link>
                     <Link className='nav-link' to="/shop">товары</Link>
            </div>
            <div className="social-links">
               <a href="https://vk.com/tvorch_m_svikt" target="_blank"><img src={vk} alt="vk" /></a>
               <a href="https://ok.ru/v.tvorch.m" target="_blank"><img src={ok} alt="ok" /></a>
               <a href="https://ru.pinterest.com/tvorch_m_svikt/" target="_blank"><img src={pinterest} alt="pinterest" /></a>
            </div>

            {user.isAuth ? (
                     <Link className='auth-link' onClick={handleLogout}>выйти</Link>) : (
                     <Link className='auth-link' to="/login" style={{marginRight: 10, color: 'white'}}>войти</Link>
            )}

            {user.isAdmin && (
                     <Link className='admin-link' to="/admin">Панель управления</Link>
            )}
         </nav>
      </div>

   </section>
   );
})

export default Navbar;