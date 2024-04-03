import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './AppContext';

import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Card from '../pages/Card';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contacts from '../pages/Contacts';
import Admin from '../pages/Admin';
import AdminCards from '../pages/AdminCard';
import NotFound from '../pages/NotFound';

const publicRoutes = [
   { path: '/', Component: Home },
   { path: '/shop', Component: Shop },
   { path: '/card/:id', Component: Card },
   { path: '/login', Component: Login },
   { path: '/signup', Component: Signup },
   { path: '/contacts', Component: Contacts },
   { path: '*', Component: NotFound },
]

const adminRouters = [
   { path: '/admin', Component: Admin },
   { path: '/admin/cards', Component: AdminCards },
]

const AppRouter = () => {
   const { user } = useContext(AppContext)
   return (
      <Routes>
         {publicRoutes.map(({ path, Component }) =>
            <Route key={path} path={path} element={<Component />}></Route>
         )}
         {user.isAdmin && adminRouters.map(({ path, Component }) =>
            <Route key={path} path={path} element={<Component />}></Route>
         )}
      </Routes>
   )
}

export default AppRouter