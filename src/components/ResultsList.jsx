import FoodItem from "./FoodItem";
function ResultsList(props) {
    return (
        <>
        <p>{props.length} items found (showing {props.actualLength})</p>
            <ul className="list">
                {props.results.length > 0 ?
                    (props.results.map(food => <FoodItem key={food.Food_Code} food={food} />))
                    : (<li className="no-results">No results found.</li>
                    )}
            </ul>
        </>

    );
}
export default ResultsList