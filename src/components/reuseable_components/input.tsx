type inputProps = {
  type?: string
  placeholder?: string
  value?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  labelText?: string
  id?: string
  error?: string
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input = ({
  className,
  onChange,
  value,
  placeholder,
  type,
  labelText,
  id,
  error,
  onKeyDown,
}: inputProps) => {
  return (
    <div className="input_container">
      <label className="label" htmlFor={id}>
        {labelText}
      </label>
      <div className="add_input_div">
        <input
          onKeyDown={onKeyDown}
          id={id}
          className={className}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={'text' || type}
        />
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  )
}

export default Input
