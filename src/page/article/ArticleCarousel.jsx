import React, { useEffect, useState } from "react"
import "./ArticleCarousel.css"
import { Carousel } from "antd"
import { getArticleList } from "./handlers"
import config from "../../config/config"
import { URL } from "../../config/url"

function ArticleCarousel() {
    useEffect(() => {
        loadCarouselList()
    }, [])
    const [articleListCarouselRes, setArticleListCarouselRes] = useState([])
    const loadCarouselList = () => {
        let params = {
            pageNo: 1,
            pageSize: 5,
            tagName: "",
            search: "",
        }
        getArticleList(params)
            .then(res => {
                let list = res.data.data.map(item => {
                    return {
                        id: item.id,
                        cover: `${config.beBaseUrl}${URL.INNER.Static}${URL.INNER.Project}/${item.id}/${item.cover}`,
                    }
                })
                setArticleListCarouselRes(list)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onClickCarouselItem = (id) => {
        window.open(`${URL.INNER.ArticleArticle}?articleId=${id}`, "_blank")
    }

    return (
        <div className="article-carousel-container">
            <Carousel autoplay>
                {
                    articleListCarouselRes ?
                        articleListCarouselRes.map(item => {
                            return (
                                <img
                                    className="article-carousel-elem"
                                    alt="cover"
                                    src={item.cover}
                                    key={item.id}
                                    onClick={() => onClickCarouselItem(item.id)}
                                />
                            )
                        })
                        :
                        <></>
                }
            </Carousel>
        </div>
    )
}

export default ArticleCarousel
