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

const PaymentError: NextPage = () => {
    return (
        <>
            <Head>
                <title>Payment Error</title>
            </Head>

            <Wrapper>
                <MessageWrapper>
                    <ImageWrapper>
                        <Image
                            src={'/payment_error.svg'}
                            layout="fill"
                            alt="Payment Error"
                        />
                    </ImageWrapper>
                    <h1>Ocorreu um erro no seu pagamento!</h1>
                    <p>
                        Ops... Não conseguimos processar seu pagamento. Por
                        favor, tente novamente. Caso o erro persista, entre em
                        contato com o suporte: <br />{' '}
                        <b>suporte@creators.com.br</b>
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

export default PaymentError
