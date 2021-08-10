import axios from 'axios'
import { secrets } from '../../config'

const client = axios.create({
  baseURL: secrets.apiUrl,
  params: {
    apikey: secrets.apiKey,
  },
})

export default client
