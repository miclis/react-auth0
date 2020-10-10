import React, { useEffect, useState } from 'react';

const Courses = (props) => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/courses', { headers: { Authorization: `Bearer ${props.auth.getAccessToken()}` } })
            .then((resp) => {
                if (resp.ok) return resp.json();
                throw new Error('Network response was not ok.');
            })
            .then((resp) => setCourses(resp.courses))
            .catch((error) => setError(error.message));

        fetch('/admin', { headers: { Authorization: `Bearer ${props.auth.getAccessToken()}` } })
            .then((resp) => {
                if (resp.ok) return resp.json();
                throw new Error('Network response was not ok.');
            })
            .then((resp) => console.log(resp))
            .catch((error) => setError(error.message));
    }, []);

    return (
        <ul>
            {error ? (
                <li>{error.message}</li>
            ) : (
                courses.map((course) => {
                    return <li key={course.id}>{course.title}</li>;
                })
            )}
        </ul>
    );
};

export default Courses;
