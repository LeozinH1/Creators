import type { NextPage } from 'next'
import { Header } from '../styles/pages/Home'
import { Container } from '../styles/layout'
import UserDropdown from '../components/UserDropdown'
import Head from 'next/head'

const Feed: NextPage = () => {
  return (
    <>
      <Head>
        <title>Feed</title>
      </Head>
      <Header>
        <Container>
          <h1>FEED</h1>

          <UserDropdown />
        </Container>
      </Header>
    </>
  )
}

export default Feed
