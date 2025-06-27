
function FoodItem(props){
    return(
        <li className="food-item">
            <div>
                <p className="food-name">{props.food.Display_Name}</p>
                <p className="portion">One Serving: {props.food.Portion_Amount+" "} 
                    {props.food.Portion_Display_Name}</p>
            </div>
            <p className="calories">{Math.round(props.food.Calories)} cal</p>
        </li>
    );
}
export default FoodItem