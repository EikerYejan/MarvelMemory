import { replicateArray, themeColor, uuid, transformCharacters, shuffleArray } from '.'
import theme from '../theme/defaultTheme'
import { Card, Character } from '../types'

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
const characters: Character[] = [
  {
    id: '1',
    name: 'Tony Stark',
    thumbnail: {
      extension: 'jpg',
      path: 'cdn.com/image',
    },
  },

  {
    id: '2',
    name: 'Steve Rogers',
    thumbnail: {
      extension: 'jpg',
      path: 'cdn.com/image',
    },
  },
]

const transformedCharacters: Card[] = [
  {
    id: '1',
    name: 'Tony Stark',
    image: 'cdn.com/image/standard_xlarge.jpg',
  },

  {
    id: '2',
    name: 'Steve Rogers',
    image: 'cdn.com/image/standard_xlarge.jpg',
  },
]

describe('Utils', () => {
  it('Should replicate array', () => {
    expect(replicateArray(array)).toMatchObject([...array, ...array])
  })

  it('Should generate an UUID', () => {
    const id = uuid()

    expect(typeof id).toBe('string')
    expect(id.length).toBe(14)
  })

  it('Should return themeColor', () => {
    expect(themeColor('black')({ theme } as any)).toBe(theme.colors.black)
  })

  it('Should transform characters', () => {
    const parsed = transformCharacters(characters)
    const expected = transformedCharacters.map((item, i) => ({ ...item, id: parsed[i].id }))

    expect(parsed).toMatchObject(expected)
  })

  it('Should shuffle array', () => {
    const original = [...array, ...array]
    const shuffled = shuffleArray([...array, ...array])

    expect(shuffled[0] !== original[0]).toBeTruthy()
  })
})
