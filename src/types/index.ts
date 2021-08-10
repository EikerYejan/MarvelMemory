export type Card = {
  id: string
  name: string
  image: string
  isSelected?: boolean
  isMatched?: boolean
}

export type Character = {
  id: string
  name: string
  thumbnail: {
    extension: string
    path: string
  }
}
