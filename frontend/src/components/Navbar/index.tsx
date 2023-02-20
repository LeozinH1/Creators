import { Wrapper, MobileNav, MenuIcon } from './styles'
import Link from 'next/link'
import { useRef } from 'react'

const Navbar: React.FC = () => {
  const main = useRef<HTMLDivElement>(null)
  const btn = useRef(null)
  let contentHeight = 3.5

  const hideMenu = (): void => {
    if (main.current) {
      contentHeight = 3.5
      main.current.style.height = `${contentHeight}rem`
    }
  }

  const showMenu = (): void => {
    if (main.current) {
      contentHeight = main.current.scrollHeight
      contentHeight =
        contentHeight /
        parseFloat(getComputedStyle(document.documentElement).fontSize)
      main.current.style.height = `${contentHeight}rem`
    }
  }

  const toggleMenu = () => {
    if (contentHeight == 3.5) {
      showMenu()
    } else {
      hideMenu()
    }
  }

  return (
    <Wrapper>
      <ul>
        <li className="active">
          <span>FEED</span>
        </li>
        <li className="disabled">
          <span>SORTEIOS</span>
        </li>
        <li className="disabled">
          <span>CUPONS</span>
        </li>
        <li className="disabled">
          <span>DIVULGAR</span>
        </li>
        <li className="disabled">
          <span>LOJA</span>
        </li>
        <li className="disabled">
          <span>CHAT</span>
        </li>
      </ul>

      <MobileNav ref={main}>
        <div>
          <h3>MENU</h3>
          <button onClick={toggleMenu}>
            <MenuIcon />
          </button>
        </div>

        <ul ref={btn}>
          <li className="active">
            <span>FEED</span>
          </li>
          <li className="disabled">
            <span>SORTEIOS</span>
          </li>
          <li className="disabled">
            <span>CUPONS</span>
          </li>
          <li className="disabled">
            <span>DIVULGAR</span>
          </li>
          <li className="disabled">
            <span>LOJA</span>
          </li>
          <li className="disabled">
            <span>CHAT</span>
          </li>
        </ul>
      </MobileNav>
    </Wrapper>
  )
}

export default Navbar
