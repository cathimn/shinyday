import React from 'react';
import { Link } from 'react-router-dom';

const AlbumCard = ({info, img, link}) => (
    <Link to={link}>
    <div className="main__latest--card">
        <div className="latest--card-image">
            <img src={img} />
        </div>
        <div className="latest--card-blurb">
            <li>{info.album}</li>
            <li>by {info.artist}</li>
        </div>
    </div>
    </Link>
);
export default () => {

    return (
        <div className="new-and-notable">
            <h3 className="main--h3">new and notable</h3>
            <div className="main__latest">
                <AlbumCard
                    info={{album: "Heat of the Summer", artist: "Monplaisir"}}
                    img={`https://shinyday.s3.us-east-2.amazonaws.com/artists/monplaisir/heatofthesummer/art.jpg`}
                    link="/monplaisir/album/heatofthesummer"
                    />
                <AlbumCard
                    info={{album: "Haumea", artist: "Bisou"}}
                    img={`https://shinyday.s3.us-east-2.amazonaws.com/artists/bisou/haumea/art.jpg`}
                    link="/bisou/album/haumea"
                    />
                <AlbumCard
                    info={{album: "Town of Two Houses", artist: "Blear Moon"}}
                    img={`https://shinyday.s3.us-east-2.amazonaws.com/artists/blearmoon/townoftwohouses/art.jpg`}
                    link="/blearmoon/album/townoftwohouses"
                    />
                <AlbumCard
                    info={{album: "Everything's Gone", artist: "Blah Blah Blah"}}
                    img={`https://shinyday.s3.us-east-2.amazonaws.com/artists/blahblahblah/everythingsgone/art.jpg`}
                    link="/blahblahblah/album/everythingsgone"
                    />
                <AlbumCard
                    info={{album: "Funeral Void", artist: "Cryosyncopy"}}
                    img={`https://shinyday.s3.us-east-2.amazonaws.com/artists/cryosyncopy/funeralvoid/art.jpg`}
                    link="/cryosyncopy/album/funeralvoid"
                    />
            </div>
        </div>
    );
}
