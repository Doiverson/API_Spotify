import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
    }, {});

    return paramsSplitUp;
};

const Main = () => {

    const [token, setToken] = useState("");
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {

        if (window.location.hash) {
            const { access_token, expires_in, token_type } =
                getReturnedParamsFromSpotifyAuth(window.location.hash);

            localStorage.clear();

            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresIn", expires_in);
            setToken(access_token);
            navigate("/main");
            return;
        }

        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
        } else {
            navigate("/");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGetPlaylists = () => {
        axios.get(`https://api.spotify.com/v1/albums`, {
            headers: {
                Authorization: "Bearer " + token,
            },
            params: {
                ids: "41GuZcammIkupMPKH2OJ6I"
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