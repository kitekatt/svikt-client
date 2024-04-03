import { AppContext } from "../AppContext";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import './SignupLogin.css'

const Login = observer(() => {
   const { user } = useContext(AppContext)
   const navigate = useNavigate()

   // если пользователь авторизован — ему здесь делать нечего
   useEffect(() => {
       if (user.isAdmin) navigate('/admin', {replace: true})
       if (user.isAuth) navigate('/', {replace: true})
   }, [])

   const handleSubmit = async (event) => {
       event.preventDefault()
       const email = event.target.email.value.trim()
       const password = event.target.password.value.trim()
       const data = await login(email, password)
       if (data) {
           user.login(data)
           if (user.isAdmin) navigate('/admin')
           if (user.isAuth) navigate('/')
       }
   }

   return (<div className="body-bg">
      <div className="container">
         <div className="auth-body">
            <h2>Авторизация</h2>

            <div className="inputBody">
               <input type="email" placeholder="Введите Ваш email" value=""/>
               <input type="password" placeholder="Введите Ваш пароль" value=""/>
               <button type="submit">Регистрация</button>
               <p>Нет аккаунта? <Link to="/signup"><h4>зарегистрируйтесь!</h4></Link></p>
            </div>
         </div>
      </div>

   </div>);
})

export default Login;