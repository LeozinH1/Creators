import styled from 'styled-components'
import { ThreeBars } from '@styled-icons/octicons'

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.gray1};
  width: 100%;
  border-radius: 5px;

  > ul {
    height: 60px;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;

    li {
      display: inline-block;
      margin: 0 30px;

      border-radius: 5px;
      transition: 0.2s;

      &.active {
        background-color: ${(props) => props.theme.colors.gray2};

        * {
          color: ${(props) => props.theme.colors.text};
          cursor: pointer;
        }
      }

      &.disabled {
        * {
          color: ${(props) => props.theme.colors.gray4};
          cursor: not-allowed;
        }
      }

      a,
      span {
        display: block;
        padding: 15px;
      }
    }

    @media screen and (max-width: 1200px) {
      display: none;
    }
  }
`

export const MenuIcon = styled(ThreeBars)`
  width: 25px;
  color: ${(props) => props.theme.colors.text};
`

export const MobileNav = styled.div`
  display: none;
  padding: 5px 15px;
  flex-direction: column;

  div {
    display: flex;
    height: 60px;
    align-items: center;

    h3 {
      flex: 1;
      color: ${(props) => props.theme.colors.gray3};
    }

    button {
      border-radius: 5px;
      cursor: pointer;
      border: none;
      padding: 10px;
      background-color: ${(props) => props.theme.colors.gray2};
      transition: 0.2s;

      &:hover {
        background-color: ${(props) => props.theme.colors.gray3};
      }
    }
  }

  height: 3.5rem;
  overflow: hidden;
  transition: height 180ms ease-out;

  ul {
    list-style: none;
    padding: 10px 0;

    li {
      &.active {
        * {
          cursor: pointer;
          background-color: ${(props) => props.theme.colors.gray2};
        }
      }

      &.disabled {
        * {
          cursor: not-allowed;
          color: ${(props) => props.theme.colors.gray4};
        }
      }

      a,
      span {
        padding: 20px;
        display: block;
        transition: 0.2s;
        border-radius: 5px;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    display: flex;
  }
`
