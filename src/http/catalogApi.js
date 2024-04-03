import { guestInstance, authInstance } from './index.js'

// Создание удаление категории, получение списка всех категорий
export const createCategory = async (category) => {
    const { data } = await authInstance.post('category/create', category)
    return data
}

export const deleteCategory = async (id) => {
    const { data } = await authInstance.delete(`category/delete/${id}`)
    return data
}

export const fetchCategories = async () => {
    const { data } = await guestInstance.get('category/getall')
    return data
}

export const fetchCategory = async (id) => {
    const { data } = await guestInstance.get(`category/getone/${id}`)
    return data
}

// Создание и удаление типа, получение списка всех типов
export const createType = async (type) => {
    const { data } = await authInstance.post('type/create', type)
    return data
}

export const deleteType = async (id) => {
    const { data } = await authInstance.delete(`type/delete/${id}`)
    return data
}

export const fetchTypes = async () => {
    const { data } = await guestInstance.get('type/getall')
    return data
}

export const fetchType = async (id) => {
    const { data } = await guestInstance.get(`type/getone/${id}`)
    return data
}

// Создание и удаление товара, получение списка всех товаров
export const createCard = async (card) => {
    const { data } = await authInstance.post('card/create', card)
    return data
}

export const deleteCard = async (id) => {
    const { data } = await authInstance.delete(`card/delete/${id}`)
    return data
}

export const fetchAllCards = async (categoryId = null, typeId = null, page = 1, limit = 3) => {
    let url = 'card/getall'
    // фильтрация товаров по категории и/или типу
    if (categoryId) url = url + '/categoryId/' + categoryId
    if (typeId) url = url + '/typeId/' + typeId
    const { data } = await guestInstance.get(
        url,
        {params: { // GET-параметры для постраничной навигации
            page, limit
        }
    })
    return data
}

export const fetchOneCard = async (id) => {
    const { data } = await guestInstance.get(`card/getone/${id}`)
    return data
}