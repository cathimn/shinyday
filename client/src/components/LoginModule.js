import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default () => {
    const location = useLocation();
    if(location.pathname === "/signup") {
        console.log(true)
        return (
            <div>
                <Link to="/login">
                    log in
                </Link>
            </div>
        );
    } else if (location.pathname === "/login") {
        return (
            <div>
                <Link to="/signup">
                    sign up
                </Link>
            </div>
        )
    } else {
        return (
            <>
                <div className="module">
                    <Link to="/signup">
                        sign up
                    </Link>
                </div>
                <div>
                    <Link to="/login">
                        log in
                    </Link>
                </div>
            </>
        );
    }
}
