import React from 'react'
import "./watch.scss";
import { ArrowBackOutlined } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Watch = () => {
    const location = useLocation();
    const Movie = location.state.movie
    return (
        <div className='watch'>
            <Link to="/">
            <div className='back'>
                <ArrowBackOutlined />
                Home
            </div>
            </Link>
            <video className='video'
                autoPlay
                progress
                controls
                src={Movie.video}

            />

        </div>
    )
}

export default Watch