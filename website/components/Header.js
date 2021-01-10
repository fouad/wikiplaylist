import Link from 'next/link'
import xw from 'xwind'
import { LogoWithText } from './Logo'

function Header({ children }) {
  return (
    <div css={xw`flex justify-between items-center`}>
      <div css={xw`flex items-center`}>{children}</div>
      <Link href="/">
        <a>
          <LogoWithText height={28} />
        </a>
      </Link>
    </div>
  )
}

export default Header
