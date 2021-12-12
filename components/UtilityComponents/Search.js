import Input from "../Input";

//Renders the product search input
function Search({ searchValue, handleSearch }) {
  return (
    <div className="pb-6">
      <Input
        type="text"
        placeholder="Search for a product"
        value={searchValue}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
