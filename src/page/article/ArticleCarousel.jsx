import React from "react"
import "./ArticleCarousel.css"
import { Carousel } from "antd"

function ArticleCarousel() {

    return (
        <div className="article-carousel-container">
            <Carousel autoplay>
                <div className="article-carousel-elem">
                    1
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
            </Carousel>
        </div>
    )
}

export default ArticleCarousel
