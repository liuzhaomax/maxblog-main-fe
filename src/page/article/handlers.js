import axios from "axios"
import { URL } from "../../config/url"

export const getArticleList = (params) => {
    if (params) {
        return axios.get(URL.INNER.ArticleList +
            `?pageNo=${params.pageNo}&pageSize=${params.pageSize}&tagName=${params.tagName}&search=${params.search}`)
    }
    return axios.get(URL.INNER.ArticleList)
}

export const getArticleTags = () => {
    return axios.get(URL.INNER.ArticleTags)
}

export const getArticleArticle = (id) => {
    return axios.get(URL.INNER.ArticleArticle + `?articleId=${id}`)
}

export const patchArticleArticle = (params) => {
    return axios.patch(URL.INNER.ArticleArticle + `?articleId=${params.id}&field=${params.field}`)
}
