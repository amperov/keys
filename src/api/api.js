import axios from "axios"
// const https = require('https')

const baseURL = 'https://212.57.126.34/api'


const token = localStorage.getItem('jwt')

const Api = axios.create({
    baseURL,
    headers: {'Authorization': `Bearer ${ token }`},
})

export { Api }