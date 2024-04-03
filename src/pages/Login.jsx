import { AppContext } from '../components/AppContext.js'
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Card, Form, Button } from 'react-bootstrap'
import { login } from '../http/userApi.js'
import { observer } from 'mobx-react-lite'
import '../styles/auth.css'

const Login = observer(() => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    // если пользователь авторизован — ему здесь делать нечего
    useEffect(() => {
        if (user.isAdmin) navigate('/', {replace: true})
        if (user.isAuth) navigate('/', {replace: true})
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const email = event.target.email.value.trim()
        const password = event.target.password.value.trim()
        const data = await login(email, password)
        if (data) {
            user.login(data)
            alert("Вы успешно вошли")
            if (user.isAdmin) navigate('/admin')
            if (user.isAuth) navigate('/')
        }
    }

    return (
        <Container className="d-flex justify-content-center">
            <Card style={{width: '50%'}} className="p-2 mt-5 bg-light">
                <h3 className="m-auto auth-title">Авторизация</h3>
                <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <Form.Control
                        name="email"
                        className="mt-3"
                        placeholder="Введите ваш email..."
                    />
                    <Form.Control
                        name="password"
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        type='password'
                    />
                    <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Button className='signBtn' type="submit">
                            Войти
                        </Button>
                        <p className='regLink'>
                            Нет аккаунта?
                            <Link className='singBtn' to="/signup">Зарегистрирутесь!</Link>
                        </p>
                    </div>
                </Form>
            </Card>
        </Container>
    )
})

export default Login