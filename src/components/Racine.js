import RouteMission2 from "./RouteMission2"
import {useState, useEffect} from "react";

const Racine = () => {

    const [token, setToken] = useState( String(localStorage.getItem("token") || "-1") );
    const [refresh_token, setRefresh_token] = useState(  String(localStorage.getItem("refresh_token") || "-1") );
    const [login, setLogin] = useState(  String(localStorage.getItem("login") || "-1") );

    useEffect(() => {
        localStorage.setItem("token", token)
    }, [token])

    useEffect(() => {
        localStorage.setItem("login", login)
    }, [login])

    useEffect(() => {
        localStorage.setItem("refresh_tokenTmp", refresh_token)
    }, [refresh_token])

    const gereChangementSession = (token_param, refresh_token_param, login_param) => {
        setToken(token => token_param)
        setRefresh_token(refresh_token => refresh_token_param)
        setLogin(login => login_param)
    }
    return(
    <>
    <RouteMission2 gereChangementSession={gereChangementSession} login={login}/>
    </>
    )
}
export default Racine