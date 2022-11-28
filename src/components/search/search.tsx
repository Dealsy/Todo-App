import Input from '../reuseable_components/input'
import Select from '../select/select'

type SearchProps = {
  setSearch: (search: string) => void
  selectedValue: (priorityValue: string) => void
}

const Search = ({ setSearch, selectedValue }: SearchProps) => {
  return (
    <div className="search_container">
      <Input
        placeholder="Search for a name"
        onChange={(e) => setSearch(e.target.value)}
        className="search_input"
      />

      <Select
        labelText="Filter by priority"
        id="priorityFilter"
        defaultValue="Select"
        onChange={(e) => selectedValue(e.target.value)}
        className="priority_select"
      >
        <option disabled>Select</option>
        <option value="Show All">Show all</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
        <option value="Completed">Completed</option>
        <option value="Not Completed">Not Completed</option>
      </Select>
    </div>
  )
}

export default Search
