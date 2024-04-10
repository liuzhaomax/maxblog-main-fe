export const HOME = {
    NAME: "首页",
    KEY: "HOME",
    PATH: "home",
    FULL_PATH: "/home",
    FILE_PATH: "page/home/Home",
}

export const ARTICLE = {
    NAME: "文章",
    KEY: "ARTICLE",
    PATH: "article/list",
    FULL_PATH: "/article/list",
    FILE_PATH: "page/article/Article",
    CHILDREN: {
        ARTICLE: {
            NAME: "文章文章",
            KEY: "ARTICLEARTICLE",
            PATH: "article/article",
            FULL_PATH: "/article/article",
            FILE_PATH: "page/article/ArticleArticle",
        },
    },
}

export const DEMO = {
    NAME: "样例",
    KEY: "DEMO",
    PATH: "demo/list",
    FULL_PATH: "/demo/list",
    FILE_PATH: "page/demo/Demo",
}

export const PROJECT = {
    NAME: "项目",
    KEY: "PROJECT",
    PATH: "project/list",
    FULL_PATH: "/project/list",
    FILE_PATH: "page/project/Project",
}

export const MODULE = {
    HOME,
    ARTICLE,
    DEMO,
    PROJECT,
}