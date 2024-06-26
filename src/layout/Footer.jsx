import React, { useEffect } from "react"
import { createRoot } from "react-dom/client"
import "./Footer.css"
import logo from "../asset/logo_bottom_color.png"
import { CONTRIBUTORS, GITHUB } from "../config/constant"
import { Tooltip } from "antd"
import ICP from "../asset/footer/ICP.png"

function Footer() {
    useEffect(() => {
        generateContributors()
    },[])

    const generateContributors = () => {
        let container = document.getElementById("CONTRIBUTORS")
        let elems = CONTRIBUTORS.map(value => {
            return (
                <a className="contributor" href={value.LINK} target="_blank" rel="noreferrer" key={value.ID}>
                    <Tooltip title={value.JOB + "贡献者：" + value.NAME}>
                        <img src={value.AVATAR} alt="contributor"/>
                    </Tooltip>
                </a>
            )
        })
        let root = createRoot(container)
        root.render(elems)
    }

    return (
        <div className="Footer">
            <div id="footer-container">
                <div id="footer-upper-wrap">
                    <img id="footer-logo" className="footer-upper-wrap" src={logo} alt={"logo"}/>
                    <div className="footer-upper-nav">
                        <h3>相关资源</h3>
                        <div className="footer-upper-nav-item-wrap">
                            <a href="https://github.com/liuzhaomax/go-maxms" target="_blank" rel="noreferrer">后端脚手架</a>
                            <a href="https://github.com/liuzhaomax/go-maxms-react" target="_blank" rel="noreferrer">前端脚手架</a>
                            <a href="https://space.bilibili.com/18359348?spm_id_from=333.1007.0.0" target="_blank" rel="noreferrer">脚手架使用教程</a>
                        </div>
                    </div>
                    <div className="footer-upper-nav">
                        <h3>贡献者</h3>
                        <div className="footer-upper-nav-item-wrap">
                            <div id="CONTRIBUTORS"></div>
                        </div>
                    </div>
                    <div className="footer-upper-nav">
                        <h3>管理入口</h3>
                        <div className="footer-upper-nav-item-wrap">
                            <a href="https://admin.liuzhaomax.cn" target="_blank" rel="noreferrer">CMS平台</a>
                            <a href="https://jenkins.liuzhaomax.cn" target="_blank" rel="noreferrer">Jenkins</a>
                            <a href="https://sonarqube.liuzhaomax.cn" target="_blank" rel="noreferrer">SonarQube</a>
                            <a href="https://harbor.liuzhaomax.cn" target="_blank" rel="noreferrer">Harbor</a>
                            <a href="https://vault.liuzhaomax.cn" target="_blank" rel="noreferrer">Vault</a>
                            <a href="https://consul.liuzhaomax.cn" target="_blank" rel="noreferrer">Consul</a>
                            <a href="https://prometheus.liuzhaomax.cn" target="_blank" rel="noreferrer">Prometheus</a>
                            <a href="https://grafana.liuzhaomax.cn" target="_blank" rel="noreferrer">Grafana</a>
                            <a href="https://kibana.liuzhaomax.cn" target="_blank" rel="noreferrer">Kibana</a>
                            <a href="https://jaeger.liuzhaomax.cn" target="_blank" rel="noreferrer">Jaeger</a>
                            <a href="http://106.15.94.179:9877" target="_blank" rel="noreferrer">RocketMQ</a>
                            <a href="https://sentinel.liuzhaomax.cn" target="_blank" rel="noreferrer">Sentinel</a>
                        </div>
                    </div>
                </div>
                <hr/>
                <div id="footer-lower-wrap">
                    <p>
                        此博客系统专门用于分享和转载编程学习相关的文章和示例，与展示个人作品。<br/>
                    </p>
                    <p>
                        如有洽谈与合作需求，请点击
                        <a href={GITHUB} target="_blank" rel="noreferrer" style={{fontWeight:"bold",color:"#338e6c"}}>这里</a>
                        跳转至个人GitHub页面，并查看联系方式。
                    </p>
                    <p>
                        ©2022-2032 LIU Zhao. All rights reserved.
                        <span id="ICP">
                            <img src={ICP} alt="ICP"/>
                            <a href="https://beian.mps.gov.cn/#/query/webSearch" target="\_blank" style={{color: "white",textDecoration:"none"}}>
                                津ICP备2024011617号
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer