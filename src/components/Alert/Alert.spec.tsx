import React from 'react'
import { screen } from '@testing-library/react'
import Alert from '.'
import { renderWithTheme } from '../../utils/tests'

const onClose = jest.fn()
const onConfirm = jest.fn()

const title = 'Alert Title'
const subtitle = 'Alert Subtitle'
const cancelButtonText = 'Cancel Alert'
const confirmButtonText = 'Confirm Button'

describe('<Alert />', () => {
  it('Should render Alert', () => {
    renderWithTheme(
      <Alert
        confirmButtonText={confirmButtonText}
        cancelButtonText={cancelButtonText}
        subtitle={subtitle}
        title={title}
        onCancel={onClose}
        onConfirm={onConfirm}
      />,
    )

    const element = screen.getByTestId('alert')
    const confirmButton = element.querySelector<HTMLButtonElement>('button.confirm')
    const cancelButton = element.querySelector<HTMLButtonElement>('button.cancel')

    expect(element).toBeInTheDocument()
    expect(element).toMatchSnapshot()
    expect(element).toHaveTextContent(title)
    expect(element).toHaveTextContent(subtitle)
    expect(element).toHaveTextContent(cancelButtonText)
    expect(element).toHaveTextContent(confirmButtonText)

    expect(confirmButton).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()

    // Action buttons
    confirmButton?.click()
    cancelButton?.click()

    expect(onConfirm).toBeCalled()
    expect(onClose).toBeCalled()
  })
})
