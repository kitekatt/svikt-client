import { Container} from 'react-bootstrap'
import { Link} from 'react-router-dom'
import '../styles/AdminPanel.css'

const Admin = () => {

    return (
        <Container>
            <h1 className='AdminPanel-h'>Панель управления</h1>
            <p className='AdminPanel-text'>
                <Link className='AdminPanel-text' to="/admin/cards">Товары каталога</Link>
            </p>
        </Container>
    )
}

export default Admin