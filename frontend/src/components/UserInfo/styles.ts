import styled from 'styled-components'
import { SubscribeButton } from '../../styles/pages/CreatorProfile'

export const Wrapper = styled.div`
    position: relative;
    padding: 20px;
    padding-top: 80px;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    // Subscribe Button
    ${SubscribeButton} {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0%, -50%);

        @media screen and (max-width: 1200px) {
            position: static;
            transform: translate(0%, 0%);
            margin-top: 20px;
        }
    }
`

export const UserName = styled.h1`
    margin-bottom: 10px;
    max-width: 400px;
    font-size: 2.5rem;
    font-weight: 700;
    word-wrap: break-word;
    hyphens: auto;
`

export const UserDescription = styled.span`
    display: block;
    font-size: 15px;
    max-width: 400px;
    word-wrap: break-word;
    hyphens: auto;
`

export const ProfilePhoto = styled.div`
    height: 130px;
    width: 130px;
    position: absolute;
    top: calc(130px / 2 * -1);
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary};
`

export const EditPhotoBtn = styled.button`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: ${(props) => props.theme.colors.primary};
    color: #fff;
    border: none;
    height: 0px;
    font-size: 0.9rem;
    overflow: hidden;
    transition: 0.2s;

    &.hovered {
        height: 40px;
    }
`
