import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
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