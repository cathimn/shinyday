import React from 'react';
import { Link } from 'react-router-dom';

export default () => {

    return (
        <div className="grey">
            <div className="banner">
                <div className="banner__left">
                    {/* set this to be a feature on any random album!!! */}
                    <a href="/monplaisir/good">go to a test album</a><br/>
                    <a to="/monplaisir">artist page</a><br/>
                    <a to="/nonsense">bad link</a>
                </div>
                <div className="banner__right">
                    <div className="banner__right mini--first">:o)</div>
                    <div className="banner__right mini--second">:o(</div>
                    <div className="banner__right mini--third">;o)</div>
                </div>
            </div>
        </div>
    );
};
