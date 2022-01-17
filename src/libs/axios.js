import axios from 'axios'
import Vue from 'vue'

const api = axios.create({
  baseURL: process.env.VUE_APP_API,
})

Vue.prototype.$http = api

export default api
