import React from 'react';
// import { Link } from 'react-router-dom';

export default () => {

    return (
        <div className="grey">
            <div className="banner">
                <div className="banner__left">
                    <div className="banner_left-blurb">
                        <a href="/deeyankey/lullaby">
                            <div className="banner__left-blurb">
                                Album Feature:<br/> lullaby by Dee Yan-Key
                            </div>
                        </a>
                    </div>
                </div>
                <div className="banner__right">
                    <div className="banner__right mini--first">
                        <a href="/blahblahblah">
                            <div className="banner__right-blurb">
                                Artist Feature: Blah Blah Blah
                            </div>
                        </a>
                    </div>
                    <div className="banner__right mini--second">
                        <a href="/monplaisir">
                            <div className="banner__right-blurb">
                                Artist Feature: Monplaisir
                            </div>
                        </a>
                    </div>
                    <div className="banner__right mini--third">
                        <a href="/breakmastercylinder">
                            <div className="banner__right-blurb">
                                Artist Feature: Breakmaster Cylinder
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
