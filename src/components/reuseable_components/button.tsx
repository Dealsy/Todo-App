type buttonProps = {
  text: string
  onClick: () => void
  className?: string
}

const Button = ({ text, onClick, className }: buttonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  )
}
export default Button
