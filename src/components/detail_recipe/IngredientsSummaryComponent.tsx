import React from 'react';
import './IngredientsSummaryComponent.css';

interface IngredientsSummaryProps {
    ingredients: { [key: string]: number };
}

const IngredientsSummaryComponent: React.FC<IngredientsSummaryProps> = ({ ingredients }) => {
    const ingredientsList = Object.entries(ingredients).map(([ingredient, count]) => (
        <li key={ingredient}>{ingredient}: {count}</li>
    ));

    return (
        <div className="ingredients-summary">
            <h2>Ingredients Summary</h2>
            <ul>
                {ingredientsList}
            </ul>
        </div>
    );
};

export default IngredientsSummaryComponent;
