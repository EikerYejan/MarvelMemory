import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '../../utils/tests'
import StartForm from '.'

const onConfirm = jest.fn()

describe('<StartForm />', () => {
  it('Should render form', () => {
    renderWithTheme(<StartForm onConfirm={onConfirm} />)

    const element = screen.getByTestId('start-form')

    expect(element).toBeInTheDocument()
  })

  it('Should type cards count', () => {
    renderWithTheme(<StartForm onConfirm={onConfirm} />)

    const value = '14'
    const element = screen.getByTestId('start-form')
    const input = element.querySelector('input')
    const button = element.querySelector('button')

    if (!input) throw new Error('No input found')

    expect(input).toBeInTheDocument()
    userEvent.type(input, value)
    button?.click()

    expect(input.value).toBe(value)
    expect(onConfirm).toHaveBeenCalledWith(Number(value))
  })
})
