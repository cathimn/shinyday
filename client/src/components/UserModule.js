import React, { useState } from 'react';
import { HeartOutlined } from '@ant-design/icons'

const AvatarMenu = ({ setNeedLogin, toggleMenu }) => {
    return (
        <div className="module__menu" onMouseLeave={toggleMenu}>
            <div>profile</div>
            <div onClick={e => {
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
            <div>
                <div className="module__avatar" onMouseOver={toggleMenu} >
                    {username}
                </div>
                {menuDisplay ? <AvatarMenu setNeedLogin={setNeedLogin} toggleMenu={toggleMenu}/> : null }
            </div>
        </>
    );
}