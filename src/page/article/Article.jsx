import React from "react"
import "./Article.css"
import { ARTICLE } from "../../config/module"
import Announcement from "../announcement/Announcement"
import ArticleCarousel from "./ArticleCarousel"

function Article() {
    return (
        <div id={ARTICLE.KEY} className={ARTICLE.KEY}>
            <div className="article-container">
                <div className="article-north">
                    <ArticleCarousel/>
                    <Announcement moduleName={ARTICLE.KEY}/>
                </div>
                <div className="article-south">
                    <div className="article-list">

                    </div>
                    <div className="article-tool">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article
