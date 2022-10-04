import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
    clientId: "790dab6b94fc4c9eaa8a23640bf135b4",
})

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState("");

    const chooseTrack = (track) => {
        setPlayingTrack(track);
        setSearch("");
        setLyrics("");
    }
    useEffect(() => {
        if (!playingTrack) return;
        axios.get("http://localhost:5173/lyrics", {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics);
        })
    }, [playingTrack]); 

    useEffect(() => {
        if(!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;
        let cancel = false;
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return;
            setSearchResults(res.body.tracks.items.map((track)=> {
                const smallestAlbumImg = track.album.images.reduce((smallest, current) => {
                    if (current.height < smallest.height) return current
                    return smallest;
                }, track.album.images[0]);

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImg.url

                }
            }));
        });
        return () => cancel = true;
    },[search, accessToken])

    return (
        <div className="flex h-screen flex-col">
            <input 
            type="search" 
            className="form-input px-4 py-3" 
            placeholder="Search Songs/Artists" 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            />
            <div className="flex-grow my-2 mx-4 overflow-y-auto">
                {searchResults.map(track => (
                    <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
                ))}
                {search.length === 0 && (
                    <div className="text-center whitespace-pre">
                        {lyrics}
                    </div>
                )}
            </div>
            <div><Player accessToken={accessToken} trackUri={playingTrack?.uri}/></div>
        </div>
    )
}

export default Dashboard;