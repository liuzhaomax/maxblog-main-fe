const express = require("express")
const path = require("path")
const ejs = require("ejs")
const history = require("connect-history-api-fallback")
const favicon = require("serve-favicon")
const logger = require("morgan")
const debug = require("debug")("my-application")
const promClient = require("prom-client")
const Consul = require("consul")

const app = express()
app.disable("x-powered-by")

app.engine("html", ejs.renderFile)
    .set("views", path.resolve(__dirname, "./build"))
    .set("view engine", "html")
    .use(favicon(path.resolve(__dirname, "./build/favicon.ico")))
    .use(history({index: "/", verbose: false}))
    .use(express.static(path.resolve(__dirname, "./build")))
    // .use(logger("dev"))
    .use(logger(":method :status - :remote-addr - :date[iso] - :url - :response-time ms - :res[content-length]"))
    .use((err, req, res, next) => {
        res.locals.message = err.message
        res.locals.error = req.app.get("env") === "development" ? err : {}
        res.status(err.status || 500)
        res.render("error")
    })

const router  = express.Router()

router.get("/", (req, res, next) => {
    res.render("./build/index.html")
})

const httpRequestDurationMicroseconds = new promClient.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "code"],
    buckets: [0.1, 0.5, 1, 1.5, 2, 3, 5, 10],
})

const promMw = (req, res, next) => {
    const start = Date.now()
    res.on("finish", () => {
        const duration = Date.now() - start
        httpRequestDurationMicroseconds
            .labels(req.method, req.route.path, res.statusCode)
            .observe(duration / 1000)
    })
    next()
}

router.get("/metrics", (req, res) => {
    res.set("Content-Type", promClient.register.contentType)
    res.end(promClient.register.metrics())
})

app.use(promMw)

app.use("/", router)

const consul = new Consul({
    host: "172.16.96.98",
    port: 8500,
})
const serviceName = "maxblog-main-fe"
const servicePort = 9601
consul.agent.service.register({
    name: serviceName,
    port: servicePort,
}, (err) => {
    console.log(err)
})

app.listen(9601, (req, res) => {
    console.log("Server fe的be running on 9601.")
    debug()
})