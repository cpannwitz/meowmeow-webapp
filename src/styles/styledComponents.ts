import styled from 'styled-components'

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1.5rem;
  margin-bottom: 0.5rem;
  border-radius: ${p => p.theme.radii[0]};
  border: 1px solid ${p => p.theme.palette.blue.light};
  background-color: ${p => p.theme.palette.white.off};
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  color: ${p => p.theme.palette.black.main};
  transition: all 0.15s ease-in-out;

  &:focus,
  &:active,
  &:hover {
    outline: none;
    background-color: ${p => p.theme.palette.white.main};
  }
`

export const Button = styled.button`
  width: 100%;
  min-height: 3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 2rem;
  margin: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  color: ${p => p.theme.palette.white.main};
  border: 1px solid ${p => p.theme.palette.blue.light};
  border-radius: ${p => p.theme.radii[0]};
  background-color: ${p => p.theme.palette.blue.main};
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &:active,
  &:hover,
  &:focus {
    background-color: ${p => p.theme.palette.blue.dark};
    outline: none;
  }
  &:only-of-type {
    margin: 0.5rem auto;
  }

  & > * {
    margin: 0 0.5rem;
  }

  &:disabled {
    color: ${p => p.theme.palette.white.main};
    background-color: rgba(255, 255, 255, 0.35);
  }
`
