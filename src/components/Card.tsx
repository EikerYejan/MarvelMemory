import React from 'react'
import styled from 'styled-components'
import { Card as CardType } from '../types'

type Props = React.HTMLAttributes<HTMLDivElement> & CardType

const Wrapper = styled.div<{ isSelected?: CardType['isSelected']; isMatched?: CardType['isMatched'] }>`
  width: 200px;
  height: 200px;
  perspective: 1000px;
  cursor: pointer;
  transform: ${({ isMatched }) => (isMatched ? 'scale(1.05)' : 'none')};
  transition: 0.1s;

  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.4s;
    transform-style: preserve-3d;
    transform: ${({ isSelected }) => (isSelected ? 'rotateY(180deg)' : 'none')};
  }

  .front,
  .back {
    border-radius: 4px;
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .front {
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      user-select: none;
      --webkit-user-drag: none;
    }
  }

  .back {
    transform: rotateY(180deg);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid ${({ theme, isMatched }) => (isMatched ? theme.colors.red : theme.colors.white)};

    &::after {
      content: '';
      position: absolute;
      display: block;
      background: rgba(0, 0, 0, 0.3);
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 0;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: inherit;
      position: absolute;
      left: 0;
      top: 0;
    }

    p {
      z-index: 1;
      color: ${({ theme }) => theme.colors.white};
    }
  }
`

const Card = ({ name, onClick, isSelected, isMatched, image }: Props) => {
  return (
    <Wrapper isMatched={isMatched} isSelected={isSelected || isMatched} tabIndex={0} onClick={onClick} role="button">
      <div className="inner">
        <div className="front">
          <img alt="marvel-logo" src="https://i.pinimg.com/originals/24/92/00/249200c431fe811110761709b303fcaf.jpg" />
        </div>
        <div className="back">
          <img src={image} alt={name} />
          <p>{name}</p>
        </div>
      </div>
    </Wrapper>
  )
}

export default Card
