import React from 'react';

export default () => {

    return (
        <div className="genre-content-container">
            <div className="genre-title-container">
                <h3 className="main--h3">discover by genre</h3>
            </div>
            <div className="pink1">
                <div className="genre-gradient">
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
            </div>
            <div className="pink2">
                <div className="genre-gradient">
                    <ul>
                        <li>latest</li>
                        <li>curated</li>
                    </ul>
                </div>
            </div>
            <div className="pink3">
                <div className="genre-gradient">
                    <ul>
                        <li>digital</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
