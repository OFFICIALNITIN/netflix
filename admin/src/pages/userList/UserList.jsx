import React, { useContext, useEffect, useState } from 'react';
import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { userContext } from '../../context/userContext/userContext';
import { deleteUser, getUser } from '../../context/userContext/apiCalls';
import Loading from '../../components/loading/Loading';

export const UserList = () => {
    const { users, dispatch, isFetching } = useContext(userContext)

    useEffect(()=>{
        getUser(dispatch)
    },[dispatch])

    const handleDelete = (id) => {
        deleteUser(id,dispatch)
    }
    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        {
            field: 'users', headerName: 'Users', width: 250, renderCell: (params) => {
                return (
                    <div className='userListUser'>
                        <img className='userListImg' src={params.row.profilePic || "https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg"} alt='' />
                        {params.row.username}
                    </div>
                )
            }
        },
        {
            field: 'email', headerName: 'Email', width: 250,
        },
        {
            field: 'isAdmin',
            headerName: 'Admin',
            width: 120,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/user/ ${params.row._id}`} state={{users:params.row}}>
                            <button className='userListEdit'>Edit</button>
                        </Link>
                        <DeleteOutline className='userListDelete' onClick={() => handleDelete(params.row._id)} />

                    </>
                )
            }
        },


    ];


    return (
        <div className='userList'>
            { isFetching && <Loading/>}
            {/* <Link to="/newUser">
            <button className='productAddButton'>+ Add User</button>
            </Link> */}
            <DataGrid
                disableSelectionOnClick
                rows={users}
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
