import styled from 'styled-components'
import { UploadFile, Save, Clear } from 'styled-icons/material'
import Button from '../Elements/Button'

export const Wrapper = styled.div`
    > input {
        display: none;
    }
`

export const UploadButton = styled(Button)`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px 15px;
`

export const SaveButton = styled(Button)`
    padding: 10px 15px;
`

export const CancelButton = styled(Button)`
    background: none;
    padding: 10px 15px;
    box-shadow: inset 0 0 0 3px ${(props) => props.theme.colors.gray4};
    color: ${(props) => props.theme.colors.text};

    &:hover {
        box-shadow: none;
        background-color: ${(props) => props.theme.colors.gray4};
    }
`

export const PreviewPhoto = styled.div`
    width: 200px;
    height: 200px;
`

export const EditPhotoContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    justify-content: space-between;
`

export const EditPhotoActions = styled.div`
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    width: 100%;
    margin-top: 40px;
`

export const SaveIcon = styled(Save)`
    width: 25px;
    min-width: 25px;
    color: #fff;
`

export const ClearIcon = styled(Clear)`
    width: 25px;
    min-width: 25px;
    color: ${(props) => props.theme.colors.text};
`

export const FileIcon = styled(UploadFile)`
    width: 25px;
    min-width: 25px;

    height: 25px;
    min-height: 25px;
    color: #fff;
`
