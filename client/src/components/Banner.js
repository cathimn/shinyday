import React from 'react';
import { Link } from 'react-router-dom';

export default () => {

    return (
        <div className="grey">
            <div className="banner">
                <div className="banner__left">
                    <div className="banner_left-blurb">
                        <Link to="/deeyankey/lullaby">
                            <div className="banner__left-blurb">
                                Album Feature:<br/> lullaby by Dee Yan-Key
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="banner__right">
                    <div className="banner__right mini--first">
                        <Link to="/blahblahblah">
                            <div className="banner__right-blurb">
                                Artist Feature: Blah Blah Blah
                            </div>
                        </Link>
                    </div>
                    <div className="banner__right mini--second">
                        <Link to="/monplaisir">
                            <div className="banner__right-blurb">
                                Artist Feature: Monplaisir
                            </div>
                        </Link>
                    </div>
                    <div className="banner__right mini--third">
                        <Link to="/breakmastercylinder">
                            <div className="banner__right-blurb">
                                Artist Feature: Breakmaster Cylinder
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
