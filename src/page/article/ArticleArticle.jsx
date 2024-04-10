import React, { useEffect, useState } from "react"
import { ARTICLE } from "../../config/module"
import "./ArticleArticle.css"
import Announcement from "../announcement/Announcement"
import { getArticleArticle } from "./handlers"
import { LikeOutlined, EyeOutlined, ClockCircleOutlined, UserOutlined } from "@ant-design/icons"

const ArticleArticle = () => {
    const [articleRes, setArticleRes] = useState(null)
    useEffect(() => {
        loadArticle()
    }, [])
    const loadArticle = () => {
        const queryString = window.location.search
        const params = new URLSearchParams(queryString)
        const articleId = params.get("articleId")
        getArticleArticle(articleId)
            .then(res => {
                setArticleRes(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div id={ARTICLE.CHILDREN.ARTICLE.KEY} className={ARTICLE.CHILDREN.ARTICLE.KEY}>
            <div className="article-article-container">
                <div className="article-article-west">
                    {
                        articleRes ?
                            <>
                                <h1>{articleRes.title}</h1>
                                <div className="article-article-meta">
                                    <div>
                                        <span className="article-article-meta-item"><UserOutlined />作者：{articleRes.author}</span>
                                        <span className="article-article-meta-item"><ClockCircleOutlined/>更新时间：{articleRes.updatedAt.slice(0, 19)}</span>
                                        <span className="article-article-meta-item"><EyeOutlined/>阅读量：{articleRes.view}</span>
                                        <span className="article-article-meta-item"><LikeOutlined/>点赞数：{articleRes.like}</span>
                                    </div>
                                    <div>#标签：{articleRes.tags.join(", ")}</div>
                                </div>
                                <div className="article-article-content">{articleRes.content}</div>
                                {
                                    articleRes.reference ?
                                        <div>
                                            <div className="article-article-reference-title">参考资料</div>
                                            <div className="article-article-reference-content">{articleRes.reference}</div>
                                        </div>
                                        :
                                        <></>
                                }
                                {
                                    articleRes.link ?
                                        <div>
                                            <div className="article-article-link-title">转载链接</div>
                                            <div className="article-article-link-content">
                                                <a href={articleRes.link} target="_blank" rel="noreferrer">{articleRes.link}</a>
                                            </div>
                                        </div>
                                        :
                                        <></>
                                }
                            </>
                            :
                            <></>
                    }
                </div>
                <div className="article-article-east">
                    <Announcement moduleName={ARTICLE.KEY}/>
                </div>
            </div>
        </div>
    )
}

export default ArticleArticle
