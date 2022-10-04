const AUTH_URL = 
    "https://accounts.spotify.com/authorize?client_id=790dab6b94fc4c9eaa8a23640bf135b4&response_type=code&redirect_uri=http://127.0.0.1:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const Login = () => {
    return (
        <div className="flex h-screen">
            <a 
            className="bg-green-500 text-green-100 py-2 px-8 rounded-full m-auto"
            href={AUTH_URL}
            >Login With Spotify
            </a>
        </div>
    )
} 

export default Login;