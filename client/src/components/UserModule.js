import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { bucketUrl, baseUrl } from '../config';

const AvatarMenu = ({ username, toggleMenu }) => {
  const { setSession } = useContext(AppContext);

  const logout = async (e) => {
    const authToken = window.localStorage.getItem("shinyday_session");
    const response = await fetch(`${baseUrl}/session`, {
        method: 'delete',
        headers: { Authorization: `Bearer ${authToken}` }
    })

    if (response.ok) {
      window.localStorage.removeItem("shinyday_session");
      setSession({
        token: null,
        id: null,
        username: null,
        isArtist: null,
      });
      // window.location.reload(false);
    }
  }

  return (
    <div className="module__menu" onMouseLeave={toggleMenu}>
      <Link to={`/profile/${username}`}>
        profile
      </Link>
      <button className="module__menu--link"
          onClick={logout}>logout
      </button>
    </div>
  )
}

export default () => {
  const { session } = useContext(AppContext);

  const [menuDisplay, setMenuDisplay] = useState(false);

  const toggleMenu = e => {
    setMenuDisplay(!menuDisplay);
  };

  return (
    <>
      <div className="module">
        <div>
          <Link to={`/profile/${session.username}`}>
            <div className="module__heart">💗</div>
          </Link>
        </div>
      </div>
      <div className="module__avatar-container">
          <div className="module__avatar" onMouseOver={toggleMenu} >
            <img src={session.avatarUrl} alt="avatar"></img>
          </div>
          {menuDisplay && <AvatarMenu username={session.username} toggleMenu={toggleMenu}/>}
      </div>
    </>
  );
}
