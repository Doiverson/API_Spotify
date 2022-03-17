import React, {useEffect} from 'react';

const generateRandomString = (length) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
        const [key, value] = currentValue.split("=");
        accumulator[key] = value;
        return accumulator;
    }, {});

    return paramsSplitUp;
};


const client_id = '232a6cc4dd7943138a15c6b93e680b59';
const redirect_uri = 'http://localhost:3000/callback'

const state = generateRandomString(16);
const stateKey = 'spotify_auth_state';

localStorage.setItem(stateKey, state);
const scope = 'user-read-private user-read-email';

let url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);

const Main = () => {

    useEffect(() => {
        if (window.location.hash) {
            const { access_token, expires_in, token_type } =
                getReturnedParamsFromSpotifyAuth(window.location.hash);

            localStorage.clear();

            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresIn", expires_in);
        }
    }, [window.location.hash])

    const handleLogin = () => {
        window.location = url;
    };

    return (
        <div>
            <h1>Spotify Login</h1>
            <button onClick={handleLogin}>Login</button>

        </div>
    )
}

export default Main;