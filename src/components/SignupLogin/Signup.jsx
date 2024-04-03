import { AppContext } from "../AppContext";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite"
import './SignupLogin.css'

const Signup = observer(() => {
   const { user } = useContext(AppContext)
   const navigate = useNavigate()
   //если пользователь авторизован - ему сюда не нужно
   useEffect(() => {
      if (user.isAdmin) navigate('/admin', { replace: true })
      if (user.isAuth) navigate('/', { replace: true })
   }, [])

   const handleSubmit = async (event) =>{
      event.preventDegault()
      const email = event.target.email.value.trim()
      const password = event.target.password.value.trim()
      const data = await signup(email, password)
      if(data){
         user.login(data)
         if(user.isAdmin) navigate('/admin')
         if(user.isAuth) navigate('/')
      }
   }

   return (<div className="body-bg">
      <div className="container">
         <div className="auth-body">
            <h2>Регистрация</h2>

            <div className="inputBody">
               <input type="email" placeholder="Введите email" value=""/>
               <input type="password" placeholder="Введите пароль" value=""/>
               <button type="submit">Регистрация</button>
               <p>Есть аккаунт? <Link to="/login"><h4>войдите!</h4></Link></p>
            </div>
         </div>
      </div>

   </div>);
})

export default Signup;