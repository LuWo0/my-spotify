import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios.post("http://localhost:5174/login", {
            code,
        }).then(res => {
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            window.history.pushState({}, null, "/");
        }).catch((err) => {
            console.log(err);
            // window.location = "/";
        });
    },[code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;
        const timeout = setInterval(() => {
            axios.post("http://loaclhost:5174/refresh", {
                refreshToken,
            }).then(res => {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.expiresIn);
            }).catch((err) => {
                console.log(err);
                // window.location = "/";
            });
        }, (expiresIn - 60) * 1000);

        return () => clearTimeout(timeout);

    }, [refreshToken, expiresIn]);

    return accessToken;
}

export default useAuth;