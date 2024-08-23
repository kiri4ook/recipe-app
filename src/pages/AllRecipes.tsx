import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchRecipes } from '../redux/recipesSlice';
import { RootState } from '../redux/store';
import Pagination from '../components/pagination/Pagination';
import RecipeList from '../components/recipe_list/RecipeList';
import CategoryFilter from '../components/search_filter/CategoryFilter';

const AllRecipes: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { filteredRecipes, selectedRecipes, status } = useSelector((state: RootState) => state.recipes);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9;

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRecipes());
        }
    }, [dispatch, status]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error loading recipes</div>;
    }

    return (
        <div>
            <CategoryFilter />
            <RecipeList recipes={currentRecipes} selectedRecipes={selectedRecipes} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default AllRecipes;
