import React, { useEffect, useState } from 'react'
import "./featured.scss";
import { InfoOutlined, PlayArrow } from '@mui/icons-material';
import axios from 'axios';
const Featured = ({ type }) => {
    const [content , setContent] = useState({});

    useEffect(()=>{
        const getRandomContent = async () => {
            try {
                const response = await axios.get(`/movies/random?type=${type}`,{
                    headers:{
                        token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjM0MGVhMTJmMDU3MmVmNGZhMjYxMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNjI5MTcxOSwiZXhwIjoxNzA2NzIzNzE5fQ.dakhbtpa0UvzTKGGhmM0JW2S-m-V5YS9G-XUOeUuZ6E"
                    }
                })
                setContent(response.data[0])
            } catch (error) {
                console.log(error)
            }
        }
        getRandomContent();
    },[type])
    return (

        <div className='featured'>
            {type && (
                <div className='category'>
                    <span>{type === "movies" ? "Movies" : "Series"}</span>
                    <select name='genre' id='genre'>
                        <option>Genre</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>
                    </select>
                </div>
            )}
            <img src={content.img}
                alt=''
            />
            <div className='info'>
                <img src={content.imgTitle}
                    alt=''
                />
                <span className='desc'>
                   {content.desc}
                </span>
                <div className='buttons'>
                    <button className='play'>
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className='more'>
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured