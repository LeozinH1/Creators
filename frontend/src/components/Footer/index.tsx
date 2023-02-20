import { Wrapper, FooterItems, FooterCopyright } from './styles'
import { Container } from '../../styles/layout'
import { Discord } from '@styled-icons/boxicons-logos'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <>
      <Wrapper>
        <Container>
          <FooterItems>
            <section>
              <span>sobre</span>
              <p>
                Incentive seu criador de conteúdo favorito a continuar com seu
                belo trabalho pagando um valor mensalmente. Em troca você
                receberá acesso à uma área apenas para assinantes. Nesta área
                você encontrará diversas coisas exclusivas disponibilizadas pelo
                criador.
              </p>
            </section>

            <section>
              <span>TAXAS</span>
              <p>Cobramos apenas uma taxa de 5% em cada retirada.</p>
            </section>

            <section>
              <span>contato</span>
              <p>
                <Link href="https://discord.gg/S6xbebVKCK">
                  <a target={'_blank'}>
                    <Discord width={40} />
                  </a>
                </Link>
              </p>
            </section>
          </FooterItems>
          <FooterCopyright>
            Powered by <b>LeozinH1</b>
          </FooterCopyright>
        </Container>
      </Wrapper>
    </>
  )
}

export default Footer
