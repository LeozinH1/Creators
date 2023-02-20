import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 80px;
    height: 80px;
    background-color: ${(props) => props.theme.colors.gray1};
    border-radius: 50%;
    cursor: pointer;
    transition: 0.1s;
    position: relative;
    display: inline-block;
`
