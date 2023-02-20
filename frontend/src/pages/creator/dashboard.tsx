import type { NextPage, GetServerSideProps } from 'next'
import { AuthContext } from '../../contexts/AuthContext'
import { parseCookies } from 'nookies'
import { Container, Content } from '../../styles/layout'
import { api } from '../../services/api'
import Navbar from '../../components/Navbar'
import ContentItem from '../../components/ContentItem'
import Banner from '../../components/Banner'
import MonthlyEarnings from '../../components/Gains/MonthlyEarnings'
import TotalEarnings from '../../components/Gains/TotalEarnings'
import Withdraw from '../../components/Gains/Withdraw'
import Footer from '../../components/Footer'
import Head from 'next/head'
import Loading from '../../components/Skeleton'
import UserInfo from '../../components/UserInfo'
import { useForm } from 'react-hook-form'
import Input from '../../components/Elements/Input'
import TextInput from '../../components/Elements/TextInput'
import CurrencyInput from '../../components/Elements/CurrencyInput'
import Button from '../../components/Elements/Button'
import Textarea from '../../components/Elements/Textarea'
import UserTooltip from '../../components/UserTooltip'
import { Group, AccountBalance, Settings } from '@styled-icons/material'
import strToUrl from '../../utils/stringToUrl'
import { AxiosError, AxiosResponse } from 'axios'
import { getAPIClient } from '../../services/axios'
import ChangeBanner from '../../components/ChangeBanner'
import ChangePhoto, { ComponentHandles } from '../../components/ChangePhoto'
import { useContext, useEffect, useState, useCallback, useRef } from 'react'
import NumberFormat from 'react-number-format'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Members {
  user_id: {
    id: string
    name: string
    email: string
    avatar?: string
    banner?: string
    description: string
    custom_url?: string
    status: boolean
    created_at: Date
    updated_at: Date
  }
}

interface Earnings {
  payments: number
  payouts: number
}

interface EditProps {
  creator_name?: string
  creator_description?: string
  creator_url?: string
  creator_ua?: string
}

interface Withdraw {
  id: string
  creator_id: string
  total: number
  currency: string
  transaction_fee: number
  currency_fee: number
  status: string
  receiver: string
}

