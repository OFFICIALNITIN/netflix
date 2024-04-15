import React, { useContext, useEffect, useState } from 'react'
import "./newList.css"
import { listsContext } from '../../context/listContext/listContext'
import { movieContext } from '../../context/movieContext/movieContext'
import { createList } from '../../context/listContext/apiCalls'
import { getMovies } from '../../context/movieContext/apiCalls'
import { useNavigate } from 'react-router-dom'
import SuccessToast from '../../components/toastMessage/successMessage'
import ErrorToast from '../../components/toastMessage/errorMessage'


export default function NewList() {
    const [ list, setList] = useState(null)
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { dispatch,success } = useContext(listsContext)
    const { movies, dispatch: dispatchMovie } = useContext(movieContext)
    const navigate = useNavigate()

    useEffect(()=>{
        getMovies(dispatchMovie)
    },[dispatchMovie])

    const handleChange = (e) => {
        const value = e.target.value
        setList({...list, [e.target.name]:value}) 
    }

    const handleSelect = (e) => {
       let value = Array.from(e.target.selectedOptions, (option)=> option.value)
       setList({...list, [e.target.name]:value})

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           await createList(list,dispatch)
           setSuccessMessage('List created successfully')
           setErrorMessage('')
           setTimeout(()=>{navigate('/lists')}, 2000)
        } catch (error) {
            setErrorMessage('Error creating list')
            setSuccessMessage('')
        }
    }
    console.log(list)   

    return (
        <div className='newProduct'>
            <h1 className="addProductTitle">New List</h1>
            { successMessage &&  <SuccessToast message={successMessage} onClose={() => setSuccessMessage('')}/> }
            { errorMessage &&  <ErrorToast message={errorMessage} onClose={() => setErrorMessage('')}/> }
            <form className="addProductForm">
                <div className='formLeft' >
                <div className="addProductItem">
                    <label>Title</label>
                    <input type="text" id='title' name='title' onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Genre</label>
                    <input type="text" id='genre' name='genre' onChange={handleChange}/>
                </div>
                <div className="addProductItem">
                    <label>Type</label>
                    <select name="type" id="type" onChange={handleChange}>
                    <option>Type</option>
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                    </select>
                </div>
                </div>
                <div className='formRight'>
                <div className="addProductItem">
                    <label>Content</label>
                    <select name="content" id="content" onChange={handleSelect} multiple style={{height:"280px"}}>
                        {movies.map( (movie) => (
                            <option key={movie._id} value={movie._id}>{movie.title}</option>
                            ))}
                    </select>
                </div>
                </div>
                    <button className="addProductButton" onClick={handleSubmit}>Create</button>
            </form>
        </div>
    )
}
