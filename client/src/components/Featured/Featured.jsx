import React, { useEffect, useState } from 'react'
import "./featured.scss";
import { InfoOutlined, PlayArrow } from '@mui/icons-material';
import axios from 'axios';
const Featured = ({ type, setGenre }) => {
    const [content , setContent] = useState({});

    useEffect(()=>{
        const getRandomContent = async () => {
            try {
                const response = await axios.get(`/movies/random?type=${type}`,{headers:{token: "Nitin "+JSON.parse(localStorage.getItem("user")).accessToken}})
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
                    <span>{type === "movie" ? "Movies" : "Series"}</span>
                    <select name='genre' id='genre' onChange={(e) =>  setGenre(e.target.value)} >
                        <option>Genre</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Crime">Crime</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Historical">Historical</option>
                        <option value="Horror">Horror</option>
                        <option value="Romance">Romance</option>
                        <option value="Sci-fi">Sci-fi</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Western">Western</option>
                        <option value="Animation">Animation</option>
                        <option value="Drama">Drama</option>
                        <option value="Documentary">Documentary</option>
                    </select>
                </div>
            )}
            <img src={content.img} alt='' />
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