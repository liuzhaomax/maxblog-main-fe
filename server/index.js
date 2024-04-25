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
    .use(history({
        index: "/",
        verbose: false,
        // connect-history-api-fallback中间件会去SPA找路由，没有的话会用“/”替代
        rewrites: [
            { from: /^\/health$/, to: "/health" }, // 将 /health 请求重定向到自身，避免重定向
            { from: /^\/metrics$/, to: "/metrics" },
        ],
    }))
    .use(express.static(path.resolve(__dirname, "./build")))
    // .use(logger("dev"))
    .use(logger(":method :status - :remote-addr - :date[iso] - :url - :response-time ms - :res[content-length]"))
    .use((err, req, res, next) => {
        res.locals.message = err.message
        res.locals.error = req.app.get("env") === "development" ? err : {}
        res.status(err.status || 500)
        res.render("error")
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

app.use(promMw)

const router  = express.Router()

router.get("/", (req, res, next) => {
    res.render("./build/index.html")
})
router.get("/metrics", (req, res) => {
    promClient.register.metrics().then(metrics => {
        res.set("Content-Type", promClient.register.contentType)
        res.end(metrics)
    }).catch(error => {
        console.error("Error sending metrics:", error)
        res.status(500).send("Internal Server Error")
    })
})

const consulHost = "172.16.96.97"
const consulPort = 8500
const consul = new Consul({
    host: consulHost,
    port: consulPort,
})
const serviceName = "maxblog-main-fe"
const serviceHost = "172.16.96.98"
const servicePort = 9601
const healthCheckEndpoint = "/health"

consul.agent.service.register({
    name: serviceName,
    address: serviceHost,
    port: servicePort,
    tags: [serviceName, "http", "nodejs"],
    check: {
        http: `http://${serviceHost}:${servicePort}${healthCheckEndpoint}`, // 健康检查的 URL
        interval: "10s", // 健康检查的间隔时间
        timeout: "5s",   // 健康检查的超时时间
        deregister_critical_service_after: "1m" // 在服务不健康时，多久后将其从 Consul 注销
    }
}, (err) => {
    if (err) {
        console.error("Failed to register with Consul:", err)
    } else {
        console.log("Registered with Consul")
    }
})

router.get("/health", (req, res, next) => {
    res.send("ok")
})

app.use("/", router)

app.listen(servicePort, (req, res) => {
    console.log(`Server fe的be running on ${servicePort}.`)
    debug()
})