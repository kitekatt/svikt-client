import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { createCard, fetchCategories, fetchTypes } from '../http/catalogApi'
import { useState, useEffect } from 'react'


const defaultValue = {name: '', price: '', description: '', category: '', type: ''}
const defaultValid = {name: null, price: null, description: null, category: null, type: null}

const isValid = (value) => {
    const result = {}
    const pattern = /^[1-9][0-9]*$/
    for (let key in value) {
        if (key === 'name') result.name = value.name.trim() !== ''
        if (key === 'price') result.price = pattern.test(value.price.trim())
        if (key === 'description') result.description = value.name.trim() !== ''
        if (key === 'category') result.category = pattern.test(value.category)
        if (key === 'type') result.type = pattern.test(value.type)
    }
    return result
}

const CreateCard = (props) => {
    const { show, setShow, setChange } = props

    const [value, setValue] = useState(defaultValue)
    const [valid, setValid] = useState(defaultValid)

    // выбранное для загрузки изображение товара
    const [image, setImage] = useState(null)

    // список категорий и список брендов для возможности выбора
    const [categories, setCategories] = useState(null)
    const [types, setTypes] = useState(null)

    // нужно получить с сервера список категорий и список брендов
    useEffect(() => {
        fetchCategories()
            .then(
                data => setCategories(data)
            )
        fetchTypes()
            .then(
                data => setTypes(data)
            )
    }, [])

    const handleInputChange = (event) => {
        const data = {...value, [event.target.name]: event.target.value}
        setValue(data)
        setValid(isValid(data))
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        /*
         * setValid не изменяет значение состояния мгновенно. Вызов функции лишь означает — React
         * «принял к сведению» наше сообщение, что состояние нужно изменить.
         */
        const correct = isValid(value)
        setValid(correct)

        // все поля формы прошли проверку, можно отправлять данные на сервер
        if (correct.name && correct.price && correct.description && correct.category && correct.type) {

            const data = new FormData()
            data.append('name', value.name.trim())
            data.append('price', value.price.trim())
            data.append('description', value.description.trim())
            data.append('categoryId', value.category)
            data.append('typeId', value.type)
            if (image) data.append('image', image, image.name)

            createCard(data)
                .then(
                    data => {
                        // приводим форму в изначальное состояние
                        event.target.image.value = ''
                        setValue(defaultValue)
                        setValid(defaultValid)

                        // закрываем модальное окно создания товара
                        setShow(false)
                        // изменяем состояние компонента списка товаров
                        setChange(state => !state)
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Новый товар</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="name"
                        value={value.name}
                        onChange={e => handleInputChange(e)}
                        isValid={valid.name === true}
                        isInvalid={valid.name === false}
                        placeholder="Название товара..."
                        className="mb-3"
                    />
                    <Row className="mb-3">
                        <Col>
                            <Form.Select
                                name="category"
                                value={value.category}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.category === true}
                                isInvalid={valid.category === false}
                            >
                                <option value="">Категория</option>
                                {categories && categories.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select
                                name="type"
                                value={value.type}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.type === true}
                                isInvalid={valid.type === false}
                            >
                                <option value="">Тип</option>
                                {types && types.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Control
                                name="price"
                                value={value.price}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.price === true}
                                isInvalid={valid.price === false}
                                placeholder="Цена товара..."
                            />
                        </Col>
                        <Form.Control
                        name="description"
                        value={value.description}
                        onChange={e => handleInputChange(e)}
                        isValid={valid.description === true}
                        isInvalid={valid.description === false}
                        placeholder="Описание товара..."
                        className="mb-3"
                    />
                        <Col>
                            <Form.Control
                                name="image"
                                type="file"
                                onChange={e => handleImageChange(e)}
                                placeholder="Фото товара..."
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Button type="submit">Сохранить</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CreateCard