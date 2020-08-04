import React from 'react';

// import styles from './Modules.module.css';

export default ({ username, token }) => {
    
    return (
        <>
            <div className="left">
                HEART FOR USER COLLECTION
            </div>
            <div>
                HELLO {username}
            </div>
        </>
    );
}