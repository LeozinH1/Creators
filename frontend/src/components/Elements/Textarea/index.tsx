import {
    TextareaHTMLAttributes,
    forwardRef,
    useState,
    ChangeEvent,
    useCallback,
} from 'react'

import { TextareaStyle, Wrapper } from './styles'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
}

const Textarea: React.FC<TextareaProps> = forwardRef(
    ({ label, ...props }, ref: React.Ref<HTMLTextAreaElement>) => {
        const [max, setMax] = useState(props.maxLength as number)

        const handleChange = useCallback(
            (e: ChangeEvent<HTMLTextAreaElement>): void => {
                if (props.maxLength) {
                    setMax(props.maxLength - e.target.value.length)
                }
            },
            [props.maxLength]
        )

        return (
            <Wrapper max={max}>
                {label && <label>{label}</label>}
                <TextareaStyle
                    ref={ref}
                    onChange={handleChange}
                    rows={5}
                    {...props}
                ></TextareaStyle>
                {props.maxLength && <div>{max} caracteres</div>}
            </Wrapper>
        )
    }
)

Textarea.displayName = 'Textarea'

export default Textarea
