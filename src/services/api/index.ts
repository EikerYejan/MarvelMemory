import { AxiosResponse } from 'axios'
import fetch from './client'
import { FetchCharactersResponse } from './types'

export const fetchCharacters = async (limit = 10, offset = 0) => {
  const {
    data: {
      attributionHTML,
      data: { results },
    },
  }: AxiosResponse<FetchCharactersResponse> = await fetch('/characters', { params: { limit, offset } })

  return { attributionHTML, characters: results }
}
