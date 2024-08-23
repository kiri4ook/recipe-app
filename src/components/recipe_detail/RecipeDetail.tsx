import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeDetail.css';

interface RecipeDetailProps {
    title: string;
    imageSrc: string;
    category: string;
    origin: string;
    instructions: string | undefined;
    ingredients: (string | undefined)[];
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({
    title,
    imageSrc,
    category,
    origin,
    instructions,
    ingredients
}) => {
    return (
        <div className="recipe-detail">
            <Link to="/" className="back-link">
                <span className="back-arrow">&larr;</span> Back
            </Link>
            <header className="recipe-header">
                <h1>{title}</h1>
            </header>
            <div className="recipe-image">
                <img src={imageSrc} alt={title} />
            </div>
            <div className="recipe-info">
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Origin:</strong> {origin}</p>
                <p>{instructions}</p>
            </div>
            <ul className="recipe-ingredients">
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeDetail;
