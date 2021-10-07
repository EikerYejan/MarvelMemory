import React from 'react'
import styled from 'styled-components'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  subtitle: string
  confirmButtonText: string
  cancelButtonText: string
  onConfirm: () => void
  onCancel: () => void
}

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.25);
  width: 300px;
  height: auto;
  position: fixed;
  top: 45px;
  right: calc(50% - 150px);
  backdrop-filter: blur(15px);
  border: 1px solid ${({ theme }) => theme.colors.red};
  border-radius: ${({ theme }) => theme.borderRadius};
  z-index: 2;
  padding: 45px 30px 30px;

  .close {
    background: none;
    border: none;
    position: absolute;
    right: 15px;
    top: 10px;
    width: 24px;
    height: 24px;
    padding: 0;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.white};
  }

  h4 {
    margin: 0 0 14px;
    font-size: 26px;
    font-weight: bold;
  }

  p {
    font-size: 18px;
    margin-bottom: 32px;
    font-weight: 300;
    background: none;
  }

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    button {
      width: 50%;
      border-radius: ${({ theme }) => theme.borderRadius};
      border: none;
      color: ${({ theme }) => theme.colors.white};
      height: 40px;
      font-weight: bold;
      font-size: 14px;
      padding: 0;

      &.cancel {
        background: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.red};
      }

      &.confirm {
        background: ${({ theme }) => theme.colors.red};
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`

const Alert = ({ title, subtitle, confirmButtonText, cancelButtonText, onCancel, onConfirm, ...props }: Props) => {
  return (
    <Wrapper {...props}>
      <button onClick={onCancel} className="close" type="button" title="Close">
        &times;
      </button>
      <h4>{title}</h4>
      <p>{subtitle}</p>
      <div className="buttons">
        <button onClick={onCancel} title="Close" className="cancel" type="button">
          {cancelButtonText}
        </button>
        <button onClick={onConfirm} title="Confirm" className="confirm" type="button">
          {confirmButtonText}
        </button>
      </div>
    </Wrapper>
  )
}
export default Alert
