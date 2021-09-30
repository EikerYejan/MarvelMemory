import { Character } from '../../types'

export type FetchCharactersResponse = {
  attributionHTML: string
  attributionText: string
  data: {
    results: Character[]
  }
}
