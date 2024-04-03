import { useState, useEffect } from 'react'
import { fetchAllCards, deleteCard } from '../http/catalogApi.js'
import { Button, Container, Spinner, Table, Pagination } from 'react-bootstrap'
import CreateCard from '../components/CreateCard.js'
import '../styles/AdminPanel.css'

// количество товаров на страницу
const ADMIN_PER_PAGE = 6

const AdminCards = () => {
   const [cards, setCards] = useState([]) // список загруженных товаров
   const [fetching, setFetching] = useState(true) // загрузка списка товаров с сервера
   const [createShow, setCreateShow] = useState(false) // модальное окно создания товара
   // для обновления списка после добавления, редактирования, удаления — изменяем состояние
   const [change, setChange] = useState(false)
   // id товара, который будем редактировать — для передачи в <UpdateProduct id={…} />
   const [product, setProduct] = useState(null)

   // текущая страница списка товаров
   const [currentPage, setCurrentPage] = useState(1)
   // сколько всего страниц списка товаров
   const [totalPages, setTotalPages] = useState(1)

    // обработчик клика по номеру страницы
    const handlePageClick = (page) => {
        setCurrentPage(page)
        setFetching(true)
    }

    // содержимое компонента <Pagination>
    const pages = []
    for (let page = 1; page <= totalPages; page++) {
        pages.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                activeLabel=""
                onClick={() => handlePageClick(page)}
            >
                {page}
            </Pagination.Item>
        )
    }

    const handleDeleteClick = (id) => {
      deleteCard(id)
          .then(
              data => {
                  // если это последняя страница и мы удаляем на ней единственный
                  // оставшийся товар — то надо перейти к предыдущей странице
                  if (totalPages > 1 && cards.length === 1 && currentPage === totalPages) {
                      setCurrentPage(currentPage - 1)
                  } else {
                      setChange(!change)
                  }
                  alert(`Товар «${data.name}» удален`)
              }
          )
          .catch(
              error => alert(error.response.data.message)
          )
  }

    useEffect(() => {
        fetchAllCards(null, null, currentPage, ADMIN_PER_PAGE)
            .then(
                data => {
                    setCards(data.rows)
                    setTotalPages(Math.ceil(data.count / ADMIN_PER_PAGE))
                }
            )
            .finally(
                () => setFetching(false)
            )
    }, [change, currentPage])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <h1>Товары</h1>
            <Button onClick={() => setCreateShow(true)}>Создать товар</Button>
            <CreateCard show={createShow} setShow={setCreateShow} setChange={setChange} />
            {cards.length > 0 ? (
                <>
                    <Table bordered hover size="sm" className="mt-3">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Фото</th>
                            <th>Категория</th>
                            <th>Тип</th>
                            <th>Цена</th>
                            <th>Описание</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.map(item => 
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    {item.image &&
                                    <a href={process.env.REACT_APP_IMG_URL + item.image} target="_blank">фото</a>}
                                </td>
                                <td>{item.category?.name || 'NULL'}</td>
                                <td>{item.type?.name || 'NULL'}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                                        Удалить
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </Table>
                    {totalPages > 1 && <Pagination>{pages}</Pagination>}
                </>
            ) : (
                <p className='AdminPanel-text'>Список товаров пустой</p>
            )}
        </Container>
    )
}

export default AdminCards