/**
 * SearchBar Component
 * Renders a search input field and handles user input for searching products.
 */
export default function SearchBar({ handleInputChange, searchTerm }: { handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; searchTerm: string }) {
  return (
    <div className="search-bar">
      <input type="text" value={searchTerm} placeholder="Search products..." onChange={handleInputChange} />
    </div>
  )
}