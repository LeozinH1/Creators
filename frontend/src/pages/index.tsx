import type { NextPage } from 'next'

import { Header, Main, MainText, MainDraw } from '../styles/pages/Home'

import { Container } from '../styles/layout'
import Button from '../components/Elements/Button'
import UserDropdown from '../components/UserDropdown'
import Tilt from 'react-parallax-tilt'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Creators</title>
      </Head>
      <Header>
        <Container>
          <h1>CREATORS</h1>

          <UserDropdown />
        </Container>
      </Header>

      <Main>
        <Container>
          <MainText>
            <h1>
              A PLATAFORMA PERFEITA PARA
              <span> CRIADORES DE CONTEÚDO</span>.
            </h1>
            <h2>Monetize seu conteúdo de maneira rápida e fácil.</h2>
            <Link href="/auth">
              <a>
                <Button>Começar</Button>
              </a>
            </Link>
          </MainText>

          <Tilt scale={0.93} transitionSpeed={2500}>
            <MainDraw>
              <Image
                src="/image_main.svg"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                alt="Main Draw"
              />
            </MainDraw>
          </Tilt>
        </Container>
      </Main>

      {/* <About>
                <Container>
                    <SectionTitle>SOBRE A PLATAFORMA</SectionTitle>

                    <AboutContent>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vivamus lectus tortor, vestibulum sit amet
                            suscipit et, iaculis molestie mi. Duis dictum auctor
                            tortor, ac finibus nunc pulvinar at. Vestibulum
                            vulputate ullamcorper sodales. In sagittis nisl nec
                            elit luctus, in pretium augue volutpat. Praesent in
                            venenatis odio. Orci varius natoque penatibus et
                            magnis dis parturient montes, nascetur ridiculus
                            mus. Praesent laoreet blandit elit, at rutrum dolor
                            luctus et.
                        </p>
                    </AboutContent>

                    <SectionTitle>PERFEITO PARA</SectionTitle>
                </Container>
            </About>

            <Footer /> */}
    </>
  )
}

export default Home
