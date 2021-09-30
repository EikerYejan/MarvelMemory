import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { Fireworks } from 'fireworks-js/dist/react'
import Card from './Card'
import { replicateArray, shuffleArray, transformCharacters } from '../utils'
import { fetchCharacters } from '../services/api'
import { Card as CardType } from '../types'

type Props = {
  cardsCount: number
}

const spin = keyframes`
  0% {
    transform: rotate(0deg)
  }

  50% {
    transform: rotate(180deg)
  }

  100% {
    transform: rotate(360deg)
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 70px 45px;

  .fireworks {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    canvas {
      width: 100%;
      height: 100%;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, 200px);
    place-content: center;
    gap: 20px;
    max-width: 1200px;
    width: 100vw;
  }

  .loader {
    position: absolute;
    width: 45px;
    height: 45px;
    border: 3px solid transparent;
    top: calc(50% - 22.5px);
    left: calc(50% - 22.5px);
    border-left-color: ${({ theme }) => theme.colors.red};
    border-top-color: ${({ theme }) => theme.colors.red};
    border-radius: 50%;
    animation: ${spin} 0.5s infinite linear;
  }

  footer {
    a {
      color: ${({ theme }) => theme.colors.white};
      font-weight: 100;
      margin-top: 55px;
      text-decoration: none;
      display: block;
      text-align: center;
    }
  }
`

const Controls = styled.div`
  margin: 0 0 45px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 15px;
  }

  .reset-button {
    background: none;
    border: none;
    padding: 0;
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      filter: invert(1);
      width: 25px;
      height: 25px;
      display: block;
    }
  }

  .cards-count {
    margin-right: 15px;
  }
`

const verifyCards = ([card1, card2]: CardType[]) => {
  return card1.name === card2.name
}

const GameBoard = ({ cardsCount = 20 }: Props) => {
  const [cards, setCards] = useState<CardType[]>([])
  const [selectedCards, setSelectedCards] = useState<CardType[]>([])
  const [matchedCards, setMatchedCards] = useState<CardType[]>()
  const [isCompleted, setIsCompleted] = useState(false)

  const [level, setLevel] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const copyrightText = useRef<string>()

  const selectedIds = selectedCards?.map((card) => card.id)
  const selectedCardsCount = selectedCards?.length ?? 0
  const matchedIds = matchedCards?.map((card) => card.id)

  const onSelect = (card: CardType) => {
    if (selectedCardsCount <= 1 && !selectedIds.includes(card.id)) setSelectedCards((prev) => [...(prev ?? []), card])
  }

  const getPageSettings = () => {
    const pageSize = cardsCount / 2
    const skip = pageSize * level

    return [pageSize, skip]
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSelectedCards([])
        setMatchedCards(undefined)
        setIsLoading(true)

        const { characters, attributionText } = await fetchCharacters(...getPageSettings())
        const processedResults = transformCharacters(replicateArray(characters))

        copyrightText.current = attributionText
        setCards(processedResults)
      } catch (error) {
        alert('error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [cardsCount, level])

  useEffect(() => {
    if (selectedCardsCount >= 2) {
      if (verifyCards(selectedCards)) {
        setTimeout(() => {
          setMatchedCards((prev) => [...(prev ?? []), ...selectedCards])
        }, 500)
      }

      setTimeout(() => setSelectedCards([]), 700)
    }
  }, [selectedCardsCount, selectedCards])

  useEffect(() => {
    if (typeof matchedCards === `object` && matchedCards.length === cards.length) {
      setIsCompleted(true)

      setTimeout(onFinishLevel, 3500)
    }
  }, [matchedCards, cards])

  const onReset = () => {
    setSelectedCards([])
    setMatchedCards(undefined)
    setCards(shuffleArray(cards))
  }

  const onFinishLevel = () => {
    // eslint-disable-next-line
    const moveToNextLevel = confirm('Go to the next level?')

    if (moveToNextLevel) {
      setLevel((prev) => (prev ?? 0) + 1)
      setIsCompleted(false)
    }
  }

  return (
    <Wrapper className="GameBoard">
      {isLoading ? (
        <span className="loader" />
      ) : (
        <div>
          {isCompleted && (
            <div className="fireworks">
              <Fireworks options={{ particles: 100 }} />
            </div>
          )}
          <Controls>
            <p className="cards-count">{cards.length - (matchedCards?.length ?? 0)} cards remainig</p>
            <p className="current-level">Level {level}</p>
            <div className="buttons">
              <button className="reset-button" onClick={onReset} type="button" title="Reset">
                <img src="images/refresh.svg" alt="refresh" />
              </button>
            </div>
          </Controls>
          <div className="grid">
            {cards.map((card) => (
              <Card
                isMatched={matchedIds?.includes(card.id)}
                isSelected={selectedIds?.includes(card.id)}
                onClick={() => onSelect(card)}
                key={card.id}
                {...card}
              />
            ))}
          </div>
          <footer>
            <a title="Marvel website" href="https://marvel.com" target="_blank" rel="noopener noreferrer">
              {copyrightText.current}
            </a>
          </footer>
        </div>
      )}
    </Wrapper>
  )
}

export default GameBoard
