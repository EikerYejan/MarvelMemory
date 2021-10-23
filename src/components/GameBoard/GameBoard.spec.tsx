import React from 'react'
import axios from 'axios'
import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import GameBoard from '.'
import { renderWithTheme } from '../../utils/tests'
import { Character } from '../../types'

const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const characters: Character[] = [
  {
    id: '1',
    name: 'Tony Stark',
    thumbnail: {
      extension: 'jpg',
      path: 'cdn.com/image',
    },
  },
]

const cardsCount = characters.length * 2
const onChangeCardsCount = jest.fn()

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: () =>
      Promise.resolve({
        data: {
          attributionHTML: 'HTML',
          attributionText: 'TEXT',
          data: {
            results: characters,
          },
        },
      }),
  },
}))

jest.mock('fireworks-js/dist/react', () => ({
  __esModule: true,
  Fireworks: () => <div>Fireworks</div>,
}))

const finishGame = async () => {
  const { baseElement, getAllByTestId, getByTestId } = renderWithTheme(
    <GameBoard cardsCount={cardsCount} onChangeCardsCount={onChangeCardsCount} />,
  )
  const cards = await waitFor(() => getAllByTestId('card'))
  cards.forEach((card) => {
    userEvent.click(card)
  })

  await act(async () => {
    await timeout(1000)
  })

  return { baseElement, getByTestId, getAllByTestId }
}

describe('<GameBoard />', () => {
  it('should render', async () => {
    const { baseElement, getAllByTestId } = renderWithTheme(
      <GameBoard cardsCount={cardsCount} onChangeCardsCount={onChangeCardsCount} />,
    )
    const cards = await waitFor(() => getAllByTestId('card'))

    expect(baseElement).toBeInTheDocument()
    expect(cards.length).toBe(cardsCount)
  })

  it('Should finish game', async () => {
    const { baseElement, getByTestId } = await finishGame()
    const successAlert = await waitFor(() => getByTestId('alert'))

    expect(baseElement).toMatchSnapshot()
    expect(successAlert).toBeInTheDocument()
  })

  it('Should finish game and move to the next level', async () => {
    const { getByTestId, baseElement } = await finishGame()

    const successAlert = await waitFor(() => getByTestId('alert'))
    const confirmButton = await waitFor(() => successAlert.querySelector<HTMLButtonElement>('button.confirm'))

    expect(confirmButton).toBeInTheDocument()

    await act(async () => {
      confirmButton?.click()

      await timeout(1000)
    })

    expect(baseElement.querySelector('.current-level')).toHaveTextContent('Level 2')
  })

  it('Should finish game and stay in the same level', async () => {
    const { getByTestId, baseElement } = await finishGame()

    const successAlert = await waitFor(() => getByTestId('alert'))
    const cancelButton = await waitFor(() => successAlert.querySelector<HTMLButtonElement>('button.cancel'))

    expect(cancelButton).toBeInTheDocument()

    await act(async () => {
      cancelButton?.click()

      await timeout(1000)
    })

    expect(baseElement.querySelector('.current-level')).toHaveTextContent('Level 1')
  })

  it('Should render Error component', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject())

    const { getByTestId } = renderWithTheme(
      <GameBoard cardsCount={cardsCount} onChangeCardsCount={onChangeCardsCount} />,
    )
    const errorComponent = await waitFor(() => getByTestId('error'))

    expect(errorComponent).toBeInTheDocument()
  })
})
