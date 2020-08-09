import React from 'react';
import { useLocation } from 'react-router-dom';
import { bucketUrl } from '../config'

export default ({ disc, artist }) => {
    const location = useLocation();

    return (
        <div className="full-discography">
        {disc ? disc.map(ele=> {
            return (
                <div className="album-card">
                    <a href={`${location.pathname}/${ele.toLowerCase().replace(/[\s|\W]/gm, "")}`}>
                    <img src={`${bucketUrl}/artists/${artist}/${ele.toLowerCase().replace(/[\s|\W]/gm, "")}/art.jpg`}
                        alt="album art"
                        className="album-card__art" />
                    <span className="album-card__name">
                        {ele}
                    </span>
                    </a>
                </div>
            )
            })
            : null
        }
        </div>
    )
}
