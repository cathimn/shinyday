import React, { useState } from 'react';
import { HeartOutlined } from '@ant-design/icons'
import { bucketUrl, baseUrl } from '../config';

const AvatarMenu = ({ setNeedLogin, toggleMenu }) => {
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
            <div className="module__menu--link">profile</div>
            <div className="module__menu--link"
                onClick={logout}>logout</div>
        </div>
    )
}

export default ({ setNeedLogin, username }) => {
    const [menuDisplay, setMenuDisplay] = useState(false);

    const toggleMenu = e => {
        setMenuDisplay(!menuDisplay);
    };

    return (
        <>
            <div className="module">
                <HeartOutlined className="module__heart" />
            </div>
            <div className="module__avatar-container">
                <div className="module__avatar" onMouseOver={toggleMenu} >
                    <img src={`${bucketUrl}/users/${username}.png`} alt="avatar"></img>
                </div>
                {menuDisplay ? <AvatarMenu setNeedLogin={setNeedLogin} toggleMenu={toggleMenu}/> : null }
            </div>
        </>
    );
}
