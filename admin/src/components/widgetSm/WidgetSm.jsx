import React, { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import axios from "axios";

export default function WidgetSm() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            token:
              "Nitin " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewUsers();
  });
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {user.map((u) => (
          <li className="widgetSmListItem" key={u._id}>
            <img
              src={
                u.profilePic ||
                "https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">username: {u.username}</span>
              {/* <span className='widgetSmJobTitle'>
                            Software Engineer
                        </span> */}
            </div>
            {/* <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
