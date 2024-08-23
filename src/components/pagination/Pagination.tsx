import React from 'react';
import './Pagination.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

    const getPages = () => {
        const pages = [];
        const maxPagesToShow = 7;

        if (totalPages <= 9) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= maxPagesToShow) {
                for (let i = 1; i <= maxPagesToShow; i++) {
                    pages.push(i);
                }
                pages.push('...', totalPages);
            } else if (currentPage > totalPages - maxPagesToShow) {
                pages.push(1, '...');
                for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1, '...');
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
                pages.push('...', totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="pagination">
            <button
                className="pagination-arrow"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            {getPages().map((page, index) =>
                typeof page === 'number' ? (
                    <button
                        key={index}
                        className={`pagination-page ${page === currentPage ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="pagination-ellipsis">...</span>
                )
            )}
            <button
                className="pagination-arrow"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
