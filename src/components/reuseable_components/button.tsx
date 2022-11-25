type buttonProps = {
  text?: string
  onClick: () => void
  className?: string
  children?: React.ReactNode
}

const Button = ({ text, onClick, className, children }: buttonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
      {children}
    </button>
  )
}
export default Button
