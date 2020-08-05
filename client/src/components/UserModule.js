import React, { useState } from 'react';
import { HeartOutlined } from '@ant-design/icons'

const AvatarMenu = ({toggleMenu}) => {
    return (
        <div className="module__menu" onMouseLeave={toggleMenu}>
            <div>profile</div>
            <div>logout</div>
        </div>
    )
}

    
export default ({ username, token }) => {
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
                {menuDisplay ? <AvatarMenu toggleMenu={toggleMenu}/> : null }
            </div>
        </>
    );
}