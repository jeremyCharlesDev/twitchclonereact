import axios from 'axios';

let api = axios.create({
    headers : {
        "Client-ID" : "g3m4uywssvrmdk4sdcynzfx923i2dr",
        "Authorization" : "Bearer 42vofy2w0x4eo3pelbujo9lqa7ardw"
    }
})

/*

    CLIENT_ID = g3m4uywssvrmdk4sdcynzfx923i2dr
    REDIRECT = 'http://127.0.0.1/'

    LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token

    LIEN REMPLI = https://id.twitch.tv/oauth2/authorize?client_id=g3m4uywssvrmdk4sdcynzfx923i2dr&redirect_uri=http://127.0.0.1/&response_type=token

*/


export default api;