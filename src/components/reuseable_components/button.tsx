type buttonProps = {
  onClick: () => void
  className?: string
  Icon?: any
  IconClassName?: string
}

const Button = ({ onClick, className, Icon, IconClassName }: buttonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {Icon && <Icon className={IconClassName} />}
    </button>
  )
}
export default Button
