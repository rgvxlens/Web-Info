import axios from 'axios'
const BASE_URL = 'http://localhost:3000'

export function getUsers () {
  return axios.get(`${BASE_URL}/users`).then(response => response.data)
}
