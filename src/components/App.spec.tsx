import React from 'react'
import { renderWithTheme } from '../utils/tests'
import App from './App'

jest.mock('./GameBoard/index.tsx', () => () => <div data-testid="app-game-board" />)

describe('<App />', () => {
  it('Should render app', () => {
    const { baseElement } = renderWithTheme(<App />)

    expect(baseElement).toBeInTheDocument()
  })

  it('Should render board', () => {
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [4, jest.fn()])
    const { baseElement, getByTestId } = renderWithTheme(<App />)

    expect(baseElement).toBeInTheDocument()
    expect(getByTestId('app-game-board')).toBeInTheDocument()
  })
})
