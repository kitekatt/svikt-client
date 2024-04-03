import { Container, Row, Col, Spinner } from 'react-bootstrap'
import CategoryBar from '../components/CategoryBar.js'
import TypeBar from '../components/TypeBar.js'
import CardList from '../components/CardList.js'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../components/AppContext.js'
import { fetchCategories, fetchTypes, fetchAllCards } from '../http/catalogApi.js'
import { observer } from 'mobx-react-lite'
import { useLocation, useSearchParams } from 'react-router-dom'

const getSearchParams = (searchParams) => {
    let category = searchParams.get('category')
    if (category && /[1-9][0-9]*/.test(category)) {
        category = parseInt(category)
    }
    let type = searchParams.get('type')
    if (type && /[1-9][0-9]*/.test(type)) {
        type = parseInt(type)
    }
    let page = searchParams.get('page')
    if (page && /[1-9][0-9]*/.test(page)) {
        page = parseInt(page)
    }
    return { category, type, page }
}

const Shop = observer(() => {
    const { catalog } = useContext(AppContext)

    const [categoriesFetching, setCategoriesFetching] = useState(true)
    const [typesFetching, setTypesFetching] = useState(true)
    const [cardsFetching, setCardsFetching] = useState(true)

    const location = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        fetchCategories()
            .then(data => catalog.categories = data)
            .finally(() => setCategoriesFetching(false))

        fetchTypes()
            .then(data => catalog.types = data)
            .finally(() => setTypesFetching(false))

        const { category, type, page } = getSearchParams(searchParams)
        catalog.category = category
        catalog.type = type
        catalog.page = page ?? 1

        fetchAllCards(catalog.category, catalog.type, catalog.page, catalog.limit)
            .then(data => {
                catalog.cards = data.rows
                catalog.count = data.count
            })
            .finally(() => setCardsFetching(false))
    }, [])

    // При каждом клике на категорию, бренд или номер страницы — мы добавляем элемент в историю
    // браузера, ссылки в истории имеют вид /?page=1, /?page=2, /?page=3. При нажатии кнопки 
    // «Назад» браузера — мы отслеживаем изменение GET-параметров и изменяем состояние хранилища.
    useEffect(() => {
        const { category, type, page } = getSearchParams(searchParams)

        if (category || type || page) {
            if (category !== catalog.category) {
                catalog.category = category
            }
            if (type !== catalog.type) {
                catalog.type = type
            }
            if (page !== catalog.page) {
                catalog.page = page ?? 1
            }
        } else {
            catalog.category = null
            catalog.type = null
            catalog.page = 1
        }
    }, [location.search])

    // при клике на категорию, бренд, номер страницы или при нажатии кнопки  «Назад» 
    // браузера — получам с сервера список товаров, потому что это уже другой список
    useEffect(() => {
        setCardsFetching(true)
        fetchAllCards(catalog.category, catalog.type, catalog.page, catalog.limit)
            .then(data => {
                catalog.cards = data.rows
                catalog.count = data.count
            })
            .finally(() => setCardsFetching(false))
    }, [catalog.category, catalog.type, catalog.page])

    return (
        <div className="body-bg">
            <Container>
                <Row className="mt-2">
                    <Col md={3} className="mb-3">
                        {categoriesFetching ? (
                            <Spinner animation="border" />
                        ) : (
                            <CategoryBar />
                        )}
                    </Col>
                    <Col md={9}>
                        <div>
                            {typesFetching ? (
                                <Spinner animation="border" />
                            ) : (
                                <TypeBar />
                            )}
                        </div>
                        <div>
                            {cardsFetching ? (
                                <Spinner animation="border" />
                            ) : (
                                <CardList />
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
})

export default Shop