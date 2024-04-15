import React from 'react'
import "./topbar.css";
import { Language, NotificationsNone, Settings } from '@mui/icons-material';


export default function Topbar({info}) {
    return (
        <div className='topbar'>
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className='logo'>Admin</span>
                </div>
                <div className="topRight">
                    {/* <div className='topbarIconContainer'>
                        <NotificationsNone />
                        <span className='topIconBadge'>2</span>
                    </div>
                    <div className='topbarIconContainer'>
                        <Language />

                    </div> */}
                    <div className='topbarIconContainer'>
                        <Settings />
                        <div className='dropdown'>
                            
                        </div>
                        
                    </div>
                    <img src={info.profilePic}
                        alt=''
                        className='topAvatar'
                    />
                </div>
            </div>
        </div>
    )
}
