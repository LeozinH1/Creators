import {
  Wrapper,
  ButtonSecondary,
  CancelButton,
  CameraIcon,
  SaveIcon,
  ClearIcon,
} from './styles'

import {
  ChangeEvent,
  RefObject,
  Dispatch,
  SetStateAction,
  useState,
} from 'react'

import { AxiosResponse, AxiosError } from 'axios'
import { api } from '../../services/api'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ComponentProps {
  refBanner: RefObject<HTMLInputElement>
  setPreviewBanner: Dispatch<SetStateAction<string>>
  type: 'creators' | 'users'
}

const ChangeBanner: React.FC<ComponentProps> = ({
  refBanner,
  setPreviewBanner,
  type,
}) => {
  const [exists, setExists] = useState(false)

  const bannerChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const blob = URL.createObjectURL(e.target.files[0])
      setPreviewBanner(blob)
      setExists(true)
    } else {
      setPreviewBanner('')
      setExists(false)
    }
  }

  const saveBanner = (): void => {
    if (refBanner.current?.files) {
      const data = new FormData()
      data.append(
        'banner',
        refBanner.current.files[0],
        refBanner.current.files[0].name
      )
      api
        .patch(`/${type}/banner`, data)
        .then((res: AxiosResponse) => {
          setExists(false)
          toast.success('Capa alterada com sucesso.', {
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
          toast.error('Ocorreu um erro ao tentar alterar sua capa.', {
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
    }
  }

  const removeBanner = () => {
    if (refBanner.current) {
      refBanner.current.value = ''
      setPreviewBanner('')
      setExists(false)
    }
  }

  const changeBanner = () => {
    refBanner.current?.click()
  }

  return (
    <Wrapper>
      <input
        type="file"
        onChange={bannerChanged}
        ref={refBanner}
        accept="image/*"
      />

      {exists ? (
        <>
          <CancelButton onClick={removeBanner} title="Cancelar">
            <ClearIcon />
          </CancelButton>
          <ButtonSecondary onClick={saveBanner} title="Salvar">
            <SaveIcon />
          </ButtonSecondary>
        </>
      ) : (
        <ButtonSecondary onClick={changeBanner} title="Alterar Capa">
          <CameraIcon /> <span>Alterar Capa</span>
        </ButtonSecondary>
      )}
    </Wrapper>
  )
}

export default ChangeBanner
