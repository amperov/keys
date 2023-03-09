import axios from "axios"
// const https = require('https')

const baseURL = 'http://popolni.site/api'


const token = localStorage.getItem('jwt')

const Api = axios.create({
    baseURL,
    headers: {'Authorization': `Bearer ${ token }`},
})

export { Api }