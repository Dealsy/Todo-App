type SelectProps = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
  value?: string
  labelText?: string
  id?: string
  error?: string
  children?: React.ReactNode
}

const Select = ({ children, className }: SelectProps) => {
  return (
    <div className={className}>
      <select>
        <option>{children}</option>
      </select>
    </div>
  )
}

export default Select
