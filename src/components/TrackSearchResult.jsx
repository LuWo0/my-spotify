
const TrackSearchResult = ({ track, chooseTrack }) => {
    const handlePlay = () => {
        chooseTrack(track);
    }
    return (
        <div className="flex m-2 items-center cursor-pointer" onClick={handlePlay}>
            <img src={track.albumUrl} className="h-16 w-16"/>
            <div className="ml-3">
                <div>{track.title}</div>
                <div className=" text-opacity-60">{track.artist}</div>
            </div>
        </div>
    )
}

export default TrackSearchResult;