import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import SelectedRecipesComponent from '../components/selected_recipes_list/SelectedRecipes';

const SelectedRecipes: React.FC = () => {
    const { selectedRecipes } = useSelector((state: RootState) => state.recipes);

    const ingredientMap: { [key: string]: number } = {};

    selectedRecipes.forEach((recipe) => {
        Object.keys(recipe).forEach((key) => {
            if (key.startsWith('strIngredient') && recipe[key]) {
                const ingredient = recipe[key] as string;
                if (ingredient) {
                    ingredientMap[ingredient] = (ingredientMap[ingredient] || 0) + 1;
                }
            }
        });
    });

    return (
        <SelectedRecipesComponent
            selectedRecipes={selectedRecipes}
            ingredientMap={ingredientMap}
        />
    );
};

export default SelectedRecipes;
