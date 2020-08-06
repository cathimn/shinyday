import React from 'react';

export default () => {

    return (
        <div className="genre-container">
            <h3 className="main--h3">discover by genre</h3>
            <div className="genre-gradient pink1">
                <ul>
                    <li>all</li>
                    <li>rock</li>
                    <li>pop</li>
                    <li>electronic</li>
                    <li>metal</li>
                    <li>alternative</li>
                    <li>hip-hop/rap</li>
                    <li>punk</li>
                </ul>
            </div>
            <div className="genre-gradient pink2">
                <ul>
                    <li>latest</li>
                    <li>curated</li>
                    <li></li>
                </ul>
            </div>
            <div className="genre-gradient pink3">
                <ul>
                    <li>*</li>
                </ul>
            </div>
        </div>
    );
}