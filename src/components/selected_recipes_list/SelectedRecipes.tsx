import React from 'react';
import DetailRecipe from '../detail_recipe/DetailRecipe';
import IngredientsSummaryComponent from '../detail_recipe/IngredientsSummaryComponent';
import { Link } from 'react-router-dom';
import './SelectedRecipes.css';

interface Recipe {
    idMeal: string;
    strMealThumb: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
}
interface SelectedRecipesProps {
    selectedRecipes: Recipe[];
    ingredientMap: { [key: string]: number };
}

const SelectedRecipes: React.FC<SelectedRecipesProps> = ({ selectedRecipes, ingredientMap }) => {

    return (
        <div className="selected-recipes">
            <Link to="/" className="back-link">
                <span className="back-arrow">&larr;</span> Back
            </Link>
            <h1>Selected Recipes</h1>
            <div className="recipe-cards">
                {selectedRecipes.map((recipe) => (
                    <DetailRecipe
                        key={recipe.idMeal}
                        idMeal={recipe.idMeal}
                        strMealThumb={recipe.strMealThumb}
                        strMeal={recipe.strMeal}
                        strCategory={recipe.strCategory}
                        strArea={recipe.strArea}
                        strInstructions={recipe.strInstructions}
                    />
                ))}
            </div>
            <IngredientsSummaryComponent ingredients={ingredientMap} />
        </div>
    );
};

export default SelectedRecipes;
