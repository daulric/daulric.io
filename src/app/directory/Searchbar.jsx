const SearchBar = ({ onSearch }) => {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Search files..."
        onChange={(e) => onSearch(e.target.value)}
        className="bg-white text-gray-900 placeholder-gray-1d00 font-semibold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      
    </div>
  );
};

export default SearchBar;