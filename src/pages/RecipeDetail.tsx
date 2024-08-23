import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from '../redux/recipesSlice';
import { RootState } from '../redux/store';
import RecipeDetail from '../components/recipe_detail/RecipeDetail';

const RecipePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { recipeDetail } = useSelector((state: RootState) => state.recipes);

    useEffect(() => {
        if (id) {
            dispatch(fetchRecipeById(id));
        }
    }, [dispatch, id]);

    if (!recipeDetail) {
        return <div>Loading...</div>;
    }

    const ingredients = Object.keys(recipeDetail)
        .filter(key => key.startsWith('strIngredient') && recipeDetail[key])
        .map((key) => recipeDetail[key]);

    return (
        <RecipeDetail
            title={recipeDetail.strMeal}
            imageSrc={recipeDetail.strMealThumb}
            category={recipeDetail.strCategory}
            origin={recipeDetail.strArea}
            instructions={recipeDetail.strInstructions}
            ingredients={ingredients}
        />
    );
};

export default RecipePage;
