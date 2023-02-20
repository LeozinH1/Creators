import styled from 'styled-components'

export const Container = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    position: relative;
    height: 100%;

    @media screen and (max-width: 1200px) {
        margin: 0 20px;
    }
`

interface ContentProps {
    background?: boolean
}

export const Content = styled.div<ContentProps>`
    width: 100%;
    margin-top: 30px;

    background: ${({ background }) =>
        background ? (props) => props.theme.colors.gray1 : 'none'};
    padding: ${({ background }) => (background ? '40px' : '0')};
    border-radius: ${({ background }) => (background ? '4px' : '0')};

    display: flex;
    flex-direction: column;
`
