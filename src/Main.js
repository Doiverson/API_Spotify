import React, { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {

    const [token, setToken] = useState("");
    const [data, setData] = useState({});

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
        }
    }, []);

    const handleGetPlaylists = () => {
        axios
            .get(`https://api.spotify.com/v1/albums`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
                params: {
                    ids: "3SpBlxme9WbeQdI9kx7KAV"
                }
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <h1>Playlist</h1>
            <button onClick={handleGetPlaylists}>Get Playlists</button>
            <img src={data.albums && data.albums[0].images[0].url} alt=""/>
            <ul>
                {data.albums && data.albums[0]?.tracks.items.map(({name}, index) => <li key={index}>{name}</li>)}
            </ul>
        </div>
    )
};

export default Main;