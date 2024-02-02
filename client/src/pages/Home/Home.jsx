import React, { useEffect, useState } from 'react'
import "./home.scss";
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/Featured/Featured';
import List from '../../components/list/List';
import axios from 'axios'

const Home = ({type}) => {
    const [lists, setLists] = useState([])
    const [genre, setGenre] = useState(null)

    useEffect(()=>{
        const getRandomLists = async () => {    
            try {
                const response = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "genre=" + genre : ""}`,{
                    headers:{
                        token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjM0MGVhMTJmMDU3MmVmNGZhMjYxMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNjI5MTcxOSwiZXhwIjoxNzA2NzIzNzE5fQ.dakhbtpa0UvzTKGGhmM0JW2S-m-V5YS9G-XUOeUuZ6E"
                    }
                })
                setLists(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getRandomLists()
    },[type,genre])
    return (
        <div className='home'>
            <Navbar />
            <Featured type={type} />
            {lists.map((list,i)=>(
                <List key={i} list={list}/>
            ))}

        </div>
    )
}

export default Home