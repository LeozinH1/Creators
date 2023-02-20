import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { useRouter } from 'next/router'
import { Container, Content } from '../../styles/layout'
import Loading from '../../components/Skeleton'
import ContentItem from '../../components/ContentItem'
import Banner from '../../components/Banner'
import UserPhoto from '../../components/UserPhoto'
import ItemCircle from '../../components/ItemCircle'
import Head from 'next/head'
import Link from 'next/link'
import Footer from '../../components/Footer'
import UserInfo from '../../components/UserInfo'
import { HowToReg } from '@styled-icons/material'
import UserTooltip from '../../components/UserTooltip'

interface UserData {
  id: string
  name: string
  email: string
  avatar: string
  banner: string
  description: string
  status: boolean
  createdAt: Date
}

interface Subscription {
  id: string
  creator_id: {
    id: string
    user_id: string
    creator_name: string
    description: string
    avatar?: string
    custom_url?: string
    banner?: string
    plan_id: string
    status: boolean
    created_at: Date
    updated_at: Date
  }
  user_id: string
  status: string
  approve_link: string
  next_billing: Date
  subscription_id: string
  cancel_reason?: string
  payer_id: string
  created_at: Date
  updated_at: Date
}

const UserProfile: NextPage = () => {
  const [userData, setUserData] = useState<UserData>()

  const router = useRouter()
  const user_id = router.query.user_id

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [userDataLoading, setUserDataLoading] = useState(true)
  const [subsLoading, setSubsLoading] = useState(true)

  useEffect(() => {
    if (user_id) {
      api
        .get(`/users/${user_id}`)
        .then((response) => {
          setUserData(response.data)
          setUserDataLoading(false)
        })
        .catch((err) => {
          router.push('/error_on_get_user_profile')
        })

      api.get(`/subscribe/${user_id}/subscriptions`).then((response) => {
        setSubscriptions(response.data)
        setSubsLoading(false)
      })
    }
  }, [user_id])

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>

      <Banner userBanner={userData?.banner} dataLoading={userDataLoading} />

      <UserInfo
        avatar={userData?.avatar}
        name={userData?.name}
        description={userData?.description}
        dataLoading={userDataLoading}
      />

      <Container>
        <Content>
          <ContentItem>
            <span>
              <HowToReg />
              assinante dos criadores
            </span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {subsLoading ? (
                <Loading circle width={80} height={80} />
              ) : subscriptions.length > 0 ? (
                subscriptions.map((subscription: Subscription) => (
                  <UserTooltip
                    key={subscription.creator_id.id}
                    user_id={subscription.creator_id.id}
                    user_name={subscription.creator_id.creator_name}
                    user_description={subscription.creator_id.description}
                    user_banner={subscription.creator_id.banner}
                    user_avatar={subscription.creator_id.avatar}
                    custom_url={subscription.creator_id.custom_url}
                    isCreator
                    dataLoading={false}
                  />
                ))
              ) : (
                <span>Nenhuma assinatura ativa.</span>
              )}
            </div>
          </ContentItem>
        </Content>
      </Container>

      <Footer />
    </>
  )
}

export default UserProfile
