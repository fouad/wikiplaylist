import xw, { cx } from 'xwind'
import styled from '@emotion/styled'
import { PlaylistContentItem } from './PlaylistContent'

const SidebarStyled = styled.div(xw`
  bg-white
  fixed top-0 right-0
  h-full w-72 md:w-96 py-4
  transition-transform
  border-l border-gray-200 shadow-lg
`)

const SidebarToggle = styled.div(xw`
  absolute left-0 top-10
  px-2 py-3 transform -translate-x-full
  border-l border-t border-b border-gray-200
  bg-white rounded-l-md cursor-pointer
`)

const Sidebar = ({
  playlist,
  visible,
  className,
  onContentItemClick,
  onToggleVisibility,
  ...props
}) => (
  <SidebarStyled
    className={cx(className, !visible && 'transform translate-x-full')}
    visible={visible}
    {...props}
  >
    <SidebarToggle onClick={onToggleVisibility}>
      <svg
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className={cx(
          'transition-transform transform',
          !visible && 'rotate-180'
        )}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </SidebarToggle>
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
