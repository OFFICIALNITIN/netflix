import React, { useState } from 'react'
import "./newUser.css"
import storage from '../../firebase'

export default function NewUser() {
    const [ user, setUser ] = useState(null)
    const [ profilePic, setProfilePic ] = useState(null)
    const [ uploaded, setUploaded ] = useState(0)
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


    const handleSubmit =  (e) =>  {
        e.preventDefault();
        try {
            // updateUser(id,user,dispatch)
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

    return (
        <div className='newUser'>
            <h1 className='newUserTitle'>New User</h1>
            <form className='newUserForm'>
                <div className='newUserItem'>
                    <label>Username</label>
                    <input type='text' placeholder='Username' name='username' required onChange={handleChange}/>
                </div>
                <div className='newUserItem'>
                    <label>Email</label>
                    <input type='email' placeholder='xyz@gmail.com' name='email' required onChange={handleChange} />
                </div>
                <div className='newUserItem'>
                    <label>Password</label>
                    <input type='password' placeholder='password' name='password' required onChange={handleChange} />
                </div>
                <div className='newUserItem'>
                <label htmlFor='file'>ProfilePic</label>
                <input type='file' id='file' name='profilePic' onChange={e=> setProfilePic(e.target.files[0])} required/>
                </div>
                <div className='newUserItem'>
                    <label>IsAdmin</label>
                    <select className='newUserSelect' name='IsAdmin' id='IsAdmin' onChange={handleChange} required>
                        <option value="">IsAdmin</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                { uploaded === 1 ? (
                <button className="newUserButton" onClick={handleSubmit}>Create</button>
                ) : (
                <button className="newUserButton" onClick={handleUpload} >Upload</button>
                )
                }
            </form>
        </div>
    )
}
