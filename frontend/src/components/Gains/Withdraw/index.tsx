import { Wrapper } from './styles'
import { api } from '../../../services/api'
import Button from '../../Elements/Button'
import Input from '../../Elements/Input'
import { useRef, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AxiosError, AxiosResponse } from 'axios'

import Modal, { ModalHandles } from '../../Modal'
import {
  ModalTitle,
  ModalContent,
  ModalClose,
  CloseIcon,
} from '../../Modal/styles'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface PayoutProps {
  pix: string
  pass: string
}

interface WithdrawProps {
  payments: number
}

const Withdraw: React.FC<WithdrawProps> = ({ payments }) => {
  const withDrawModal = useRef<ModalHandles>(null)

  const openModal = useCallback(() => {
    if (payments >= 100) {
      withDrawModal.current?.openModal()
    } else {
      toast.error(
        'Você precisa ter no mínimo R$100,00 para poder solicitar o saque.',
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
    }
  }, [])

  const closeModal = useCallback(() => {
    withDrawModal.current?.closeModal()
  }, [])

  const [payoutPending, setPayoutPending] = useState(true)

  const handlePayout = async ({ pix, pass }: PayoutProps) => {
    api
      .post('/creators/payout', {
        pix,
        pass,
      })
      .then(() => {
        closeModal()
        setPayoutPending(true)
        toast.success('Solicitação enviada com sucesso!', {
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
        toast.error(err.response?.data.message, {
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

  useEffect(() => {
    api
      .get('/creators/payout/status')
      .then((res: AxiosResponse) => {
        setPayoutPending(res.data.pending)
      })
      .catch((err: AxiosError) => {
        console.log(err.response)
      })
  }, [])

  const { register, handleSubmit } = useForm()

  return (
    <Wrapper>
      {payoutPending ? (
        <Button disabled>Retirada Pendente</Button>
      ) : (
        <Button onClick={openModal}>Retirar</Button>
      )}

      <Modal ref={withDrawModal}>
        <ModalClose onClick={closeModal}>
          <CloseIcon />
        </ModalClose>

        <ModalTitle>RETIRAR DINHEIRO</ModalTitle>

        <ModalContent>
          <form onSubmit={handleSubmit(handlePayout)}>
            <label>Chave Pix</label>
            <Input type="text" {...register('pix')} />

            <label>Senha</label>
            <Input type="password" {...register('pass')} />

            <Button>Solicitar Saque</Button>
          </form>
        </ModalContent>
      </Modal>
    </Wrapper>
  )
}

export default Withdraw
