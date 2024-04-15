import React, { useContext, useState } from 'react'
import "./list.css"
import { Link, useLocation } from 'react-router-dom'

import { updateList } from '../../context/listContext/apiCalls'
import { listsContext } from '../../context/listContext/listContext'
import { movieContext } from '../../context/movieContext/movieContext'

export default function List() {
    const location = useLocation()
    const ListInfo = location.state.list

    const [ list, setList] = useState(null)

    const {dispatch, success } = useContext(listsContext)
    const { movies , dispatch: dispatchMovie } = useContext(movieContext)
     
    const handleChange = (e) => {
        const value = e.target.value
        setList({...list, [e.target.name]:value})
    }

    const handleSelect = (e) => {
        let value = Array.from(e.target.selectedOptions, (option)=> option.value)
        setList({...list, [e.target.name]:value})
 
     }

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = ListInfo._id
        updateList(id,list,dispatch)
    }

    return (
        <div className='product'>
            <div className='productTitleContainer'>
                <h1 className='productTitle'>List</h1>
                <Link to="/newlist">

                    <button className='productAddButton'>
                        Create
                    </button>
                </Link>
            </div>
            <div className="productTop">
                <div className='productTopRight'>
                    <div className='productInfoTop'>
                        <span className='productName'>{ListInfo.title}</span>
                    </div>
                    <div className='productInfoBottom'>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>ID:</span>
                            <span className='productInfoValue'>{ListInfo._id}</span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>Genre:</span>
                            <span className='productInfoValue'>{ListInfo.genre}</span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>Genre:</span>
                            <span className='productInfoValue'>{ListInfo.type}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='productBottom'>
                <form className="productForm">
                    <div className='productFormLeft'>
                        <label>Movie Title</label>
                        <input type='text' placeholder={ListInfo.title}  name='title' onChange={handleChange}/>
                        <label>Type</label>
                        <input type='text' placeholder={ListInfo.type} name='year' onChange={handleChange} />
                        <label>Genre</label>
                        <input type='text' placeholder={ListInfo.genre} name='genre' onChange={handleChange} />
                    </div>
                    <div className='productFormRight'>
                    <div className="addProductItem">
                    <label>Content</label>
                    <select name="content" id="content" onChange={handleSelect} multiple style={{height:"280px"}}>
                        {movies.map( (movie) => (
                            <option key={movie._id} value={movie._id}>{movie.title}</option>
                            ))}
                    </select>
                </div>

                    <button className='productButton' onClick={handleSubmit}>Update</button>
                
                    </div>
                </form>
            </div>
        </div >
    )
}
