import axios from "axios"
import config from "./config"
import short from "short-uuid"
import { URL } from "./url"

const initAxios = () => {
    axios.defaults.baseURL = config.beBaseUrl + URL.INNER.Maxblog
    axios.defaults.headers.common["Content-Type"] = "application/json"
    axios.defaults.headers.common["App_id"] = short().new()
}

export default initAxios
