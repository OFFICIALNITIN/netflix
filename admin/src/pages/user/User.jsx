import React, { useContext, useState } from 'react'
import "./user.css"
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import storage from '../../firebase'
import SuccessToast from '../../components/toastMessage/successMessage'
import ErrorToast from '../../components/toastMessage/errorMessage'
import { updateUser } from '../../context/userContext/apiCalls'
import { userContext } from '../../context/userContext/userContext'
import Loading from '../../components/loading/Loading'

export default function User() {
    const location = useLocation()
    const userInfo = location.state.users

    const { dispatch, isFetching } = useContext(userContext)
    
    const [ user, setUser] = useState(null)
    const [ profilePic, setProfilePic] = useState(null)
    const [uploaded, setUploaded] = useState(0)
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const value = e.target.value
        setUser({...user, [e.target.name]:value})
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
                setUser((prev)=>{
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
        try {
            
            const id = userInfo._id
            updateUser(id,user,dispatch)
            setSuccessMessage('User Updated successfully')
            setErrorMessage('')
        } catch (error) {
            setErrorMessage('Error updating user')
            setSuccessMessage('')
        }
    }


    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            {file:profilePic, label:'profilePic'}
        ])
    }

    console.log(user)

    return (
        <div className='User'>
            { isFetching && <Loading/>}
            { successMessage &&  <SuccessToast message={successMessage} onClose={() => setSuccessMessage('')}/> }
            { errorMessage &&  <ErrorToast message={errorMessage} onClose={() => setErrorMessage('')}/> }
            <div className='userTitleContainer'>
                <h1 className='userTitle'>Edit User</h1>
                {/* <Link to="/newUser">
                    <button className='userAddButton'>Create</button>
                </Link> */}
            </div>
            <div className='userContainer'>
                <div className='userShow'>
                    <div className='userShowTop'>
                        <img src={userInfo.profilePic ||"https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg"}
                            alt=''
                            className='userShowImg'
                        />
                        <div className='userShowTopTitle'>
                            <span className='userShowUsername'>{userInfo.username}</span>
                        </div>
                    </div>
                    <div className='userShowButtom'>
                        <span className='userShowTitle'>Accout Details</span>
                        <div className='userShowInfo'>
                            <PermIdentity className='userShowIcon' />
                            <span className='userShowInfoTitle'>{userInfo.username}</span>
                        </div>
                        <div className='userShowInfo'>
                            <CalendarToday className='userShowIcon' />
                            <span className='userShowInfoTitle'>{userInfo.createdAt}</span>
                        </div>
                        <span className='userShowTitle'>Contact Details</span>
                        <div className='userShowInfo'>
                            <MailOutline className='userShowIcon' />
                            <span className='userShowInfoTitle'>{userInfo.email}</span>
                        </div>
                    </div>
                </div>
                <div className='userUpdate'>
                    <span className='userUpdateTitle'>Edit</span>
                    <form className='userUpdateForm'>
                        <div className='userUpdateLeft'>
                        
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input type='text'
                                    placeholder={userInfo.username}
                                    className='userUpdateInput'
                                    name='username'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input type='text'
                                    placeholder={userInfo.email}
                                    className='userUpdateInput'
                                    name='email'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Password</label>
                                <input type='password'
                                    placeholder='****'
                                    className='userUpdateInput'
                                    name='password'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='userUpdateItem'>
                            <label>IsAdmin</label>
                            <select className='newUserSelect' name='isAdmin' id='isAdmin' onChange={handleChange}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                            </select>
                            </div>
                        </div>
                        <div className='userUpdateRight'>
                            <div className='userUpdateUpload'>
                                <img src={userInfo.profilePic ||"https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg"}
                                    alt=''
                                    className='userUpdateImg'
                                />
                                <label htmlFor='file'><Publish className='userUpdateIcon' /></label>
                                <input type='file' id='file' name='profilePic' style={{ display: "none" }} onChange={e=> setProfilePic(e.target.files[0])}/>
                            </div>
                            { uploaded === 1 ? (
                            <button className='productButton' onClick={handleSubmit}>Update</button>
                            ) : (
                            <button className="addProductButton" onClick={handleUpload} >Upload</button>
                            )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
