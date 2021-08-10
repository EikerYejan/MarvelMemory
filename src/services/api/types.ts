import { Character } from '../../types'

export type FetchCharactersResponse = {
  attributionHTML: string
  data: {
    results: Character[]
  }
}
