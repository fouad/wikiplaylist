import Link from 'next/link'

function LinkIfExists({ href, children }) {
  if (!href) {
    return <>{children}</>
  }

  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  )
}

export default LinkIfExists
