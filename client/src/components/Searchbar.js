import React, { useState, useEffect } from 'react';
import { baseUrl } from '../config';

const AlbumResult = ({result}) => {
    const [albumPath, setAlbumPath] = useState();
    const [albumName, setAlbumName] = useState();
    const [artistName, setArtistName] = useState();

    useEffect(() => {
        const translateToAlbumPath = (test) => {
            setArtistName(test[1][1]);
            setAlbumName(test[0][1]);

            const artistPath = test[1][1].toLowerCase().replace(/[\s|\W]/gm,"");
            const albumPath = test[0][1].toLowerCase().replace(/[\s|\W]/gm, "");
            setAlbumPath(`/${artistPath}/${albumPath}`)
        }

        translateToAlbumPath(result)
    }, [result])

    return (
        <a href={albumPath}>
            <div className="result-container" key={{albumName} + "xD"}>
                <div className="img-placeholder">

                </div>
                <ul className="result">
                    <li key={"1" + {albumName}}
                        className="search-matched-term">{albumName}</li>
                    <li key={"2" + artistName}>by {artistName}</li>
                    <li key={"5" + artistName}
                        className="search-match-type">ALBUM</li>
                </ul>
            </div>
        </a>

    )
}

const ArtistResult = ({result}) => {
    const [artistPath, setArtistPath] = useState();
    const [artistName, setArtistName] = useState();

    useEffect(() => {
        const translateToArtistPath = (test) => {
            setArtistName(test[0][1]);

            const artistPath = test[0][1].toLowerCase().replace(/[\s|\W]/gm, "");
            setArtistPath(`/${artistPath}`);
        }

        translateToArtistPath(result);
    }, [result])

    return (
        <a href={artistPath}>
            <div className="result-container" key={artistName + "xd"}>
                <ul className="result">
                    <li key={"3" + artistName}
                        className="search-matched-term">{artistName}</li>
                    <li key={"4" + artistName}
                        className="search-match-type">ARTIST</li>
                </ul>
            </div>
        </a>
    )
}

const Results = ({ list }) => {

    return (
        <div className="search-results">
        {Object.values(list).map(li => {
            const result = Object.entries(li)

            if (result.length > 1) {
                return <AlbumResult result={result} />
            } else {
                return <ArtistResult result={result} />
            }
        }
        )}
    </div>
    );
}

export default () => {
    const [query, setQuery] = useState('');
    const [searched, setSearched] = useState(false);
    const [list, setList] = useState({});

    const updateQuery = e => {
        setQuery(e.target.value);
    }

    const populateList = async (query) => {
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
