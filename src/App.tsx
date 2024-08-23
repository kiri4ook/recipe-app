import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllRecipes from './pages/AllRecipes';
import RecipeDetail from './pages/RecipeDetail';
import SelectedIngredients from './pages/SelectedRecipes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/selected-recipes" element={<SelectedIngredients />} />
      </Routes>
    </Router>
  );
}

export default App;
