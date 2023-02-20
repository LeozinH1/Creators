import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;

  align-items: center;
  justify-content: center;
`

export const Wrap = styled.div`
  display: flex;
  gap: 10px;
  width: 600px;

  > div {
    background-color: ${(props) => props.theme.colors.gray1};
    padding: 30px;
    border-radius: 4px;
    flex: 1;

    h1 {
      color: ${(props) => props.theme.colors.text};
      margin-bottom: 15px;
      font-size: 25px;
      font-weight: 600;
    }
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
  }
`

export const ToggleForm = styled.div`
  margin-top: 20px;
  text-align: center;

  > button {
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.primary};
    margin-left: 5px;
    transition: 0.2s;

    &:hover {
      text-decoration: underline;
    }
  }
`
