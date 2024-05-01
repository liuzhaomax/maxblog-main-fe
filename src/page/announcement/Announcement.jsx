import React, { useEffect, useState } from "react"
import "./Announcement.css"
import "../demo/DemoNorth.css"
import { ARTICLE, DEMO } from "../../config/module"
import imgPortrait from "../../asset/announcement/portrait.png"
import imgWechat from "../../asset/announcement/wechat.png"
import { getStatsArticleMain } from "../article/handlers"
import { useDispatch } from "react-redux"
import { setArticleQuantity } from "../../state/reducers/stats"

const Announcement = (props) => {
    const moduleName = props.moduleName
    const dispatch = useDispatch()

    const [statsArticleMain, setStatsArticleMain] = useState(null)
    useEffect(() => {
        loadStatsArticleMain()
    }, [])
    const loadStatsArticleMain = () => {
        getStatsArticleMain()
            .then(res => {
                setStatsArticleMain(res.data.data)
                dispatch(setArticleQuantity(res.data.data.quantity))
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <div id="ANNOUNCEMENT" className="ANNOUNCEMENT">
            <div className="announcement-title">
                公告
                <div className="announcement-border">
                    <p>
                        愿中国青年都摆脱冷气，只是向上走，不必听自暴自弃者流的话。能做事的做事，能发声的发声。
                        有一分热，发一分光。就令萤火一般，也可以在黑暗里发一点光，不必等候炬火。
                        ——鲁迅
                    </p>
                </div>
            </div>
            <div className="announcement-data-border">
                <div className="announcement-data-wrap">
                    <div className="announcement-data">
                        {statsArticleMain?statsArticleMain.quantity:0}
                    </div>
                    <div className="announcement-data-title">
                        {moduleName === ARTICLE.KEY ? ARTICLE.NAME : DEMO.NAME}
                    </div>
                </div>
                <div className="announcement-data-wrap">
                    <div className="announcement-data">
                        {statsArticleMain?statsArticleMain.view:0}
                    </div>
                    <div className="announcement-data-title">
                        访问
                    </div>
                </div>
                <div className="announcement-data-wrap">
                    <div className="announcement-data">
                        {statsArticleMain?statsArticleMain.like:0}
                    </div>
                    <div className="announcement-data-title">
                        点赞
                    </div>
                </div>

            </div>
            <div className="announcement-connect-picture">
                <div className="announcement-portrait-container">
                    <a href="https://github.com/liuzhaomax" target="_blank" rel="noreferrer">
                        <img src={imgPortrait} alt="announcement_portrait" className="announcement-portrait" />
                    </a>
                    <a href="https://space.bilibili.com/18359348?spm_id_from=333.1007.0.0" target="_blank" rel="noreferrer">
                        <img src="https://img.shields.io/badge/Bilibili-fb7299?style=flat-square&logo=Bilibili&logoColor=white" alt="bilibili" className="announcement-bilibili"/>
                    </a>
                </div>
                <img src={imgWechat} alt="announcement_wechat" className="announcement-wechat"/>
            </div>
        </div>
    )
}

export default Announcement

