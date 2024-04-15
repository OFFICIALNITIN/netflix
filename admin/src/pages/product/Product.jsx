import React, { useContext, useState } from 'react'
import "./product.css"
import { Link, useLocation } from 'react-router-dom'
import { Publish } from '@mui/icons-material'
import { movieContext } from '../../context/movieContext/movieContext'
import { updateMovie } from '../../context/movieContext/apiCalls'
import storage from '../../firebase'

export default function Product() {
    const location = useLocation()
    const moviesInfo = location.state.movie

    const [ movie, setMovie] = useState(null)
    const [ img, setImg] = useState(null)
    const [ trailer, setTrailer] = useState(null)
    const [ video, setVideo] = useState(null)
    const [uploaded, setUploaded] = useState(0)

    const {dispatch } = useContext(movieContext)
    
    const handleChange = (e) => {
        const value = e.target.value
        setMovie({...movie, [e.target.name]:value})
    }

    const upload = (items) => {
        items.forEach((item) => {
            const fileName = new Date().getTime() + item.label + item.file.name
           const uploadTask = storage.ref(`/items/${fileName}`).put(item.file)
           uploadTask.on("state_changed",snapshot=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done');
           },
           (err)=>{
                console.log(err)
           },()=>{
            uploadTask.snapshot.ref.getDownloadURL().then(url=>{
                setMovie((prev)=>{
                    return {...prev, [item.label]:url}
                })
                setUploaded((prev)=> prev + 1)
            })
           }
           )
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = moviesInfo._id
        updateMovie(id,movie,dispatch)
    }

    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            {file:img, label:'img'},
            {file:trailer, label:'trailer'},
            {file:video, label:'video'},
        ])
    }
    console.log(movie)

    return (
        <div className='product'>
            <div className='productTitleContainer'>
                <h1 className='productTitle'>Movie</h1>
                <Link to="/newproduct">

                    <button className='productAddButton'>
                        Create
                    </button>
                </Link>
            </div>
            <div className="productTop">
                <div className='productTopRight'>
                    <div className='productInfoTop'>
                        <img src={moviesInfo.img}
                            alt=''
                            className='productInfoImg'
                        />
                        <span className='productName'>{moviesInfo.title}</span>
                    </div>
                    <div className='productInfoBottom'>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>ID:</span>
                            <span className='productInfoValue'>{moviesInfo._id}</span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>Genre:</span>
                            <span className='productInfoValue'>{moviesInfo.genre}</span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>year:</span>
                            <span className='productInfoValue'>{moviesInfo.year}</span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>Limit:</span>
                            <span className='productInfoValue'>{moviesInfo.limit}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='productBottom'>
                <form className="productForm">
                    <div className='productFormLeft'>
                        <label>Movie Title</label>
                        <input type='text' placeholder={moviesInfo.title}  name='title' onChange={handleChange}/>
                        <label>Year</label>
                        <input type='text' placeholder={moviesInfo.year} name='year' onChange={handleChange} />
                        <label>Genre</label>
                        <input type='text' placeholder={moviesInfo.genre} name='genre' onChange={handleChange} />
                        <label>Limit</label>
                        <input type='number' placeholder={moviesInfo.limit} name='limit' onChange={handleChange}/>
                        <label>Trailer</label>
                        <input type='file' placeholder={moviesInfo.trailer} name='trailer' onChange={e=> setTrailer(e.target.files[0])} />
                        <label>Video</label>
                        <input type='file' placeholder={moviesInfo.video} name='video' onChange={e=> setVideo(e.target.files[0])} />
                    </div>
                    <div className='productFormRight'>
                        <div className='productUpload'>
                            <img src={moviesInfo.img}
                                alt=''
                                className='productUploadImg'
                            />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type='file' id='file' name='img' style={{ display: "none" }} onChange={e=> setImg(e.target.files[0])} />
                            </div>{ uploaded === 3 ? (

                            <button className='productButton' onClick={handleSubmit}>Update</button>
                            ) : (
                            <button className="addProductButton" onClick={handleUpload} >Upload</button>
                            )
                            }
                    </div>
                </form>
            </div>
        </div >
    )
}
