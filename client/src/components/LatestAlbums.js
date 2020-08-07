import React from 'react';

const AlbumCard = () => (
    <div className="main__latest--card">
        <div className="latest--card-image">
            #
        </div>
        <div className="latest--card-blurb">
            <li>album name</li>
            <li>artist</li>
            <li>genre</li>
            <li>description</li>
        </div>
    </div>
);
export default () => {

    return (
        <div className="new-and-notable">
            <h3 className="main--h3">new and notable</h3>
            <div className="main__latest">
                <AlbumCard />
                <AlbumCard />
                <AlbumCard />
                <AlbumCard />
                <AlbumCard />
            </div>
        </div>
    );
}
