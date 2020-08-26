import React from 'react';
import { Link } from 'react-router-dom';

import { bucketUrl, toLowerNoSpecial } from '../config'

export default ({ disc, artistTerm }) => {
    const DiscCard = ({ album }) => {
        const albumTerm = toLowerNoSpecial(album);
        return (
            <Link to={`/${artistTerm}/${albumTerm}`}>
                <img src={`${bucketUrl}/artists/${artistTerm}/${albumTerm}/art.jpg`}
                    className="side-discography__album-art"
                    alt="album arts" />
                <li key={album} className="side-discography__album-name">
                    {album}
                </li>
            </Link>
        );
    }
    return (
        <ul className="side-discography">
            <span>discography</span>
            {disc
                ? disc.map(ele => <DiscCard key={`disc${ele}`} album={ele} />)
                : null
            }
        </ul>
    )
}
