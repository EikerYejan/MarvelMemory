import React from 'react'
import { screen } from '@testing-library/react'
import Card from '.'
import { renderWithTheme } from '../../utils/tests'

const onClick = jest.fn()
const cardProps = { name: 'Test Card', image: '//cdn.com/image.png', id: '2', onClick }

describe('<Card />', () => {
  it('Should render card', () => {
    renderWithTheme(<Card {...cardProps} />)

    const container = screen.getByTestId('card')

    expect(container).toBeInTheDocument()
    expect(container).toHaveTextContent(cardProps.name)

    container.click()
    expect(onClick).toHaveBeenCalled()
  })

  it('Should render flipped card', () => {
    renderWithTheme(<Card {...cardProps} isMatched />)

    const container = screen.getByTestId('card')

    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
