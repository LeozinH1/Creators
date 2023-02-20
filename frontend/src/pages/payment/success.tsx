import type { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Button from '../../components/Elements/Button'
import Link from 'next/link'

import styled from 'styled-components'

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    background: ${(props) => props.theme.colors.background};
`

const MessageWrapper = styled.div`
    background: ${(props) => props.theme.colors.gray1};
    width: 600px;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-flow: column;
    gap: 20px;

    text-align: center;

    h1 {
        font-size: 2rem;
    }
`

const ImageWrapper = styled.div`
    position: relative;
    height: 300px;
    margin: 20px 50px;
`

const PaymentSuccess: NextPage = () => {
    return (
        <>
            <Head>
                <title>Payment Success</title>
            </Head>

            <Wrapper>
                <MessageWrapper>
                    <ImageWrapper>
                        <Image
                            src={'/payment_success.svg'}
                            layout="fill"
                            alt="Payment Success"
                        />
                    </ImageWrapper>
                    <h1>Pagamento realizado com sucesso!</h1>
                    <p>
                        Obrigado por apoiar um criador. Seu pagamento está sendo
                        processado pela plataforma, em até 5 minutos você terá
                        acesso completo ao conteúdo disponibilizado pelo
                        criador.
                    </p>

                    <span>
                        <Link href="/">
                            <a>
                                <Button>Continuar</Button>
                            </a>
                        </Link>
                    </span>
                    {Router.router?.query.subscription_id && (
                        <>
                            <hr />
                            <span>
                                Subscription Identify:{' '}
                                {Router.router?.query.subscription_id}
                            </span>
                        </>
                    )}
                </MessageWrapper>
            </Wrapper>
        </>
    )
}

export default PaymentSuccess
