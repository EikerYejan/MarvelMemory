import { DefaultTheme, StyledProps } from 'styled-components'
import { Card, Character } from '../types'

export const shuffleArray = <T extends Array<unknown>>(array: T) => {
  const shuffled = array

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]

    shuffled[i] = array[j]
    shuffled[j] = temp
  }

  return shuffled
}

export const replicateArray = <T extends Array<unknown>>(arr: T, times = 2) => {
  const arrays = Array(times).fill(0)
  const replicated = arrays.map(() => arr)

  return replicated.flat()
}

export const uuid = () => ((1 + Math.random()) * 0x10000 ?? 0).toString(16).substring(1)

export const transformCharacters = (characters: Character[]): Card[] => {
  return characters.map(({ name, thumbnail }) => ({
    id: uuid(),
    name,
    image: `${thumbnail.path}/standard_xlarge.${thumbnail.extension}`,
  }))
}

export const themeColor = (color: keyof DefaultTheme['colors']) => {
  return ({ theme }: StyledProps<DefaultTheme>) => {
    return theme.colors?.[color]
  }
}
