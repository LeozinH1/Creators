import styled from 'styled-components'
import {
  Wrapper as UserDropdown,
  Auth as UserAuth,
} from '../../components/UserDropdown/styles'

export const Header = styled.div`
  background-color: ${(props) => props.theme.colors.gray1};
  height: 80px;

  // Container
  > div {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;

    ${UserDropdown}, ${UserAuth} {
      // header_height - dropdown_height / 2 = 15px
      top: 15px;
    }

    // Logo
    > h1 {
      font-weight: 700;
      font-size: 1.1rem;
    }
  }
`

export const Main = styled.div`
  > div {
    height: calc(100vh - 80px); /* Decrease header size. */
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1200px) {
      flex-flow: column-reverse;
      gap: 60px;

      > div {
        flex: 0;
      }
    }
  }
`

export const MainText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 5px;

    span {
      font-size: 2.4rem;
      font-weight: 700;
      color: ${(props) => props.theme.colors.primary};
    }
  }

  h2 {
    font-size: 1.4rem;
  }

  span {
    font-size: 1.3rem;
  }

  a {
    margin-top: 30px;
    align-self: flex-start;
  }
`
export const MainDraw = styled.div`
  flex: 1;
  position: relative;
  height: 500px;
  width: 500px;

  @media screen and (max-width: 1200px) {
    height: 400px;
    width: 400px;
  }
`

export const About = styled.div`
  background-color: ${(props) => props.theme.colors.gray1};
  padding: 30px 0;
`

export const AboutContent = styled.div`
  text-align: center;

  > p {
    line-height: 30px;
    margin-bottom: 30px;
  }
`

export const SectionTitle = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 30px;
`
