import React from 'react';
import { Link } from 'react-router-dom';

export default () => {

    return (
        <>
            <div className="banner">
                <div className="banner__left">
                    {/* set this to be a feature on any random album!!! */}
                    <Link to="/monplaisir/good">go to a test album</Link>
                    <Link to="/monplaisir/">artist page</Link>
                    <Link to="/nonsense">bad link</Link>
                </div>
                <div className="banner__right">
                    <div className="banner__right mini--first">:o)</div>
                    <div className="banner__right mini--second">:o(</div>
                    <div className="banner__right mini--third">;o)</div>
                </div>
            </div>
        </>
    );
};