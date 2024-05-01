import "./Markdown.css"
import ReactMarkdown from "react-markdown"
import React from "react"
import remarkGfm from "remark-gfm"
import remarkToc from "remark-toc"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism"

const Code = ({ inline, className, children, ...props }) => {
    if (!inline) {
        const match = /language-(\w+)/.exec(className || "")
        const content = String(children).replace(/\n$/, "")
        return (
            <SyntaxHighlighter
                style={coldarkDark}
                language={match ? match[1] : null}
                PreTag="div"
                {...props}
            >
                {content}
            </SyntaxHighlighter>
        )
    }
    return <code className={className} {...props}>{children}</code>
}

const Table = ({...props}) => <table {...props} />

const BlockQuote = ({...props}) => <blockquote {...props} />

const Markdown = (props) => {
    return (
        <ReactMarkdown
            className="article-article-content"
            remarkPlugins={[remarkGfm, remarkToc]}
            components={{
                code: Code,
                table: Table,
                blockquote: BlockQuote,
            }}
        >
            {/*内容前面增加"## Table of Content \n"可以生成目录*/}
            {/*{"## Table of Content \n" + props.articleRes.content}*/}
            {props.articleRes.content}
        </ReactMarkdown>
    )
}

export default Markdown
