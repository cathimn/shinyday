import React, { useState, useEffect } from 'react';
import { baseUrl } from '../config';

const Results = ({ list }) => (
    <div className="search-results">
        {Object.values(list).map(li => {
            const result = Object.entries(li)

            if (result.length > 1) {
                return (
                    <div className="result-container" key={result[0][1] + "xD"}>
                        <div className="img-placeholder"></div>
                        <ul className="result">
                        <li key={"1" + result[0][1]}
                            className="search-matched-term">{result[0][1]}</li>
                        <li key={"2" + result[1][1]}>by {result[1][1]}</li>
                        <li key={"5" + result[1][1]}
                            className="search-match-type">ALBUM</li>
                        </ul>
                    </div>
                )
            } else {
                return (
                    <div className="result-container" key={result[0][1] + "xd"}>
                        <ul className="result">
                        <li key={"3" + result[0][1]}
                            className="search-matched-term">{result[0][1]}</li>
                        <li key={"4" + result[0][1]}
                            className="search-match-type">ARTIST</li>
                        </ul>
                    </div>
                );
            }
        }
        )}
    </div>
);

export default () => {
    const [query, setQuery] = useState('');
    const [searched, setSearched] = useState(false);
    const [list, setList] = useState({});

    const updateQuery = e => {
        setQuery(e.target.value);
    }

    const populateList = async (query) => {
        try {
            const response = await fetch(`${baseUrl}/search`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "query": query }),
            });
            if (response.ok) {
                const recentListLen = Object.keys(list).length;
                const res = await response.json();
                setList(res);
                if (recentListLen === Object.keys(list).length) {
                    setSearched(false);
                } else {
                    setSearched(true);
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (query && !searched) {
            populateList(query);
        } else if (query.length === 0) {
            setList({});
        }
    }, [query, query.length, searched]);

    return (
        <>
            <div className="search-container">
                <input
                    className="search"
                    type="text"
                    value={query}
                    onChange={updateQuery}
                    placeholder="search..."
                    />
            </div>
            <div className="search-results-container">
                {(Object.keys(list).length > 0) ? <Results list={list} /> : null}
            </div>

        </>
    );
};
