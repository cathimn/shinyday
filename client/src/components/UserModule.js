import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { bucketUrl, baseUrl } from '../config';

const AvatarMenu = ({ username, setNeedLogin, toggleMenu }) => {
    const logout = async (e) => {
        const authToken = window.localStorage.getItem("shinyday_session");
        console.log(authToken)
        const response = await fetch(`${baseUrl}/session`, {
            method: 'delete',
            headers: { Authorization: `Bearer ${authToken}` }
        })
        if (response.ok) {
            window.localStorage.removeItem("shinyday_session");
            setNeedLogin(true);
            window.location.reload(false);
        }
    }
    return (
        <div className="module__menu" onMouseLeave={toggleMenu}>
            <Link to={`/profile/${username}`}>
                <div className="module__menu--link">
                    profile
                </div>
            </Link>
            <div className="module__menu--link"
                onClick={logout}>logout</div>
        </div>
    )
}

export default ({ artistAccount, setNeedLogin, username }) => {
    const [menuDisplay, setMenuDisplay] = useState(false);

    const toggleMenu = e => {
        setMenuDisplay(!menuDisplay);
    };

    return (
        <>
            <div className="module">
                { artistAccount.id
                    ? (
                        <div>
                            <Link to="/new">
                                add an album
                            </Link>
                        </div>
                    )
                    : (
                        <div>
                            <Link to={`/profile/${username}`}>
                                <div className="module__heart">💗</div>
                            </Link>
                        </div>
                    )
                }
            </div>
            <div className="module__avatar-container">
                <div className="module__avatar" onMouseOver={toggleMenu} >
                    <img src={`${bucketUrl}/users/${username}.png`} alt="avatar"></img>
                </div>
                {menuDisplay ? <AvatarMenu username={username} setNeedLogin={setNeedLogin} toggleMenu={toggleMenu}/> : null }
            </div>
        </>
    );
}
