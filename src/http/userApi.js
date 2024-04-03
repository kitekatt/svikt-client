import { guestInstance, authInstance } from "./index";
import { jwtDecode } from 'jwt-decode'

export const signup = async (email, password) => {
   try {
      const response = await guestInstance.post(`${REACT_APP_API_URL}user/signup`, 
            {email, password, role: 'USER'})
      const token = response.data.token
      const user = jwtDecode(token)
      localStorage.setItem('token', token)
      return user
  } catch (e) {
      alert(e.response.data.message)
      return false
  }
}

export const login = async (email, password) => {
  try {
      const response = await guestInstance.post(`${REACT_APP_API_URL}user/login`, {email, password})
      const token = response.data.token
      const user = jwtDecode(token)
      localStorage.setItem('token', token)
      return user
  } catch (e) {
      alert(e.response.data.message)
      return false
  }
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const check = async () => {
  let userToken, userData
  try {
      let userToken = localStorage.getItem('token')
      // если в хранилище нет действительного токена
      if (!userToken) {
          return false
      }
      // если токен есть - проверяем его подлинность
      const response = await authInstance.get(`${REACT_APP_API_URL}user/check`)
      userToken = response.data.token
      userData = jwtDecode(userToken)
      localStorage.setItem('token', userToken)
      return userData
  } catch(e) {
      localStorage.removeItem('token')
      return false
  }
}