import React, {useState, useEffect} from 'react'
import api from '../../api'
import {useParams, useLocation, Link} from 'react-router-dom'


function GameStreams() {

    let {slug} = useParams();
    let location = useLocation();

    const [streamData, setStreamData] = useState([])
    const [viewers, setViewers] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`)
            let dataArray = result.data.data;
            let finalArray = dataArray.map((gameStreams) => {
                let newUrl = gameStreams.thumbnail_url
                .replace("{width}", "320")
                .replace("{height}", "180");
                gameStreams.thumbnail_url = newUrl;
            return gameStreams;
            })

            //Calcul total des viewers
            let totalViewers = finalArray.reduce((acc, val) => {
                return acc + val.viewer_count;    
            }, 0);

            let userIDs = dataArray.map((stream) => {
                return stream.user_id;
            })
            let baseUrl = "https://api.twitch.tv/helix/users?"
            let queryParamsUsers = "";
            userIDs.map(id => {
                return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
            })
            let finalUrl = baseUrl + queryParamsUsers;
            let getUsersLogin = await api.get(finalUrl);

            let userLoginArray = getUsersLogin.data.data;

            finalArray = dataArray.map(stream => {
                stream.login = "";
                userLoginArray.forEach(login => {
                    if(stream.user_id === login.id){
                        stream.login = login.login
                    }
                })
                return stream;
            })
            // console.log(finalArray);
            setViewers(totalViewers)
            setStreamData(finalArray);
        }
        fetchData();
    },[location.state.gameID])

    return (
        <div>
            <h1 className="titreGamesStreams">Stream : {slug}</h1>
            <h3 className="sousTitreGameStreams"><strong className="textColored">{viewers}</strong> personnes regardent {slug}</h3>
            <div className="flexAccueil">
                {streamData.map((stream, index) => (
                    <div key={index} className="carteGameStreams">
                        <img src={stream.thumbnail_url} className="imgCarte" alt="jeu carte img"/>
                        <div className="cardBodyGameStreams">
                            <p className="txtStream  viewers">Viewers : {stream.viewer_count}</p>
                            <Link className="lien" to={{pathname: `/live/${stream.login}`}}>
                                <div className="btnCarte">Regarder {stream.user_name}</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GameStreams
