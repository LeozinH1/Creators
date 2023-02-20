import styled from 'styled-components'

import { Wrapper as ItemCircleRef } from '../ItemCircle/styles'

export const Tooltip = styled.div`
    background-color: ${(props) => props.theme.colors.gray2};
    border-radius: 5px;
    position: absolute;
    bottom: 105px;
    z-index: 10000;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
    animation: zoomIn 0.2s linear both;

    ${ItemCircleRef} {
        margin-top: -40px;
    }

    &::after {
        content: '';
        background-color: ${(props) => props.theme.colors.gray2};
        width: 30px;
        height: 30px;
        position: absolute;
        bottom: -13px;
        transform: rotate(45deg);
        border-radius: 3px;
        z-index: -1;
    }

    &.float-right {
        left: 0;

        &::after {
            left: 25px;
        }
    }

    &.float-center {
        left: -110px;
    }

    &.float-left {
        right: 0;

        &::after {
            right: 25px;
        }
    }
`

export const TooltipContent = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    margin-top: -5px;

    word-wrap: break-word;
    hyphens: auto;

    > span {
        font-weight: 700;
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 20px;

        width: 260px;
    }

    > p {
        font-size: 0.8rem;
        text-align: center;
        width: 260px;
    }
`

export const UserBanner = styled.div`
    position: relative;
    width: 100%;
    height: 130px;
    border-radius: 5px 5px 0px 0px;
    overflow: hidden;
    background: linear-gradient(
        100deg,
        ${(props) => props.theme.colors.gray1} 0%,
        ${(props) => props.theme.colors.background} 100%
    );
`
