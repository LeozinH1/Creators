import { AxiosResponse, AxiosError } from 'axios'
import { api } from '../../services/api'
import Modal, { ModalHandles } from '../Modal'
import UserPhoto from '../UserPhoto'
import { AuthContext } from '../../contexts/AuthContext'

import {
    ChangeEvent,
    RefObject,
    useCallback,
    useRef,
    useState,
    useContext,
    useImperativeHandle,
    forwardRef,
} from 'react'

import {
    Wrapper,
    SaveButton,
    CancelButton,
    PreviewPhoto,
    EditPhotoContent,
    EditPhotoActions,
    SaveIcon,
    ClearIcon,
    FileIcon,
    UploadButton,
} from './styles'

import {
    ModalTitle,
    ModalContent,
    ModalClose,
    CloseIcon,
} from '../Modal/styles'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ComponentProps {
    avatar: string
    user_name: string
    refPhoto: RefObject<HTMLInputElement>
    type: 'creators' | 'users'
    dataLoading: boolean
}

export interface ComponentHandles {
    openModal: () => void
}

const ChangePhoto: React.ForwardRefRenderFunction<ComponentHandles, ComponentProps> = ({ avatar, user_name, refPhoto, type, dataLoading }, ref) => {
    const [previewPhoto, setPreviewPhoto] = useState('')
    const { refresh } = useContext(AuthContext)

    const changePhoto = () => {
        refPhoto.current?.click()
    }

    const photoChanged = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            const blob = URL.createObjectURL(e.target.files[0])
            setPreviewPhoto(blob)
        } else {
            setPreviewPhoto('')
        }
    }

    const savePhoto = (): void => {
        if (refPhoto.current?.files) {
            const data = new FormData()
            data.append(
                'avatar',
                refPhoto.current.files[0],
                refPhoto.current.files[0].name
            )
            api.patch(`/${type}/avatar`, data)
                .then((res: AxiosResponse) => {
                    refresh()
                    removePhoto()
                    toast.success('Avatar alterado com sucesso.', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark',
                    })
                })
                .catch((err: AxiosError) => {
                    console.log(err.response?.data)
                    toast.error(
                        'Ocorreu um erro ao tentar alterar seu avatar.',
                        {
                            position: 'top-right',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'dark',
                        }
                    )
                })
        }
    }

    const removePhoto = () => {
        if (refPhoto.current) {
            refPhoto.current.value = ''
            setPreviewPhoto('')
        }
    }

    const changePhotoModal = useRef<ModalHandles>(null)

    const openModal = useCallback(() => {
        changePhotoModal.current?.openModal()
    }, [])

    const closeModal = useCallback(() => {
        changePhotoModal.current?.closeModal()
    }, [])

    useImperativeHandle(ref, () => {
        return {
            openModal,
        }
    })

    return (
        <Wrapper>
            <input
                type="file"
                onChange={photoChanged}
                ref={refPhoto}
                accept="image/*"
            />

            <Modal ref={changePhotoModal}>
                <ModalClose onClick={closeModal} title="Fechar">
                    <CloseIcon />
                </ModalClose>

                <ModalTitle>Alterar Foto</ModalTitle>

                <ModalContent>
                    <EditPhotoContent>
                        <PreviewPhoto>
                            <UserPhoto
                                photo={avatar}
                                previewPhoto={previewPhoto}
                                username={user_name}
                                width={200}
                                height={200}
                                dataLoading={dataLoading}
                            />
                        </PreviewPhoto>

                        <EditPhotoActions>
                            {previewPhoto ? (
                                <>
                                    <CancelButton
                                        onClick={removePhoto}
                                        title="Remover Foto"
                                    >
                                        <ClearIcon /> Remover Foto
                                    </CancelButton>
                                    <SaveButton
                                        onClick={savePhoto}
                                        title="Salvar Foto"
                                    >
                                        <SaveIcon /> Salvar Foto
                                    </SaveButton>
                                </>
                            ) : (
                                <UploadButton
                                    onClick={changePhoto}
                                    title="Carregar Foto"
                                >
                                    <FileIcon />
                                    Carregar Foto
                                </UploadButton>
                            )}
                        </EditPhotoActions>
                    </EditPhotoContent>
                </ModalContent>
            </Modal>
        </Wrapper>
    )
}

ChangePhoto.displayName = 'ChangePhoto'

export default forwardRef(ChangePhoto)
