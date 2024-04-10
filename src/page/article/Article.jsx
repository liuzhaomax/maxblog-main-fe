import React, { useRef, useState, useEffect } from "react"
import "./Article.css"
import { ARTICLE } from "../../config/module"
import Announcement from "../announcement/Announcement"
import ArticleCarousel from "./ArticleCarousel"
import ArticleList from "./ArticleList"
import { Input, Tag } from "antd"
import useDebounce from "../../utils/debounce"
import { getArticleTags } from "./handlers"

const { Search } = Input

function Article() {
    const childRef = useRef()
    const debouncedHandleTagChangeRef = useRef()

    const [searchingStr, setSearchingStr] = useState("")
    const [searchLoading, setSearchLoading] = useState(false)
    const onSearch = async (value) => {
        setSearchLoading(true)
        setSearchingStr(value)
        await childRef.current.reloadArticleList(selectedTags, value)
        setSearchLoading(false)
    }

    const [selectedTags, setSelectedTags] = React.useState([])
    const handleTagChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag)
        setSelectedTags(nextSelectedTags)
        // 发送请求 更新文章列表，子组件中的函数
        childRef.current.reloadArticleList(nextSelectedTags, searchingStr)
    }
    useEffect(() => {
        // useDebounce不跟随dom刷新而重置，不会初始化canCall，先触发，后防抖（先触发，后n毫秒之内不能再触发）
        debouncedHandleTagChangeRef.current = useDebounce(handleTagChange, 500)
        // 监听函数，是为了更新参数
    }, [handleTagChange])

    const [tags, setTags] = useState([])
    useEffect(() => {
        loadTags()
    }, [])
    const loadTags = () => {
        getArticleTags()
            .then(res => {
                setTags(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div id={ARTICLE.KEY} className={ARTICLE.KEY}>
            <div className="article-container">
                <div className="article-north">
                    <ArticleCarousel/>
                    <Announcement moduleName={ARTICLE.KEY}/>
                </div>
                <div className="article-south">
                    <ArticleList ref={childRef}/>
                    <div className="article-tool">
                        <Search placeholder="搜索标题和正文" onSearch={onSearch} enterButton loading={searchLoading} />
                        <h3>#标签</h3>
                        <div className="article-tag-wrap">
                            {
                                tags.length === 0 ?
                                    <></>
                                    :
                                    tags.map(tag => (
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
