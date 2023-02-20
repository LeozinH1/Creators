import {
  Wrapper,
  CreatorPhoto,
  CreatorName,
  SubscriptionDetails,
} from './styles'
import Button from '../Elements/Button'
import Link from 'next/link'
import { api } from '../../services/api'
import Router from 'next/router'
import UserPhoto from '../UserPhoto'
import { format } from 'date-fns'
import { useRef, useCallback } from 'react'
import Formatter from '../../utils/formatCurrency'
import Textarea from '../Elements/Textarea'
import Modal, { ModalHandles } from '../Modal'
import {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalClose,
  CloseIcon,
} from '../Modal/styles'

import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AxiosError, AxiosResponse } from 'axios'

interface ItemProps {
  subscriptionId: string
  creatorName: string
  creatorId: string
  creatorAvatar?: string
  nextBill: Date
  price: number
  custom_url?: string
  status: string
  dataLoading: boolean
}

type CancelProps = {
  reason?: string
}

const ItemSubscribe: React.FC<ItemProps> = ({
  subscriptionId,
  creatorName,
  creatorAvatar,
  creatorId,
  nextBill,
  price,
  custom_url,
  status,
  dataLoading,
}) => {
  const cancelModal = useRef<ModalHandles>(null)

  const openModal = useCallback(() => {
    cancelModal.current?.openModal()
  }, [])

  const closeModal = useCallback(() => {
    cancelModal.current?.closeModal()
  }, [])

  const handleCancel = ({ reason }: CancelProps) => {
    api
      .post(`/subscribe/${subscriptionId}/cancel`, {
        reason: reason || 'Sem motivo.',
      })
      .then(() => {
        closeModal()
        toast.success('Assinatura cancelada com sucesso!', {
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

  const { register, handleSubmit } = useForm()

  return (
    <Wrapper>
      <Link href={`/creator/${custom_url || creatorId}`}>
        <a>
          <CreatorPhoto>
            <UserPhoto
              photo={creatorAvatar}
              width={60}
              height={60}
              username={creatorName}
              dataLoading={dataLoading}
            />
          </CreatorPhoto>

          <CreatorName>{creatorName}</CreatorName>
        </a>
      </Link>

      <SubscriptionDetails>
        {status == 'ACTIVE' && (
          <>
            Próxima cobrança será no dia{' '}
            <b>{format(new Date(nextBill), 'dd/MM/yy')}</b>, no valor de{' '}
            <b>{Formatter(price)}</b>.
          </>
        )}

        {status == 'CANCELLED' && (
          <>
            Assinatura termina em{' '}
            <b>{format(new Date(nextBill), 'dd/MM/yy')}</b>.
          </>
        )}
      </SubscriptionDetails>

      {status == 'ACTIVE' && (
        <Button onClick={openModal}> Cancelar Assinatura </Button>
      )}

      {status == 'CANCELLED' && <Button disabled> Cancelada </Button>}

      <Modal ref={cancelModal}>
        <ModalClose onClick={closeModal}>
          {' '}
          <CloseIcon />{' '}
        </ModalClose>

        <ModalTitle>Cancelar Assinatura?</ModalTitle>

        <ModalContent>
          Deseja realmente cancelar sua assinatura do criador{' '}
          <b>{creatorName}</b>? <br />
          Não será feito reembolso, você perderá o acesso ao conteúdo no dia{' '}
          {format(new Date(nextBill), 'dd/MM/yy')}.
          <br />
          <br />
          <form onSubmit={handleSubmit(handleCancel)}>
            <label>Motivo:</label>
            <Textarea
              {...register('reason')}
              maxLength={200}
              placeholder="Sem motivo."
            />
            <Button>Cancelar Assinatura</Button>
          </form>
        </ModalContent>

        <ModalFooter></ModalFooter>
      </Modal>
    </Wrapper>
  )
}

export default ItemSubscribe
