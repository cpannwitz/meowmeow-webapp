import React from 'react'
import styled from 'styled-components'
import { useCollectionDataOnce, useCollection } from 'react-firebase-hooks/firestore'
import { useToggleState } from '../services/hooks'
import { onlineUsersCollection, rankedUsersCollection } from '../services/firebaseQueries'
import { OnlineUser, UserStats } from '../types/typings'
import { SingleButton } from '../StyleComponents'
import LoadingSpinner from './LoadingSpinner'

import OnlineListItem from './OnlinelistItem'
import RankListItem from './RankListItem'

const OnlineList = () => {
  const [showRankings, toggleShowRankings] = useToggleState(false)

  const [onlineUsersRaw, onlineUsersLoading] = useCollection(onlineUsersCollection)
  const onlineUsers = onlineUsersRaw
    ? onlineUsersRaw.docs.map(
        doc =>
          ({
            ...doc.data(),
            uid: doc.id,
          } as OnlineUser)
      )
    : []

  const [rankedUsers, rankedUsersLoading] = useCollectionDataOnce<UserStats>(rankedUsersCollection)

  return (
    <Section>
      <FilterBar>
        <FilterLink active={!showRankings} onClick={toggleShowRankings}>
          OnlineList
        </FilterLink>
        <FilterLink active={showRankings} onClick={toggleShowRankings}>
          Rankings
        </FilterLink>
      </FilterBar>
      {onlineUsers && !showRankings && (
        <>
          {!onlineUsersLoading ? (
            <XXX style={{ height: '100%', flex: '1 1 auto', display: 'flex' }}>
              {!showRankings && (
                <Container>
                  {onlineUsers.length > 0 ? (
                    <StyledList>
                      {onlineUsers.map(onlineUser => (
                        <OnlineListItem onlineUser={onlineUser} key={onlineUser.displayName} />
                      ))}
                    </StyledList>
                  ) : (
                    <Subtitle style={{ marginTop: '5rem' }}>
                      Sorry, there are no players online!
                    </Subtitle>
                  )}
                </Container>
              )}
            </XXX>
          ) : (
            <Container>
              <LoadingSpinner />
            </Container>
          )}
        </>
      )}

      {rankedUsers && showRankings && (
        <>
          (
          {rankedUsersLoading ? (
            <XXX style={{ height: '100%', flex: '1 1 auto', display: 'flex' }}>
              <Container>
                <StyledList>
                  {rankedUsers.map((rankedUser, index) => (
                    <RankListItem key={rankedUser.uid} rankedUser={rankedUser} index={index} />
                  ))}
                </StyledList>
              </Container>
            </XXX>
          ) : (
            <Container>
              <LoadingSpinner />
            </Container>
          )}
        </>
      )}
    </Section>
  )
}

export default OnlineList

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
