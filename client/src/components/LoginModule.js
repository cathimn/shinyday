import React from 'react';
import { Link } from 'react-router-dom';

// import styles from './Modules.module.css'

export default () => (
    <>
        <div className="left">
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