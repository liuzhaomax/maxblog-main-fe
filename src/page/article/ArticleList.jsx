import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import "./ArticleList.css"
import { List, Space } from "antd"
import { ClockCircleOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons"
import { getArticleList } from "./handlers"
import config from "../../config/config"
import { URL } from "../../config/url"
import { ARTICLE } from "../../config/module"
import MarkdownIt from "markdown-it"
import { useSelector } from "react-redux"

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
)

const ArticleList = forwardRef((props, ref) => {
    const stats = useSelector(state => state.stats)

    const queryString = window.location.search
    const params = new URLSearchParams(queryString)
    const pageNoParam = params.get("pageNo") ? params.get("pageNo") : 1
    const pageSizeParam = params.get("pageSize") ? params.get("pageSize") : 5
    const [pageNo, setPageNo] = useState(pageNoParam)
    const [pageSize, setPageSize] = useState(pageSizeParam)
    const [articleList, setArticleList] = useState([]) // list data

    useEffect(() => {
        loadArticleList()
    }, [stats, pageNo, pageSize])
    const loadArticleList = () => {
        setArticleList([]) // 让填充的占位数据消失
        let params = {
            pageNo: pageNo,
            pageSize: pageSize,
            tagName: "",
            search: "",
        }
        getArticleList(params)
            .then(res => {
                let data = mapArticleListRes2Data(res.data.data)
                extendArticleList(data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const mdParser = new MarkdownIt({ html: true })
    const mapArticleListRes2Data = articleListRes => {
        let article
        return articleListRes.map(item => {
            article = {
                id: item.id,
                title: item.title,
                tags: "",
                preview: mdParser.render(item.content.slice(0, 100) + " ..."), // 前100个字符
                view: item.view,
                like: item.like,
                updatedAt: item.updatedAt.slice(0, 19), // 2024-10-05 15:12:11
                cover: `${config.beBaseUrl}${URL.INNER.Static}${URL.INNER.Maxblog}${URL.INNER.Article}/${item.id}/${item.cover}`, // /www/maxblog/JC23dJhf3bMNZZZCYLjGBk/golang.png
            }
            let tagNameStr = ""
            for (let i = 0; i < item.tags.length; i++) {
                if (i === item.tags.length - 1) {
                    tagNameStr += `${item.tags[i]}`
                    break
                }
                tagNameStr += `${item.tags[i]}, `
            }
            article.tags = tagNameStr
            return article
        })
    }
    // 获取文章数量，以便补充数据数组，从而让pagination有很多页
    const extendArticleList = (articleList) => {
        let data = []
        if (stats) {
            for (let i = 0; i < Math.ceil(stats.articleQuantity / pageSize); i++) {
                if (pageNo - 1 === i) {
                    data = [...data, ...articleList]
                } else {
                    for (let j = 0; j < pageSize; j++) {
                        data.push({id: j+""})
                    }
                }
            }
        }
        setArticleList(data)
    }
    // 重新加载文章列表，用于tag和search功能
    const reloadArticleList = (selectedTags, searchingStr) => {
        let params = {
            pageNo: pageNo,
            pageSize: pageSize,
            tagName: selectedTags.join(",") ? selectedTags.join(",") : "",
            search: searchingStr ? searchingStr : "",
        }
        getArticleList(params)
            .then(res => {
                let data = mapArticleListRes2Data(res.data.data)
                if (selectedTags.length || searchingStr.length) {
                    setArticleList(data)
                } else {
                    extendArticleList(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    // 父组件调用子组件函数
    useImperativeHandle(ref, () => ({
        reloadArticleList
    }))

    const onClickListImage = (id) => {
        window.open(`${ARTICLE.CHILDREN.ARTICLE.FULL_PATH}?articleId=${id}`, "_blank")
    }

    const onClickListTitle = (id) => {
        window.open(`${ARTICLE.CHILDREN.ARTICLE.FULL_PATH}?articleId=${id}`, "_blank")
    }

    return (
        <div className="article-list-container">
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (pageNo, pageSize) => {
                        setPageNo(pageNo)
                        setPageSize(pageSize)
                    },
                    onShowSizeChange: (pageNo, pageSize) => {
                        setPageNo(pageNo)
                        setPageSize(pageSize)
                    },
                    current: pageNo,
                    pageSize: pageSize,
                    pageSizeOptions: [5, 10, 20, 30],
                    showQuickJumper: true,
                    showSizeChanger: true,
                    locale: { 
                        items_per_page: "篇/页",
                        jump_to: "跳至",
                        page: "页"
                    },
                }}
                dataSource={articleList}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={EyeOutlined} text={item.view} key="list-vertical-view-o" />,
                            <IconText icon={LikeOutlined} text={item.like} key="list-vertical-like-o" />,
                            <IconText icon={ClockCircleOutlined} text={item.updatedAt} key="list-vertical-datetime" />,
                        ]}
                        extra={
                            <img
                                width={250}
                                alt="cover"
                                src={item.cover}
                                onClick={() => onClickListImage(item.id)}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<div className="article-list-title" onClick={() => onClickListTitle(item.id)} >{item.title}</div>}
                            description={item.tags}
                        />
                        <div dangerouslySetInnerHTML={{ __html: item.preview }}></div>
                    </List.Item>
                )}
            />
        </div>
    )
})

ArticleList.displayName = "ArticleList"

export default ArticleList
