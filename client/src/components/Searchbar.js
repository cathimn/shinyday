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
        const results = { songs: [], artists: [], albums: []};
        query = query.toLowerCase();
        for (const id in list) {
            let { song, album, artist } = list[id];
            let songCheck = song.toLowerCase().includes(query);
            let albumCheck = album.toLowerCase().includes(query);
            let artistCheck = artist.toLowerCase().includes(query);
            
            if (songCheck) results["songs"].push({song, artist, album});
            // if (albumCheck) results["albums"].push({artist, album})
            // if (artistCheck) results["artists"].push({ artist })
        }
        return results;
    }
    
    useEffect(() => {
        if (!searched) {
            populateList();
        }
        if (query.length > 0) {
            console.log(searchList(query, list));
            
        }
    }, [searched, query, list]);

    return (
        <>
            <div>
                <input type="text" value={query} onChange={updateQuery} />
            </div>
        </>
    );
};