import React from 'react';

export default ({ label, type, value, func }) => (
    <div>
        <label>{label}</label>
        <input type={type} value={value} onChange={func} />
    </div>
);