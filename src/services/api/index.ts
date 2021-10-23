import axios, { AxiosResponse } from 'axios'
import { secrets } from '../../config'
import { FetchCharactersResponse } from './types'

export const fetchCharacters = async (limit = 10, offset = 0) => {
  const {
    data: {
      attributionHTML,
      attributionText,
      data: { results },
    },
  }: AxiosResponse<FetchCharactersResponse> = await axios.get('/characters', {
    baseURL: secrets.apiUrl,
    params: {
      limit,
      offset,
      apikey: secrets.apiKey,
    },
  })

  return { attributionHTML, attributionText, characters: results }
}
