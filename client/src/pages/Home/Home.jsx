import React, { useEffect, useState } from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/Featured/Featured";
import List from "../../components/list/List";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const response = await axios.get(
          `https://netflix-7yip.onrender.com/api/lists${
            type ? "?type=" + type : ""
          }${type && genre ? "&" : ""}${genre ? "genre=" + genre : ""}`,
          {
            headers: {
              token:
                "Nitin " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomLists();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list, i) => (
        <List key={i} list={list} />
      ))}
    </div>
  );
};

export default Home;
