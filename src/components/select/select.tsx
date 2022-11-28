type SelectProps = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
  labelText?: string
  id?: string
  children?: React.ReactNode
  defaultValue?: string
}

const Select = ({
  children,
  className,
  labelText,
  id,
  onChange,
  defaultValue,
}: SelectProps) => {
  return (
    <div className={className}>
      <label id={id}>{labelText}</label>
      <select
        className="select_dropdown"
        id={id}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  )
}

export default Select
