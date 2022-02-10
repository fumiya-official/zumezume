import axios from 'axios'

const csrf_token = document.querySelector("[name=csrf-token]").content
const AxiosWrapper = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    common: {
      'X-CSRF-Token': csrf_token
    }
  }
})

export default AxiosWrapper