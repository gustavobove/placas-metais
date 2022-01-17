import jwtDefaultConfig from './jwtDefaultConfig'
import store from '@/store/index'

export default class JwtService {
  axiosIns = null

  jwtConfig = { ...jwtDefaultConfig }

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      config => {
        store.commit('app/SET_API_IN_CALL', true)
        const accessToken = this.getToken()
        if (accessToken) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error),
    )

    this.axiosIns.interceptors.response.use(
      response => {
        store.commit('app/SET_API_IN_CALL', false)
        return response
      },
      error => {
        store.commit('app/SET_API_IN_CALL', false)
        const { response } = error

        if (response && response.status === 400) {
          // tratativa de erro 400
        }
        if (response && response.status === 401) {
          // tratativa de erro 401
        }
        if (response && response.status === 404) {
          // tratativa de erro 404
        }
        if (response && response.status === 500) {
          // tratativa de erro 500
        }
        return Promise.reject(error)
      },
    )
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  getUserData() {
    return this.axiosIns.get(this.jwtConfig.userDataEndpoint)
  }

  setUserData(value) {
    localStorage.setItem(this.jwtConfig.storageUserDataKeyName, JSON.stringify(value))
  }

  login(...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args)
  }

  redefinePassword(value) {
    return this.axiosIns.post(this.jwtConfig.recoverPasswordEndpoint, { email: value })
  }

  logout() {
    localStorage.removeItem(this.jwtConfig.storageTokenKeyName)
    localStorage.removeItem(this.jwtConfig.storageUserDataKeyName)
  }

  decodeJwt() {
    try {
      return JSON.parse(atob(this.getToken().split('.')[1]))
    } catch {
      return false
    }
  }
}
