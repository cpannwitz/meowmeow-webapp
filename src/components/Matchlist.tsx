import React from 'react'
import styled from 'styled-components'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import LoadingSpinner from './LoadingSpinner'
import MatchlistItem from './MatchlistItem'
import { SingleButton } from '../StyleComponents'

import { useToggleState } from '../services/hooks'
import { useSession } from '../services/firebase'
import { openGamesCollection, closedGamesCollection } from '../services/firebaseQueries'
import { GameObject } from '../types/typings'

const Matchlist: React.FC = () => {
  const user = useSession()
  const [openGames, openGamesLoading] = useCollectionData<GameObject>(
    openGamesCollection(user?.uid ?? '')
  )
  const [closedGames, closedGamesLoading] = useCollectionData<GameObject>(
    closedGamesCollection(user?.uid ?? '')
  )

  const [showClosedGames, toggleShowClosedGames] = useToggleState(false)

  return (
    <>
      <Section>
        <FilterBar>
          <FilterLink active={!showClosedGames} onClick={toggleShowClosedGames}>
            Open
          </FilterLink>
          <FilterLink active={showClosedGames} onClick={toggleShowClosedGames}>
            Finished
          </FilterLink>
        </FilterBar>
        {!openGamesLoading && !closedGamesLoading ? (
          <XXX style={{ height: '100%', flex: '1 1 auto', display: 'flex' }}>
            {!showClosedGames && (
              <Container>
                {openGames && openGames.length > 0 ? (
                  <StyledList>
                    {openGames.map(gameData => (
                      <MatchlistItem gameData={gameData} key={gameData.gameId} />
                    ))}
                  </StyledList>
                ) : (
                  <Subtitle>
                    Sorry, there are no open matches!
                    <br />
                    <InlineButton style={{ marginTop: '1rem' }} onClick={() => {}}>
                      {/* TODO: Link to onlinelist */}
                      Maybe invite someone?
                      <img
                        style={{ verticalAlign: 'sub' }}
                        src="https://icongr.am/feather/chevron-right.svg?size=20&color=ffffff"
                        alt="right-icon"
                      />
                    </InlineButton>
                  </Subtitle>
                )}
              </Container>
            )}

            {showClosedGames && (
              <Container>
                {closedGames && closedGames.length > 0 ? (
                  <StyledList>
                    {closedGames.map(gameData => (
                      <MatchlistItem gameData={gameData} key={gameData.gameId} />
                    ))}
                  </StyledList>
                ) : (
                  <Subtitle>Sorry, there are no finished matches!</Subtitle>
                )}
              </Container>
            )}
          </XXX>
        ) : (
          <Container>
            <LoadingSpinner />
          </Container>
        )}
      </Section>
    </>
  )
}

export default Matchlist

export const XXX = styled.div`
  width: inherit;
  width: 100%;
  height: inherit;
`

export const Section = styled.div`
  width: 96%;
  flex: 1 1 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem auto;
  padding: 0rem;
  padding-top: 2rem;
  border-radius: 4px;
  background-color: none;
  /* bgcolor: transparent? */
  border: 1px solid rgba(255, 255, 255, 0.12);
  position: relative;
`

export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const StyledList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0;
  padding: 0.5rem;
  list-style: none;
`

export const FilterBar = styled.div`
  height: 2rem;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid ${p => p.theme.palette.blue.light};
`

export const FilterLink = styled.span<{ active: boolean }>`
  flex: 1 1 auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 0.8rem;
  background-color: ${p => (p.active ? '' : p.theme.palette.blue.main)};
  cursor: pointer;
`

export const Subtitle = styled.h3`
  font-size: 1.4rem;
  line-height: 1.4rem;
  text-shadow: 0 0 3px ${p => p.theme.palette.blue.lightest};
  letter-spacing: -0.05rem;
  text-align: center;
  font-weight: bold;
  margin: 1rem;
  margin-top: 5rem;
  padding: 0;
  flex: 1 1 auto;
  color: ${p => p.theme.palette.white.main};
`

export const InlineButton = styled(SingleButton)`
  width: auto;
  flex: 0 0 auto;
  display: inline-flex;
  padding: 0.5rem 0.8rem;
  margin: 0;
  &:only-of-type {
    margin: 0;
  }
  & > * {
    margin: 0 0.3rem;
  }
  margin-left: 0.3rem !important;
`
