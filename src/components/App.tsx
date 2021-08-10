/* eslint-disable react/no-danger */
import React, { useState, useEffect, useRef } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
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

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }

  body,
  p {
    margin: 0;
    background: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.white};
  }

  button {
    cursor: pointer;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 70px 45px;

  .controls {
    margin: 0 0 45px 0;

    button {
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
  }

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

const verifyCards = ([card1, card2]: CardType[]) => {
  return card1.name === card2.name
}

const App = ({ cardsCount = 20 }: Props) => {
  const [cards, setCards] = useState<CardType[]>([])
  const [selectedCards, setSelectedCards] = useState<CardType[]>([])
  const [matchedCards, setMatchedCards] = useState<CardType[]>()
  const [isCompleted, setIsCompleted] = useState(false)

  const [level, setLevel] = useState(1)

  const [isLoading, setIsLoading] = useState(true)

  const copyrightHTML = useRef<string>()

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

        const { characters, attributionHTML } = await fetchCharacters(...getPageSettings())
        const processedResults = transformCharacters(replicateArray(characters))

        copyrightHTML.current = attributionHTML
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
    console.log({ matchedCards, cards })

    if (typeof matchedCards === `object` && matchedCards.length === cards.length) {
      setIsCompleted(true)

      setTimeout(onFinishLevel, 1500)
    }
  }, [matchedCards, cards])

  const onReset = () => {
    setSelectedCards([])
    setMatchedCards(undefined)
    setCards(shuffleArray(cards))
  }

  const onFinishLevel = () => {
    // eslint-disable-next-line
    const moveToNextLevel = confirm('NEXT LEVEL?')

    if (moveToNextLevel) {
      setLevel((prev) => (prev ?? 0) + 1)
      setIsCompleted(false)
    }
  }

  return (
    <Wrapper className="App">
      <GlobalStyles />
      {isLoading ? (
        <span className="loader" />
      ) : (
        <div>
          {isCompleted && (
            <div className="fireworks">
              <Fireworks options={{ particles: 100 }} />
            </div>
          )}
          <div className="controls">
            <button onClick={onReset} type="button" title="Reset">
              <img src="images/refresh.svg" alt="refresh" />
            </button>
          </div>
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
            <p dangerouslySetInnerHTML={{ __html: copyrightHTML.current ?? '' }} />
          </footer>
        </div>
      )}
    </Wrapper>
  )
}

export default App
