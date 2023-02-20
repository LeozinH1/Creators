import Switch, { ReactSwitchProps } from 'react-switch'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import styled from 'styled-components'

interface ComponentProps extends ReactSwitchProps {
    text?: string
}

const Wrapper = styled.label`
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    user-select: none;
`

const ToggleSwitch: React.FC<ComponentProps> = ({ text, ...rest }) => {
    const themeContext = useContext(ThemeContext)

    return (
        <Wrapper>
            <Switch
                offColor={themeContext.colors.gray3}
                onColor={themeContext.colors.gray3}
                offHandleColor={themeContext.colors.gray4}
                onHandleColor={themeContext.colors.primary}
                uncheckedIcon={false}
                checkedIcon={false}
                {...rest}
            />
            <label>{text}</label>
        </Wrapper>
    )
}

export default ToggleSwitch
