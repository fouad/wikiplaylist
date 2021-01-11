import Link from 'next/link'

function LinkIfExists({ anchor = true, className, href, target, children }) {
  if (!href) {
    return <>{children}</>
  }

  if (!anchor) {
    return <Link href={href}>{children}</Link>
  }

  return (
    <Link href={href}>
      <a target={target} className={className}>
        {children}
      </a>
    </Link>
  )
}

export default LinkIfExists
