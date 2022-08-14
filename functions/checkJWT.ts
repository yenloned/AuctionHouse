import jwt_decode from "jwt-decode"
import { decodedJWTType } from "../interface/decodeJWT";

export const getJWT = () => {
    return typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null
}

export const decodeJWT = (token: string) => {
    const decoded: decodedJWTType = jwt_decode(token);
    return decoded
}

export const checkJWTandID = (token: string | null, userId: string) => {
    if (!token || token === "" || token === undefined){
        return false
    }
    try{
        const decoded: decodedJWTType = jwt_decode(token);
        return decoded.sub === userId
    }catch(e){
        return false;
    }

}

export const checkIfJWTexpired = (token: string | null) => {
    if (!token || token === "" || token === undefined){
        return true
    }
    try{
        const decoded: decodedJWTType = decodeJWT(token);
        return (Math.floor((new Date).getTime() / 1000)) >= decoded.exp;
    }catch(e){
        return true
    }

}

export const getUserIdFromJWT = (token: string | null) => {
    if(!token){
        return ""
    }
    try{
        const decoded: decodedJWTType = decodeJWT(token);
        return decoded.sub
    }catch(e){
        return "";
    }
}