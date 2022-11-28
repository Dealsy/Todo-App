type buttonProps = {
  text?: string
  onClick: () => void
  className?: string
  children?: React.ReactNode
  Icon?: any
  IconClassName?: string
}

const Button = ({
  text,
  onClick,
  className,
  children,
  Icon,
  IconClassName,
}: buttonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
      {Icon && <Icon className={IconClassName} />}
      {children}
    </button>
  )
}
export default Button
