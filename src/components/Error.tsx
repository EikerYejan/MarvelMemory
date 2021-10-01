import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: center;

  h3 {
    margin: 0;
    font-size: 45px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.red};
  }

  img {
    max-width: 400px;
    width: auto;
    object-fit: contain;
    margin: 25px auto 50px;
    display: block;
  }

  button {
    margin-top: 15px;
    width: 160px;
    height: 40px;
    background: ${({ theme }) => theme.colors.red};
    border: 2px solid ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius};
    transition: 0.15s;

    &:hover {
      background: transparent;
    }
  }
`

type Props = {
  onRetry?: () => void
}

const ErrorIndicator = ({ onRetry }: Props) => {
  return (
    <Wrapper>
      <h3>Upps!</h3>
      <img src="images/error.webp" alt="error" />
      <p>There&apos;s been and error.</p>
      {onRetry && (
        <button title="Try again" type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </Wrapper>
  )
}

export default ErrorIndicator
