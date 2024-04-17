import React from "react";
import "./topbar.css";
import { Language, NotificationsNone, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Topbar({ info }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>
        <div className="topRight">
          {/* <div className='topbarIconContainer'>
                        <NotificationsNone />
                        <span className='topIconBadge'>2</span>
                    </div>
                    <div className='topbarIconContainer'>
                        <Language />

                    </div> */}
          <div className="topbarIconContainer">
            <a onClick={handleLogout}>
              <Settings />
            </a>

            <div className="dropdown"></div>
          </div>
          <img src={info.profilePic} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
