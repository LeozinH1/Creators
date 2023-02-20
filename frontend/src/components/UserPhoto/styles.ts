import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden !important;
    background: ${(props) => props.theme.colors.background};

    position: relative;

    > div {
        // Fix Skeleton Loading margin top
        margin-top: -5px;
    }
`
