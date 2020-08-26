import React from 'react';
import { Link } from 'react-router-dom';
import { bucketUrl, toLowerNoSpecial } from '../config'

export default ({ disc, artist }) => (
    <div className="full-discography">
        {disc
            ? disc.map(ele => (
                <div className="album-card">
                    <Link to={`/${artist}/${toLowerNoSpecial(ele)}`}>
                    <img src={`${bucketUrl}/artists/${artist}/${toLowerNoSpecial(ele)}/art.jpg`}
                        alt="album art"
                        className="album-card__art" />
                    <span className="album-card__name">
                        {ele}
                    </span>
                    </Link>
                </div>
                )
            )
            : null
        }
    </div>
);
