import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
    strInstructions: string;
    [key: string]: string | undefined;
}

interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

interface RecipeState {
    recipes: Recipe[];
    selectedRecipes: Recipe[];
    recipeDetail: Recipe | null;
    categories: Category[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    selectedCategory: string;
    filteredRecipes: Recipe[];
}

const initialState: RecipeState = {
    recipes: [],
    selectedRecipes: [],
    recipeDetail: null,
    status: 'idle',
    categories: [],
    selectedCategory: '',
    filteredRecipes: [],
};

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    return response.data.meals;
});

export const fetchCategories = createAsyncThunk('recipes/fetchCategories', async () => {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
    return response.data.categories;
});

export const fetchRecipeById = createAsyncThunk('recipes/fetchRecipeById', async (id: string) => {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    return response.data.meals[0];
});

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        selectRecipe: (state, action) => {
            const selectedRecipe = state.recipes.find(recipe => recipe.idMeal === action.payload);
            if (selectedRecipe && !state.selectedRecipes.find(recipe => recipe.idMeal === selectedRecipe.idMeal)) {
                state.selectedRecipes.push(selectedRecipe);
            }
        },
        deselectRecipe: (state, action) => {
            state.selectedRecipes = state.selectedRecipes.filter(recipe => recipe.idMeal !== action.payload);
        },
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
            if (action.payload) {
                state.filteredRecipes = state.recipes.filter(
                    recipe => recipe.strCategory === action.payload
                );
            } else {
                state.filteredRecipes = state.recipes;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.recipes = action.payload;
                state.filteredRecipes = state.selectedCategory
                    ? action.payload.filter((recipe: { strCategory: string; }) => recipe.strCategory === state.selectedCategory)
                    : action.payload;
            })
            .addCase(fetchRecipes.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchRecipeById.fulfilled, (state, action) => {
                state.recipeDetail = action.payload;
            });
    },
});

export const { selectRecipe, deselectRecipe, setCategory } = recipesSlice.actions;

export default recipesSlice.reducer;
