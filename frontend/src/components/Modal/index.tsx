import { Wrapper, ModalBox } from './styles'
import React, {
    forwardRef,
    useState,
    useCallback,
    useImperativeHandle,
} from 'react'

import Portal from '../../HOC/Portal'

export interface ModalProps {
    children?: React.ReactNode
}

export interface ModalHandles {
    openModal: () => void
    closeModal: () => void
}

const Modal: React.ForwardRefRenderFunction<ModalHandles, ModalProps> = (
    { children },
    ref
) => {
    const [visible, setVisible] = useState(false)

    useImperativeHandle(ref, () => {
        return {
            openModal,
            closeModal,
        }
    })

    const openModal = useCallback(() => {
        setVisible(true)
    }, [])

    const closeModal = useCallback(() => {
        setVisible(false)
    }, [])

    if (!visible) {
        return null
    }

    return (
        <Portal>
            <Wrapper>
                <ModalBox>{children}</ModalBox>
            </Wrapper>
        </Portal>
    )
}

Modal.displayName = 'Modal'

export default forwardRef(Modal)
