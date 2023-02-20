import styled from 'styled-components'
import { Autorenew } from 'styled-icons/material-rounded'
import { Paypal } from 'styled-icons/fa-brands'
import { Check } from 'styled-icons/fa-solid'

export const ComingSoon = styled.div`
  color: ${(props) => props.theme.colors.gray4};
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-top: 100px;
`

export const SubscribeButton = styled.div`
  width: 280px;
  height: 50px;
  background-color: ${(props) => props.theme.colors.gray1};
  display: flex;
  align-items: center;
  border-radius: 5px;
  font-weight: 700;
  position: relative;
  //overflow: hidden;

  button {
    flex: 1;
    height: 100%;
    border-radius: 5px 0 0 5px;
    padding: 0;
  }

  span {
    margin: 0 20px;
  }

  > div {
    position: absolute;
    width: 100%;
    bottom: 70px;
    right: 0;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.gray1};
    padding: 20px;
    transition: 0.2s;
    transform: scale(0);

    &.visible {
      transform: scale(1);
      animation: zoomIn 0.3s linear both;
    }

    &::after {
      content: '';
      background-color: ${(props) => props.theme.colors.gray1};
      width: 20px;
      height: 20px;
      display: block;
      position: absolute;
      bottom: -10px;
      left: 30px;
      transform: rotate(45deg);
      border-radius: 0 0 4px 0;
      z-index: -1;
    }

    > span {
      display: block;
      margin-bottom: 20px;
    }

    > ul {
      text-align: left;
      list-style: none;
      font-weight: 500;

      > li {
        padding: 5px;
      }
    }
  }
`

interface StyleProps {
  isLoading: boolean
}

export const LoadingIcon = styled(Autorenew)`
  color: #fff;
  width: 2rem;

  @-webkit-keyframes rotating /* Safari and Chrome */ {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
`

export const SubscriptionLoading = styled.div<StyleProps>`
  z-index: 5000;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  display: ${({ isLoading }) => (isLoading ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`

export const BuyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  > p {
    font-weight: 400;
    margin-bottom: 5px;
  }

  b {
    font-weight: 700;
  }

  > span {
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.5rem;
    font-weight: 700;
    margin-left: auto;
  }
`

export const BuyFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid ${(props) => props.theme.colors.gray2};
  padding-top: 30px;

  > span {
    font-weight: 700;
  }

  > p {
    color: ${(props) => props.theme.colors.gray4};
    margin-bottom: 20px;

    > a {
      color: ${(props) => props.theme.colors.gray4};
      text-decoration: underline;
    }
  }

  > div {
    display: flex;
    justify-content: right;
    gap: 10px;

    > button {
      background: none;
      border: none;
      color: ${(props) => props.theme.colors.text};
      font-size: 1rem;
      padding: 0 20px;
      border-radius: 5px;
      transition: 0.2s;

      &:hover {
        background-color: ${(props) => props.theme.colors.gray2};
      }
    }

    > div {
      position: relative;
    }
  }
`

export const PaypalIcon = styled(Paypal)`
  width: 15px;
  color: #ffff;
`

export const CheckIcon = styled(Check)`
  width: 15px;
  ${(props) => props.theme.colors.gray4};
`

export const PostWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 600px;
  margin: 0 auto;
  gap: 10px;

  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`

export const PostItem = styled.div`
  border-radius: 5px;
  // border: 1px solid ${(props) => props.theme.colors.gray4};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  width: 100%;
  background: ${(props) => props.theme.colors.gray1};
  overflow: hidden;
  position: relative;

  h1 {
    font-weight: 700;
    margin-bottom: 10px;
  }

  p {
    text-align: justify;
    font-weight: 400;
    font-size: 0.9rem;
    line-height: 25px;
  }
`

export const PostBanner = styled.div`
  background: ${(props) => props.theme.colors.gray2};
  height: 300px;
  position: relative;
  z-index: 1;
`

export const PostContent = styled.div`
  padding: 20px;
`

export const NewPost = styled.div`
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  background: ${(props) => props.theme.colors.gray1};
  padding: 20px;

  h1 {
    font-weight: 700;
    margin-bottom: 20px;
  }

  button {
    width: 100%;
    height: 60px;
    border: none;
    background: ${(props) => props.theme.colors.gray2};
    text-align: left;
    padding: 10px;
    color: ${(props) => props.theme.colors.gray4};
    border-radius: 5px;

    &:hover {
      background: ${(props) => props.theme.colors.gray3};
    }
  }
`

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  margin-top: 20px;

  * {
    font-size: 0.9rem;
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;

    button {
      background: none;
      border: none;
      color: ${(props) => props.theme.colors.text};
    }
  }
`

export const ShowMore = styled.div`
  margin-top: 20px;

  button {
    background: none;
    border: none;
    padding: 10px;
    padding: 10px 20px;
    color: ${(props) => props.theme.colors.text};

    &:hover {
      background: ${(props) => props.theme.colors.gray4};
      border-radius: 5px;
    }
  }
`

export const PostInfo = styled.div`
  * {
    color: ${(props) => props.theme.colors.gray4};
  }

  span {
    font-size: 0.8rem;
  }
`

export const EndPosts = styled.div`
  margin-top: 20px;

  span {
    color: ${(props) => props.theme.colors.gray4};
  }
`

export const DelPost = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 2;

  button {
    border-radius: 5px;
    background: ${(props) => props.theme.colors.error};
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.colors.textPrimary};
    border: none;
    font-weight: 700;
    font-size: 1.3rem;
    transition: 0.2s;

    &:hover {
      filter: grayscale(20%);
      transform: scale(1.1);
    }
  }
`

export const BannerPreview = styled.div`
  position: relative;
  width: 100%;
  height: 270px;
  border-radius: 5px;
  overflow: hidden;
`

export const LoadImage = styled.button`
  width: 100%;
  height: 100%;
  background: none;
  color: ${(props) => props.theme.colors.gray3};
  font-size: 5rem;
  border: 4px solid ${(props) => props.theme.colors.gray3};
  border-style: dashed;
  border-radius: 5px;
  transition: 0.1s;

  &:hover {
    font-size: 5.5rem;
  }
`

export const RemoveImage = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.error};
  color: ${(props) => props.theme.colors.text};
`
