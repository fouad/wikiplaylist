import styled from '@emotion/styled'
import xw, { cx } from 'xwind'
import PlaylistContentItem from './PlaylistContent'

const SidebarStyled = styled.div(xw`
  bg-white
  fixed top-0 right-0
  h-full w-96 py-4
  transition-transform
  border-l border-gray-200 shadow-lg
`)

const Sidebar = ({
  playlist,
  visible,
  className,
  onContentItemClick,
  ...props
}) => (
  <SidebarStyled
    className={cx(
      className,
      'transform',
      visible ? 'translate-x-0' : 'translate-x-full'
    )}
    {...props}
  >
    {playlist?.props?.items?.map((item, key) => (
      <PlaylistContentItem
        key={key}
        item={item}
        onContentItemClick={onContentItemClick}
      />
    ))}
  </SidebarStyled>
)

export default Sidebar
