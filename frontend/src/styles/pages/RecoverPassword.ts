import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;

  align-items: center;
  justify-content: center;
`

export const Box = styled.div`
  background: ${(props) => props.theme.colors.gray1};
  padding: 40px;
  border-radius: 5px;
  width: 600px;
`

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;
`
