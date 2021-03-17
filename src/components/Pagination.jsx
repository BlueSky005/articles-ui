import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Pagination = ( { postsPerPage, totalPosts, paginate } ) => {
    const pageNumbers = [];

    for ( let i = 1;i <= Math.ceil( totalPosts / postsPerPage );i++ ) {
        pageNumbers.push( i );
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map( number => (
                    <li key={number} className='page-item'>
                        {/* <a onClick={() => paginate( number )} href='!#' className='page-link'>
                            {number}
                        </a> */}

                        <Link to="/yourArticles" onClick={() => paginate( number )} className='page-link'>
                            {number}</Link>
                    </li>
                ) )}
            </ul>
        </nav>
    );
};

export default Pagination;