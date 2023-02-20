import styled from 'styled-components'
import { Container } from '../../styles/layout'

export const Wrapper = styled.footer`
  background-color: ${(props) => props.theme.colors.gray1};
  padding: 50px 0;
  margin-top: 100px;

  ${Container} {
    display: flex;
    flex-flow: column;
    gap: 50px;
  }
`

export const FooterItems = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }

  section {
    display: block;
    flex: 1;

    span {
      display: block;
      margin-bottom: 20px;
      font-weight: 700;
      text-transform: uppercase;
    }

    a {
      color: ${(props) => props.theme.colors.gray4};
      transition: 0.2s;

      &:hover {
        color: ${(props) => props.theme.colors.text};
      }
    }

    p {
      line-height: 25px;
      color: ${(props) => props.theme.colors.gray4};
      font-weight: 500;
      text-align: justify;
    }
  }
`

export const FooterCopyright = styled.div`
  text-align: center;
`
