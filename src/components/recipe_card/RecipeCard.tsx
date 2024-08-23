import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectRecipe, deselectRecipe } from '../../redux/recipesSlice';
import { RootState, AppDispatch } from '../../redux/store';
import './RecipeCard.css';

interface RecipeCardProps {
    idMeal: string;
    strMealThumb: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ idMeal, strMealThumb, strMeal, strCategory, strArea }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedRecipes } = useSelector((state: RootState) => state.recipes);
    const isSelected = selectedRecipes.some(r => r.idMeal === idMeal);

    const handleCheckboxChange = () => {
        if (isSelected) {
            dispatch(deselectRecipe(idMeal));
        } else {
            dispatch(selectRecipe(idMeal));
        }
    };

    return (
        <div className="recipe-card">
            <img src={strMealThumb} alt={strMeal} />
            <h3>{strMeal}</h3>
            <p>Category: {strCategory}</p>
            <p>Origin: {strArea}</p>
            <Link to={`/recipe/${idMeal}`}>View Recipe</Link>
            <input
                type="checkbox"
                checked={isSelected}
                onChange={handleCheckboxChange}
                className="recipe-checkbox"
            />
        </div>
    );
};

export default RecipeCard;
