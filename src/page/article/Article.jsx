import React, { useRef, useState } from "react"
import "./Article.css"
import { ARTICLE } from "../../config/module"
import Announcement from "../announcement/Announcement"
import ArticleCarousel from "./ArticleCarousel"
import ArticleList from "./ArticleList"
import { Input, Tag } from "antd"
import useDebounce from "../../utils/debounce"

const { Search } = Input

function Article() {
    const childRef = useRef()
    const debouncedHandleTagChangeRef = useRef()

    const onSearch = (value, _e, info) => console.log(info?.source, value)

    const [selectedTags, setSelectedTags] = React.useState([])
    const handleTagChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag)
        setSelectedTags(nextSelectedTags)
        // 发送请求 更新文章列表，子组件中的函数
        childRef.current.reloadArticleListBySelectedTags(nextSelectedTags)
    }
    // useDebounce不跟随dom刷新而重置，不会初始化canCall，先触发，后防抖（先触发，后n毫秒之内不能再触发）
    if (!debouncedHandleTagChangeRef.current) {
        debouncedHandleTagChangeRef.current = useDebounce(handleTagChange, 500)
    }

    const [articleListRes, setArticleListRes] = useState([])

    const loadTags = () => {
        let tags = []
        for (let i = 0; i < articleListRes.length; i++) {
            tags = [...new Set([...tags, ...articleListRes[i].tags])]
        }
        return tags
    }

    return (
        <div id={ARTICLE.KEY} className={ARTICLE.KEY}>
            <div className="article-container">
                <div className="article-north">
                    <ArticleCarousel/>
                    <Announcement moduleName={ARTICLE.KEY}/>
                </div>
                <div className="article-south">
                    <ArticleList setArticleListRes={setArticleListRes} ref={childRef}/>
                    <div className="article-tool">
                        <Search placeholder="搜索标题和正文" onSearch={onSearch} enterButton />
                        <h3>#标签</h3>
                        <div className="article-tag-wrap">
                            {
                                articleListRes.length === 0 ?
                                    <></>
                                    :
                                    loadTags().map(tag => (
                                        <Tag.CheckableTag
                                            key={tag}
                                            checked={selectedTags.includes(tag)}
                                            onChange={(checked) => debouncedHandleTagChangeRef.current(tag, checked)}
                                        >
                                            {tag}
                                        </Tag.CheckableTag>
                                    ))
                            }
                        </div>
                        <h3>相关文章</h3>
                        <div>
                            <a href=""></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article
