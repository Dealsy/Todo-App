type inputProps = {
  type?: string
  placeholder?: string
  value?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  labelText?: string
  id?: string
}

const Input = ({
  className,
  onChange,
  value,
  placeholder,
  type,
  labelText,
  id,
}: inputProps) => {
  return (
    <div className="input_container">
      <label className="label" htmlFor={id}>
        {labelText}
      </label>
      <input
        id={id}
        className={className}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={'text' || type}
      />
    </div>
  )
}

export default Input
