/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, fetchCategories } from '../../redux/recipesSlice';
import { RootState, AppDispatch } from '../../redux/store';
import './CategoryFilter.css';

function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;

    return function (...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

const CategoryFilter: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, selectedCategory, status } = useSelector((state: RootState) => state.recipes);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [showList, setShowList] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [dispatch, status]);

    useEffect(() => {
        setFilteredCategories(categories);
    }, [categories]);

    const debouncedFilterCategories = useCallback(
        debounce((term: string) => {
            const results = categories.filter((category) =>
                category.strCategory.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredCategories(results);
            setShowList(true);
        }, 1000),
        [categories]
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        setShowList(false);
        debouncedFilterCategories(term);
    };

    const debouncedShowList = useCallback(
        debounce(() => setShowList(true), 1000),
        []
    );

    useEffect(() => {
        if (searchTerm) {
            debouncedShowList();
        } else {
            setShowList(false);
        }
    }, [searchTerm, debouncedShowList]);

    const handleCategorySelect = (category: string) => {
        dispatch(setCategory(category));
        setSearchTerm('');
        setShowList(false);
    };

    return (
        <div className="filter">
            <input
                type="text"
                id="categorySearch"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Type category name..."
            />
            {showList && searchTerm && (
                <ul className="category-list">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <li
                                key={category.idCategory}
                                onClick={() => handleCategorySelect(category.strCategory)}
                                className={category.strCategory === selectedCategory ? 'selected' : ''}
                            >
                                {category.strCategory}
                            </li>
                        ))
                    ) : (
                        <li>No matching categories</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default CategoryFilter;
