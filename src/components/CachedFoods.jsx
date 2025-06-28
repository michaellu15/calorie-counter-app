import React from 'react';
import FoodItem from './FoodItem';

function CachedFoods({ cache, onRemove, onServingChange }) {

  const totalCalories = cache.reduce((total, food) => {
    const servings = parseFloat(food.servings) || 0;
    return total + (Math.round(food.Calories) * servings);
  }, 0);

  return (
    <div className="cached-foods">
      <h2 className="food-list-title">Food List ({totalCalories} cal)</h2>
      <ul>
        {cache.length > 0 ? (
          cache.map((food) => (
            <FoodItem
              key={food.uniqueId}
              food={food}
              isCached={true}
              onRemove={() => onRemove(food.uniqueId)}
              // Pass the raw event object up
              onServingChange={(e) => onServingChange(food.uniqueId, e.target.value)}
              className="cached-food"
            />
          ))
        ) : (
          <li className="no-results">Your food list is empty.</li>
        )}
      </ul>
    </div>
  );
}

export default CachedFoods;