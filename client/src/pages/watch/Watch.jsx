import React from 'react'
import "./watch.scss";
import { ArrowBackOutlined } from '@mui/icons-material';
import video from "../watch/video.mp4";

const Watch = () => {
    return (
        <div className='watch'>
            <div className='back'>
                <ArrowBackOutlined />
                Home
            </div>
            <video className='video'
                autoPlay
                progress
                controls
                src={video}

            />

        </div>
    )
}

export default Watch