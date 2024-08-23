import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../recipe_card/RecipeCard';
import './RecipeList.css';

interface RecipeListProps {
    recipes: Recipe[];
    selectedRecipes: Recipe[];
}

interface Recipe {
    idMeal: string;
    strMealThumb: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
    const navigate = useNavigate();

    const handleNavigateToSelected = () => {
        navigate('/selected-recipes');
    };

    return (
        <div className="recipe_list_container">
            <button onClick={handleNavigateToSelected} className="navigate-button">
                View Selected Recipes
            </button>
            <h1>All Recipes</h1>
            <div className="recipe-list">
                {recipes.map((recipe) => (
                    <RecipeCard
                        idMeal={recipe.idMeal}
                        strMealThumb={recipe.strMealThumb}
                        strMeal={recipe.strMeal}
                        strCategory={recipe.strCategory}
                        strArea={recipe.strArea}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
