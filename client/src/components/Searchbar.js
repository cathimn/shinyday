import React, { useState, useEffect } from 'react';
import { baseUrl } from '../config';

export default () => {
    const [query, setQuery] = useState('');
    const [searched, setSearched] = useState(false);
    const [list, setList] = useState({});

    const updateQuery = e => {
        setQuery(e.target.value);
    }

    const populateList = async () => {
        const response = await fetch(`${baseUrl}/search`);

        if (response.ok) {
            setSearched(true);
            const res = await response.json();
            setList(res);
        }
    }

    const searchList = (query, list) => {

    }
    
    useEffect(() => {
        if (!searched) {
            // populateList();
        }
        if (query.length > 0) {
            // console.log(searchList(query, list));
            
        }
    }, [searched, query, list]);

    return (
        <>
            <div className="search-container">
                <input
                    className="search"
                    type="text"
                    value={query}
                    onChange={updateQuery}
                    placeholder=""
                />
            </div>
        </>
    );
};