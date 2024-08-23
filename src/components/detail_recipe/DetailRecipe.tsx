import React from 'react';
import './DetailRecipe.css';

interface Recipe {
    idMeal: string;
    strMealThumb: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
}

const DetailRecipe: React.FC<Recipe> = ({ idMeal, strMealThumb, strMeal, strCategory, strArea, strInstructions }) => {
    return (
        <div className="card">
            <img src={strMealThumb} alt={strMeal} />
            <div className="card_detail">
                <h2>{strMeal}</h2>
                <p><strong>Category:</strong> {strCategory}</p>
                <p><strong>Area:</strong> {strArea}</p>
                <div>
                    <h3>Instructions:</h3>
                    <p>{strInstructions}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailRecipe;
