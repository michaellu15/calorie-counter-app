import FoodItem from "./FoodItem";

function ResultsList(props) {
    return (
        <>
            <div className="search-results">
                <p>{props.length} items found (showing {props.actualLength})</p>
                <ul className="list">
                    {props.results.length > 0 ?
                        (props.results.map(food => (
                            <FoodItem
                                key={food.Food_Code}
                                food={food}
                                isCached={false}
                                onAdd={() => props.onAdd(food)} />)))
                        : (<li className="no-results">No results found.</li>
                        )}
                </ul>
            </div>
        </>
    );
}
export default ResultsList