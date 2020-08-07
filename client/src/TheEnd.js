import React from 'react'
import { useHistory } from 'react-router-dom';

export default () => {
    const history = useHistory();

    const handleClick = () => {
        history.goBack();
    }

    return (
        <div className="center">
            <h1>404</h1>
            <div>Page does not exist. <a href="#" onClick={handleClick}>Go back?</a></div>
        </div>
    )
}
