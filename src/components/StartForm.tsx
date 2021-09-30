import React, { useState } from 'react'
import styled from 'styled-components'

type Props = {
  onConfirm: (value: number) => void
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 70px 45px;

  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h2 {
    font-size: 40px;
    max-width: 500px;
    text-align: center;
    line-height: 50px;
  }

  input {
    width: 250px;
    height: 40px;
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: transparent;
    border: 2px solid ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
    padding: 0 12px;

    &::placeholder {
      font-family: inherit;
    }
  }

  .submit {
    border: none;
    height: 40px;
    width: 80px;
    margin-left: 10px;
    background: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 2px solid ${({ theme }) => theme.colors.red};
    transition: 0.15s;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &:hover {
      background-color: transparent;
    }
  }
`

const StartForm = ({ onConfirm }: Props) => {
  const [value, setValue] = useState(0)

  return (
    <Wrapper>
      <h2>How many cards do you want to use?</h2>
      <div className="controls">
        <input
          onChange={(e) => setValue(Number(e.currentTarget.value))}
          min={4}
          step={2}
          type="number"
          title="Cards count"
          placeholder="Even numbers only"
          value={value}
        />
        <button
          onClick={() => onConfirm(value)}
          className="submit"
          disabled={!value || value < 4}
          title="Start"
          type="button"
        >
          Start
        </button>
      </div>
    </Wrapper>
  )
}

export default StartForm
