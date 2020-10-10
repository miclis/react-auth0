import React, { useEffect, useState } from 'react';

const Private = (props) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/private', { headers: { Authorization: `Bearer ${props.auth.getAccessToken()}` } })
            .then((resp) => {
                if (resp.ok) return resp.json();
                throw new Error('Network response was not ok.');
            })
            .then((resp) => setMessage(resp.message))
            .catch((error) => setMessage(error.message));
    }, []);

    return <p>{message}</p>;
};

export default Private;
