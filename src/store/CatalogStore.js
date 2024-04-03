import { makeAutoObservable } from 'mobx'

class CatalogStore {
    _categories = []
    _types = []
    _cards = []
    _category = null // выбранная категория
    _type = null // выбранный бренд
    _page = 1 // текущая страница
    _count = 0 // сколько всего товаров
    _limit = 4 // товаров на страницу

    constructor() {
        makeAutoObservable(this)
    }

    get categories() {
        return this._categories
    }

    get types() {
        return this._types
    }

    get cards() {
        return this._cards
    }

    get category() {
        return this._category
    }

    get type() {
        return this._type
    }

    get page() {
        return this._page
    }

    get count() {
        return this._count
    }

    get limit() {
        return this._limit
    }

    get pages() { // всего страниц
        return Math.ceil(this.count / this.limit)
    }

    set categories(categories) {
        this._categories = categories
    }

    set types(types) {
        this._types = types
    }

    set cards(cards) {
        this._cards = cards
    }

    set category(id) {
        this.page = 1
        this._category = id
    }

    set type(id) {
        this.page = 1
        this._type = id
    }

    set page(page) {
        this._page = page
    }

    set count(count) {
        this._count = count
    }

    set limit(limit) {
        this._limit = limit
    }
}

export default CatalogStore