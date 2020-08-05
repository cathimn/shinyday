import React from 'react';

const AlbumCard = () => (
    <div className="main__latest--card">
        <div>Image</div>
        <div>album name</div>
        <div>artist</div>
    </div>
);
export default () => {

    return (
        <>
            <div className="main__latest">
                <AlbumCard />
                <AlbumCard />
                <AlbumCard />
                <AlbumCard />
                <AlbumCard />
            </div>
        </>
    );
}