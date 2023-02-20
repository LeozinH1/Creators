import styled from 'styled-components'

import { User, Cog, ChartLine, Star, Plus, Moon } from '@styled-icons/fa-solid'

import { BroadActivityFeed } from '@styled-icons/fluentui-system-filled'

interface StyleProps {
  state?: boolean
}

export const Wrapper = styled.div<StyleProps>`
  z-index: 1000;
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 0;
  right: 0;

  ul {
    background-color: ${(props) => props.theme.colors.gray1};
    border-radius: 5px;
    display: inline-block;
    padding: 20px;
    text-align: left;
    list-style: none;
    margin-top: 10px;
    overflow: hidden;
    min-width: 300px;

    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);

    display: ${({ state }) => (state ? 'block' : 'none')};

    animation: zoomIn 0.2s linear both;

    li {
      &.section-title {
        color: ${(props) => props.theme.colors.gray4};
        font-size: 0.7rem;
        text-transform: uppercase;
        margin-top: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        user-select: none;

        &:after {
          content: '';
          width: 100%;
          height: 1px;
          background: ${(props) => props.theme.colors.gray3};
          display: block;
        }

        &.section-title:first-child {
          margin-top: 0;
        }
      }

      > a,
      > label {
        color: ${(props) => props.theme.colors.text};
        padding: 15px 20px;
        display: flex;
        border-radius: 5px;
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
        font-weight: 500;

        > span {
          margin-left: 30px;
          display: block;
          flex: 1;
        }

        &:hover {
          background-color: ${(props) => props.theme.colors.gray2};
        }
      }

      button {
        margin-top: 10px;
        width: 100%;
      }
    }
  }
`

export const UserPhotoButton = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.gray2};
  border-radius: 50%;
  cursor: pointer;
  position: relative;

  margin-left: auto;
`

export const Auth = styled.div`
  a {
    transition: 0.2s;
    display: inline-block;
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 50px;
    cursor: pointer;
    padding: 15px 20px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
  }
`

export const UserIcon = styled(User)`
  width: 20px;
  color: ${(props) => props.theme.colors.gray4};
`

export const CogIcon = styled(Cog)`
  width: 20px;
  color: ${(props) => props.theme.colors.gray4};
`

export const CreatorIcon = styled(Star)`
  width: 20px;
  color: ${(props) => props.theme.colors.gray4};
`

export const DashboardIcon = styled(ChartLine)`
  width: 20px;
  color: ${(props) => props.theme.colors.gray4};
`

export const NewCreatorIcon = styled(Plus)`
  width: 20px;
  color: ${(props) => props.theme.colors.gray4};
`

export const ThemeIcon = styled(Moon)`
  width: 20px;
  color: ${(props) => props.theme.colors.gray4};
`
export const FeedIcon = styled(BroadActivityFeed)`
  width: 20px;
  color: ${(props) => props.theme.colors.gray4};
`