const CreatorDashboard: NextPage = () => {
  const { dataLoading, creator, refresh } = useContext(AuthContext)

  const [members, setMembers] = useState<Members[]>([])
  const [membersLoading, setMembersLoading] = useState(true)

  const [earnings, setEarnings] = useState<Earnings>({} as Earnings)
  const [earningsLoading, setEarningsLoading] = useState(true)

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const [price, setPrice] = useState<number>(0)
  const handleValueChange = useCallback((val) => {
    setPrice(val)
  }, [])

  useEffect(() => {
    if (creator) {
      // Get Member List
      api
        .get(`/subscribe/${creator?.id}/members`)
        .then((response: AxiosResponse) => {
          setMembers(response.data)
          setMembersLoading(false)
        })
        .catch((err: AxiosError) => {
          console.log(err.response?.data)
        })

      // Get Earnings
      api
        .get('/creators/earnings/view')
        .then((response: AxiosResponse) => {
          setEarnings(response.data)
          setEarningsLoading(false)
        })
        .catch((err: AxiosError) => {
          console.log(err.response?.data)
        })
    }
  }, [creator])

  async function handleSave({
    creator_name,
    creator_description,
    creator_url,
    creator_ua,
  }: EditProps) {
    api
      .post('creators/update', {
        name: creator_name,
        description: creator_description,
        url: creator_url,
        price: price / 100,
        ua: creator_ua,
      })
      .then(() => {
        refresh()
        resetField('creator_name')
        resetField('creator_description')
        resetField('creator_url')
        resetField('creator_price')
        resetField('creator_ua')

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })

        toast.success('Informações alteradas com sucesso!', {
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

  const convertToUrl = () => {
    const val = getValues()
    setValue('creator_url', strToUrl(val.creator_url))
  }

  const [previewBanner, setPreviewBanner] = useState('')

  const refBanner = useRef<HTMLInputElement>(null)
  const refPhoto = useRef<HTMLInputElement>(null)

  const changePhotoRef = useRef<ComponentHandles>(null)

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Banner
        userBanner={creator?.banner}
        previewBanner={previewBanner}
        dataLoading={dataLoading}
      >
        <ChangeBanner
          setPreviewBanner={setPreviewBanner}
          refBanner={refBanner}
          type="creators"
        />
      </Banner>

      <UserInfo
        avatar={creator?.avatar}
        name={creator?.creator_name}
        description={creator?.description}
        dataLoading={dataLoading}
        editable
        openEditModal={() => changePhotoRef.current?.openModal()}
      />

      <ChangePhoto
        avatar={creator?.avatar}
        user_name={creator?.creator_name}
        refPhoto={refPhoto}
        type="creators"
        dataLoading={dataLoading}
        ref={changePhotoRef}
      />

      <Container>
        <Content>
          <ContentItem background>
            <span>
              <AccountBalance /> ganhos
            </span>
            <div>
              <MonthlyEarnings
                value={earnings?.payments}
                earningsLoading={earningsLoading}
              />
              <TotalEarnings
                value={earnings?.payouts}
                earningsLoading={earningsLoading}
              />
              <Withdraw payments={earnings?.payments} />
            </div>
          </ContentItem>

          <ContentItem background>
            <span>
              <Settings /> editar
            </span>
            <div>
              <form onSubmit={handleSubmit(handleSave)}>
                <div>
                  <label>Nome de exibição</label>
                  <Input
                    {...register('creator_name', {
                      minLength: {
                        value: 3,
                        message:
                          'Seu nome deve possuir no minimo 3 caracteres.',
                      },
                      maxLength: {
                        value: 30,
                        message:
                          'Seu nome deve possuir no máximo 30 caracteres.',
                      },
                      pattern: {
                        value: /^[a-z0-9 _]+$/i,
                        message:
                          'Seu nome não pode conter caracteres especiais.',
                      },
                    })}
                    hasError={errors.creator_name}
                    placeholder={creator?.creator_name}
                  >
                    {errors.creator_name && (
                      <label role="alert">{errors.creator_name.message}</label>
                    )}
                  </Input>
                </div>

                <div>
                  <label>Sobre Mim</label>
                  <Textarea
                    maxLength={200}
                    {...register('creator_description')}
                    placeholder={creator?.description || 'Sem informações.'}
                  />
                </div>

                <div>
                  <label>Url Personalizada</label>
                  <small>
                    Link personalizado para acessar seu perfil de criador.
                  </small>
                  <Input
                    {...register('creator_url', {
                      minLength: {
                        value: 4,
                        message:
                          'Sua url personalizada deve ter no mínimo 4 caracteres.',
                      },
                      maxLength: {
                        value: 30,
                        message:
                          'Sua url personalizada deve ter no máximo 30 caracteres.',
                      },
                    })}
                    hasError={errors.creator_url}
                    placeholder={creator?.custom_url || creator?.id}
                    onBlur={convertToUrl}
                  >
                    {errors.creator_url && (
                      <label role="alert">{errors.creator_url.message}</label>
                    )}
                  </Input>
                </div>

                <div>
                  <label>Valor da Assinatura</label>
                  <small>
                    Valor que os usuários pagam por mês para ter acesso ao seu
                    conteúdo exclusivo.
                  </small>
                  <CurrencyInput
                    max={10000}
                    onValueChange={handleValueChange}
                    value={price}
                    placeHolder={creator?.price}
                  />
                </div>

                {/* <label>Google Analytics</label>
                <TextInput
                  {...register('creator_ua')}
                  label="UA-"
                  placeholder={creator?.google_ua || '64282345-10'}
                /> */}

                <Button> Salvar </Button>
              </form>
            </div>
          </ContentItem>

          <ContentItem>
            <span>
              <Group /> membros
            </span>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {membersLoading ? (
                <Loading circle width={80} height={80} />
              ) : members?.length > 0 ? (
                members?.map((member: Members) => (
                  <UserTooltip
                    key={member.user_id.id}
                    user_id={member.user_id.id}
                    user_name={member.user_id.name}
                    user_description={member.user_id.description}
                    user_banner={member.user_id.banner}
                    user_avatar={member.user_id.avatar}
                    custom_url={member.user_id.custom_url}
                    dataLoading={false}
                  />
                ))
              ) : (
                <span>Você não possui nenhum assinante ativo.</span>
              )}
            </div>
          </ContentItem>
        </Content>
      </Container>

      <Footer />
    </>
  )
}

export default CreatorDashboard

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'creators-token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  // Check if user is creator
  const apiClient = getAPIClient(ctx)
  const getCreator = await apiClient.get('/sessions')

  if (!getCreator.data.creator) {
    return {
      redirect: {
        destination: '/creator/new',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
