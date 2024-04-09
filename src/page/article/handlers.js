import axios from "axios"
import { URL } from "../../config/url"

export const getArticleList = (params) => {
    if (params) {
        return axios.get(URL.INNER.ArticleList +
            `?pageNo=${params.pageNo}&pageSize=${params.pageSize}&tagName=${params.tagName}`)
    }
    return axios.get(URL.INNER.ArticleList)
}

export const getArticleTags = () => {
    return axios.get(URL.INNER.ArticleTags)
}

export const getArticleArticle = () => {
    return axios.get(URL.INNER.ArticleArticle)
}
