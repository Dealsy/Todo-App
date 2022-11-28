type SelectProps = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
  value?: string
  labelText?: string
  id?: string
  children?: React.ReactNode
  defaultValue?: string
}

const Select = ({
  children,
  className,
  labelText,
  value,
  id,
  onChange,
  defaultValue,
}: SelectProps) => {
  return (
    <div className={className}>
      <label>{labelText}</label>
      <select defaultValue={defaultValue} value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  )
}

export default Select
