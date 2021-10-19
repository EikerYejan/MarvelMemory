import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/tests'
import Error from '.'

const onRetry = jest.fn(() => null)

describe('<Error />', () => {
  it('Should render Error component', () => {
    renderWithTheme(<Error />)

    const element = screen.getByTestId('error')

    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent(`There's been and error.`)
  })

  it('Should render Error component without retry button', () => {
    renderWithTheme(<Error />)

    const element = screen.getByTestId('error')
    const retryButton = element.querySelector('button')

    expect(element).toBeInTheDocument()
    expect(retryButton).toBeNull()
  })

  it('Should render Error component with retry button', () => {
    renderWithTheme(<Error onRetry={onRetry} />)

    const element = screen.getByTestId('error')
    const retryButton = element.querySelector('button')

    retryButton?.click()

    expect(element).toBeInTheDocument()
    expect(retryButton).toBeInTheDocument()
    expect(onRetry).toBeCalled()
  })
})
