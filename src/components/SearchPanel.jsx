
function SearchPanel(props) {
    function handleInputChange(event) {
        props.setSearchTerm(event.target.value);
    }
    function handleSearchClick() {
        console.log("Searching");
        props.onSearch(props.searchTerm);
    }
    function handleKeyDown(event) {
        if (event.key == 'Enter') {
            props.onSearch(props.searchTerm);
        }
    }
    return (
        <div className="search-panel">
            <input type="text"
                value={props.searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter food name" className="input-box" />
            <button onClick={handleSearchClick} className="search-button">Search</button>
            <button onClick={props.clear} className="clear-button">Clear</button>
        </div>
    );

}

export default SearchPanel