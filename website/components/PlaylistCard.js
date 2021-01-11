import xw, { cx } from 'xwind'
import styled from '@emotion/styled'
import { PlaylistInfo } from './PlaylistContent'
import LinkIfExists from './LinkIfExists'

const Card = styled.div(xw`
  relative max-w-sm
  text-sm leading-5 font-medium
  transition duration-150 ease-in-out
`)

export const PlaylistCardImage = styled.div(xw`
  w-full h-32 bg-cover rounded-md overflow-hidden
`)

export const PlaylistCardImageWrapper = styled.div(xw`
  relative w-full h-32 mb-2 rounded-md overflow-hidden
  bg-gradient-to-br from-blue-400 to-blue-800 hover:opacity-90
`)

export const PlaylistCardHeader = ({ playlist }) => (
  <div css={xw`relative`}>
    <PlaylistCardImageWrapper>
      <PlaylistCardImage
        style={{
          backgroundImage:
            playlist?.props?.backgroundImage &&
            `url(${playlist.props?.backgroundImage})`,
        }}
      />
    </PlaylistCardImageWrapper>
    <div css={xw`absolute bottom-0 left-0 px-4 py-3`}>
      <PlaylistInfo playlist={playlist} />
    </div>
  </div>
)

export const PlaylistCard = ({
  href,
  playlist,
  className,
  children,
  imageChildren,
  ...props
}) => (
  <Card
    {...props}
    className={cx('group', className)}
    style={{
      minWidth: 270,
    }}
  >
    <LinkIfExists anchor href={href}>
      <PlaylistCardImageWrapper>
        <PlaylistCardImage
          style={{
            backgroundImage:
              playlist?.props?.backgroundImage &&
              `url(${playlist?.props?.backgroundImage})`,
          }}
        />
        {imageChildren}
      </PlaylistCardImageWrapper>
    </LinkIfExists>
    <PlaylistInfo href={href} playlist={playlist} />
    {children}
  </Card>
)

export default PlaylistCard
