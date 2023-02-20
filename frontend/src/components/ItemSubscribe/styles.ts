import styled from 'styled-components'

export const Wrapper = styled.div`
    background-color: ${(props) => props.theme.colors.gray1};
    height: 100px;
    width: 100%;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 20px;

    margin-bottom: 10px;

    > a {
        display: flex;
        align-items: center;
    }
`

export const CreatorPhoto = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.gray2};
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
`

export const CreatorName = styled.div`
    flex: 1;
    font-weight: 700;
    margin-left: 20px;
    font-size: 1rem;
`

export const SubscriptionDetails = styled.div`
    flex: 1;
    text-align: right;
    margin-right: 20px;
    font-weight: 500;
    font-size: 12px;
`
