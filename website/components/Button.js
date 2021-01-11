/* Example with @emotion/styled */
import styled from '@emotion/styled'
import xw, { cx } from 'xwind'

const ButtonStyled = styled.button(xw`
  rounded-md
  text-white
  bg-blue-500
  relative w-auto
  hover:bg-blue-400
  py-3 px-4 md:px-6
  flex justify-center
  border border-transparent
  text-base leading-5 font-semibold
  transition duration-150 ease-in-out
  focus[outline-none ring-4 ring-blue-300]
  active:bg-blue-600
`)

const Button = ({ as, className, children, ...props }) => (
  <ButtonStyled as={as} {...props} className={cx('group', className)}>
    {children}
  </ButtonStyled>
)

export default Button
