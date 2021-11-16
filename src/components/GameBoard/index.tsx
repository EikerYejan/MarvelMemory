import React, { useState, useEffect, useRef, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { Fireworks } from 'fireworks-js/dist/react'
import Card from '../Card'
import { replicateArray, shuffleArray, transformCharacters } from '../../utils'
import { fetchCharacters } from '../../services/api'
import { Card as CardType } from '../../types'
import ErrorIndicator from '../Error'
import Alert from '../Alert'

type Props = {
  cardsCount: number
  onChangeCardsCount: (count: number) => void
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
    position: fixed;
    z-index: 1;
    width: 100vw;
    height: 100vh;
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
  margin: 0 auto 45px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 50px;

  .buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 15px;
  }

  .reset-button,
  .change-cards-count-button {
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

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .change-cards-count-button {
    margin-right: 10px;
  }
`

const verifyCards = ([card1, card2]: CardType[]) => {
  return card1.name === card2.name
}

const GameBoard = ({ cardsCount, onChangeCardsCount }: Props) => {
  const [cards, setCards] = useState<CardType[]>([])
  const [selectedCards, setSelectedCards] = useState<CardType[]>([])
  const [matchedCards, setMatchedCards] = useState<CardType[]>()
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [hasError, setHasError] = useState(false)

  const [level, setLevel] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const copyrightText = useRef<string>()

  const selectedIds = selectedCards?.map((card) => card.id)
  const selectedCardsCount = selectedCards?.length ?? 0
  const matchedIds = matchedCards?.map((card) => card.id)

  const onSelect = (card: CardType) => {
    if (selectedCardsCount <= 1 && !selectedIds.includes(card.id)) setSelectedCards((prev) => [...prev, card])
  }

  const pageSettings = useMemo(() => {
    const pageSize = cardsCount / 2
    const skip = pageSize * level

    return [pageSize, skip]
  }, [cardsCount, level])

  const fetchData = async () => {
    try {
      setSelectedCards([])
      setMatchedCards(undefined)
      setHasError(false)
      setIsLoading(true)

      const { characters, attributionText } = await fetchCharacters(...pageSettings)
      const processedResults = shuffleArray(transformCharacters(replicateArray(characters)))

      copyrightText.current = attributionText
      setCards(processedResults)
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
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
      setTimeout(setShowConfirmationModal, 500, true)
    }
  }, [matchedCards, cards])

  const onReset = () => {
    setSelectedCards([])
    setMatchedCards(undefined)
    setCards(shuffleArray(cards))
  }

  const onFinishLevel = () => {
    setLevel((prev) => prev + 1)
    setShowConfirmationModal(false)
  }

  const renderContent = () => {
    if (isLoading && !hasError) return <span className="loader" />
    if (hasError) return <ErrorIndicator onRetry={fetchData} />

    return (
      <section data-testid="game-board">
        {showConfirmationModal && (
          <div className="fireworks">
            <Alert
              title="Congrats, You won!"
              subtitle="Do you want to move to the next level?"
              cancelButtonText="Nope"
              confirmButtonText="Hell yeah!"
              onCancel={() => setShowConfirmationModal(false)}
              onConfirm={onFinishLevel}
            />
            <Fireworks options={{ particles: 100 }} />
          </div>
        )}
        <Controls>
          <p className="cards-count">{cards.length - (matchedCards?.length ?? 0)} cards remainig</p>
          <p className="current-level">Level {level}</p>
          <div className="buttons">
            <button
              className="change-cards-count-button"
              onClick={() => onChangeCardsCount(0)}
              type="button"
              title="Change cards count"
            >
              <img src="images/dice.svg" alt="refresh" />
            </button>
            <button
              disabled={!matchedCards?.length}
              className="reset-button"
              onClick={onReset}
              type="button"
              title="Reset"
            >
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
      </section>
    )
  }

  return <Wrapper className="GameBoard">{renderContent()}</Wrapper>
}

export default GameBoard
