import React from 'react'
import { Helmet } from 'react-helmet'
import styled, { createGlobalStyle } from 'styled-components'
import Board from './GameBoard'
import StartForm from './StartForm'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
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
const Layout = styled.div``

const App = () => {
  const [cardsCount, setCardsCount] = React.useState<number>()

  return (
    <Layout>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet" />
      </Helmet>
      <GlobalStyles />
      {typeof cardsCount === `number` && cardsCount > 0 ? (
        <Board cardsCount={cardsCount} onChangeCardsCount={setCardsCount} />
      ) : (
        <StartForm onConfirm={setCardsCount} />
      )}
    </Layout>
  )
}

export default App
