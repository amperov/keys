import axios from "axios"
// const https = require('https')

const baseURL = 'https://195.140.146.153/api'


const token = localStorage.getItem('jwt')

const Api = axios.create({
    baseURL,
    headers: {'Authorization': `Bearer ${ token }`},
})

export { Api }