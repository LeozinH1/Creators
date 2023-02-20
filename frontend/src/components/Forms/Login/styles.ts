import styled from 'styled-components'

export const Teste = styled.div`
  display: flex;
  flex-flow: row-reverse;
  align-items: center;
  justify-content: space-between;
  gap: 5px;

  > button {
    &.btnLink {
      background: none;
      border: none;
      color: ${(props) => props.theme.colors.primary};
      margin-left: 5px;
      transition: 0.2s;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`
export const RecoverContent = styled.div`
  > p {
    margin-bottom: 20px;
    font-weight: 400;
  }
`
