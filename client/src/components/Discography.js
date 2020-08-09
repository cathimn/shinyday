import React from 'react';

import { bucketUrl } from '../config'

export default ({ disc, artistTerm }) => {
    const DiscCard = ({ album }) => {
        const albumTerm = album.toLowerCase().replace(/[\s|\W]/gm, "");
        return (
            <a href={`/${artistTerm}/${albumTerm}`}>
                <img src={`${bucketUrl}/artists/${artistTerm}/${albumTerm}/art.jpg`}
                    className="side-discography__album-art"
                    alt="album arts" />
                <li key={album} className="side-discography__album-name">
                    {album}
                </li>
            </a>
        );
    }
    return (
        <ul className="side-discography">
            <span>discography</span>
            {disc
                ? disc.map(ele => <DiscCard album={ele} />)
                : null
            }
        </ul>
    )
}