export const isUserLoggedIn = () => {
  const userInfo = localStorage.getItem('accessToken')
  return userInfo || false
}
export const getUserData = () => JSON.parse(localStorage.getItem('user'))
