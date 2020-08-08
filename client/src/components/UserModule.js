import React, { useState } from 'react';
import { HeartOutlined } from '@ant-design/icons'
import { bucketUrl } from '../config';

const AvatarMenu = ({ setNeedLogin, toggleMenu }) => {
    return (
        <div className="module__menu" onMouseLeave={toggleMenu}>
            <div className="module__menu--link">profile</div>
            <div className="module__menu--link"
                onClick={e => {
                window.localStorage.removeItem("shinyday_session");
                setNeedLogin(true);
                window.location.reload(false);
            }}>logout</div>
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