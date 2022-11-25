type inputProps = {
  type: string
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const Input = ({
  className,
  onChange,
  value,
  placeholder,
  type,
}: inputProps) => {
  return (
    <input
      className={className}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={'text' || type}
    />
  )
}

export default Input
