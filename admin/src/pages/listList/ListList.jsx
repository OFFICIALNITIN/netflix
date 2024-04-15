import React, { useContext, useEffect } from 'react'
import "./listList.css"
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { listsContext } from '../../context/listContext/listContext';
import { deleteList, getLists } from '../../context/listContext/apiCalls';
import Loading from '../../components/loading/Loading';

export default function ListList() {
    const { lists, dispatch, isFetching} = useContext(listsContext)

    useEffect(()=>{
        getLists(dispatch)
    },[dispatch])

    const handleDelete = (id) => {
        deleteList(id, dispatch)
    }

    const columns = [
        {
            field: '_id', headerName: 'ID', width: 200,
        },
        {
            field: 'title', headerName: 'title', width: 250,
        },
        {
            field: 'genre', headerName: 'Genre', width: 120,
        },
        {
            field: 'type', headerName: 'type', width: 120,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {   
                return (
                    <>
                        <Link to={`/list/ ${params.row._id}`} state={{list:params.row}}>
                            <button className='productListEdit'>Edit</button>
                        </Link>
                        <DeleteOutline className='productListDelete' onClick={() => handleDelete(params.row._id)} />

                    </>
                )
            }
        },


    ];

    return (
        <div className='productList'>
            <Link to="/newList">
            <button className='productAddButton'>+ Add List</button>
            </Link>
            {isFetching && <Loading/>}
            <DataGrid
                disableSelectionOnClick
                rows={lists}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 8 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                getRowId={r=>r._id}
            />
        </div>
    )
}
