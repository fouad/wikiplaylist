import styled from '@emotion/styled'
import xw, { cx } from 'xwind'
import Link from 'next/link'
import LinkIfExists from './LinkIfExists'

export const PlaylistDisplayName = styled.span(xw`
  block text-gray-900 leading-5 font-semibold
`)

export const PlaylistSubtitle = styled.span(xw`
  block truncate max-w-md
  text-gray-500
`)

export const PlaylistAuthor = PlaylistSubtitle

export const PlaylistContentLink = styled.span(xw`
  block truncate whitespace-nowrap max-w-xs
  text-gray-400
`)

export const PlaylistContentImage = styled.div(xw`
  block w-12 h-12 bg-gray-100 bg-cover rounded-md overflow-hidden border border-gray-300
`)

export const PlaylistContentImageWrapper = styled.div(xw`
  block pr-3
`)

export const PlaylistInfo = ({ href, playlist }) => (
  <>
    <LinkIfExists anchor href={href}>
      <PlaylistDisplayName css={xw`hover:opacity-80`}>
        {playlist?.displayName}
      </PlaylistDisplayName>
    </LinkIfExists>
    <LinkIfExists anchor href={href}>
      <PlaylistAuthor css={xw`hover:opacity-80`}>
        {playlist?.props?.author}{' '}
        {playlist?.props?.patreon && (
          <span css={xw`text-gray-400`}>· For Patrons Only</span>
        )}
      </PlaylistAuthor>
    </LinkIfExists>
  </>
)

export const PlaylistContentInfo = ({ item, href }) => {
  const itemHref = item?.props?.href || ''
  const cleanUrl = unescape(itemHref.replace('https://', '').split('#')[0])
  return (
    <div css={xw`relative overflow-hidden`}>
      <LinkIfExists anchor href={href}>
        <PlaylistDisplayName>{item?.displayName}</PlaylistDisplayName>
        <PlaylistContentLink href={href}>{cleanUrl}</PlaylistContentLink>
      </LinkIfExists>
    </div>
  )
}

const PlaylistContentItemStyled = styled.div(xw`
  flex px-4 py-3
  hover:bg-gray-100 active:bg-gray-200
`)

export const PlaylistContentStatus = styled.span(xw`
  flex justify-center items-center
  w-3 mr-2
  text-gray-500
`)

export const PlaylistContentItem = ({
  item,
  active,
  className,
  children,
  onContentItemClick,
  ...props
}) => {
  let href =
    item?.props?.href + (item?.props?.text ? `#:~:text=${item.props.text}` : '')

  return (
    <PlaylistContentItemStyled
      {...props}
      target="_blank"
      rel="noreferer noopener"
      data-url={href}
      onClick={onContentItemClick}
      className={cx('group', active && 'bg-gray-50', className)}
    >
      <PlaylistContentStatus
        children={typeof item.id !== 'undefined' && item.id + 1}
      />
      <PlaylistContentImageWrapper>
        <PlaylistContentImage
          style={{
            backgroundImage: item?.props?.image && `url(${item?.props?.image})`,
          }}
        />
      </PlaylistContentImageWrapper>
      <PlaylistContentInfo href={href} item={item} />
      {children}
    </PlaylistContentItemStyled>
  )
}

export const PlaylistContentList = ({ playlist }) => (
  <div css={xw`border border-gray-200 rounded-md`}>
    {playlist?.props?.items?.map((item, key) => (
      <PlaylistContentItem key={key} item={item} />
    ))}
  </div>
)
