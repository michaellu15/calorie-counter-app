function FoodItem(props) {
    const servings = parseFloat(props.food.servings) || 0;
    const calculatedCalories = Math.round(props.food.Calories * servings);

    return (
        <li className="food-item">
            <div>
                <p className="food-name">{props.food.Display_Name}</p>
                {!props.isCached && <p className="portion">One Serving: {props.food.Portion_Amount + " "}
                    {props.food.Portion_Display_Name}</p>}
            </div>
            <div className="calories-section">
                <p className="calories">{calculatedCalories} cal</p>
            </div>
            <div className="controls-section">
                {props.isCached ? (
                    <>
                    <p>Servings: {props.food.servings}</p>
                        <input
                            type="number"
                            className="servings-input"
                            // The value is now whatever is in the state, including an empty string
                            value={props.food.servings}
                            onChange={props.onServingChange}
                            placeholder="Input a number:"
                            min="0"
                            step="0.1"
                        />
                        <button onClick={props.onRemove} className="remove-button">Remove</button>
                    </>
                ) : (
                    <button onClick={props.onAdd} className="add-button">Add</button>
                )}
            </div>
        </li>
    );
}

export default FoodItem;