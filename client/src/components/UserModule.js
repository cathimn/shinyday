import React, { useState } from 'react';
import { HeartOutlined } from '@ant-design/icons'
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
            <a href={`/profile/${username}`}>
            <div className="module__menu--link">
                profile
            </div>
            </a>
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
                            <a href="/new">
                                add an album
                            </a>
                        </div>
                    )
                    : (
                        <div>
                            <a href={`/profile/${username}`}>
                                <HeartOutlined className="module__heart" />
                            </a>
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
