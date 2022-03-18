import React from 'react';

const generateRandomString = (length) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const client_id = process.env.REACT_APP_SPOTIFY_ID;
const redirect_uri = 'http://localhost:3000/main'

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

const Login = () => {

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

export default Login;