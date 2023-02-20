import { Wrapper } from './styles'
import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}

const TextInput: React.FC<InputProps> = forwardRef(
    ({ ...props }, ref: React.Ref<HTMLInputElement>) => {
        return (
            <Wrapper>
                <label htmlFor={props.id}>{props.label}</label>
                <input ref={ref} {...props} />
            </Wrapper>
        )
    }
)

TextInput.displayName = 'TextInput'

export default TextInput
