import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';

import { baseUrl } from './config';

import Header from './components/Header';
import Banner from './components/Banner';

export default ({ token }) => {
    const [username, setUsername] = useState('');

    const loadProfile = async authToken => {
        const response = await fetch(`${baseUrl}/user/me`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        if (response.ok) {
            const res = await response.json();
            setUsername(res.username);
        }
    };

    useEffect(() => {
        loadProfile(token);
    })

    return (
        <>
            <Header token={token} username={username}/>
            <Banner />
            <Divider />
        </>
    );
};