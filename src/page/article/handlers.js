import axios from "axios"
import { URL } from "../../config/url"
import short from "short-uuid"

export const getArticleList = (params) => {
    axios.defaults.headers.common["Request_id"] = short().new()
    if (params) {
        return axios.get(URL.INNER.ArticleList +
            `?pageNo=${params.pageNo}&pageSize=${params.pageSize}&tagName=${params.tagName}&search=${params.search}`)
    }
    return axios.get(URL.INNER.ArticleList)
}

export const getArticleTags = () => {
    axios.defaults.headers.common["Request_id"] = short().new()
    return axios.get(URL.INNER.ArticleTags)
}

export const getArticleArticle = (id) => {
    axios.defaults.headers.common["Request_id"] = short().new()
    return axios.get(URL.INNER.ArticleArticle + `?articleId=${id}`)
}

export const patchArticleArticle = (params) => {
    axios.defaults.headers.common["Request_id"] = short().new()
    return axios.patch(URL.INNER.ArticleArticle + `?articleId=${params.id}&field=${params.field}`)
}

export const getStatsArticleMain = () => {
    axios.defaults.headers.common["Request_id"] = short().new()
    return axios.get(URL.INNER.StatsArticleMain)
}
