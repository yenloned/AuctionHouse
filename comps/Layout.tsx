import { useContext, useEffect } from "react";
import LoginStatusContext from "../context/userLogin";
import { checkIfJWTexpired, getUserIdFromJWT } from "../functions/checkJWT";
import CustomTheme from "./CustomTheme";
import NavBar from "./Navbar"

const Layout = (({children}: any) =>{
    const loginStatus = useContext(LoginStatusContext)

    useEffect(() => {
    
    const token = localStorage.getItem("jwt_token");
    const isJWTexpired = checkIfJWTexpired(token)
    const userId = getUserIdFromJWT(token)
    if(userId && loginStatus && !isJWTexpired){
        return loginStatus.setIsLoggedIn(true)
    }
    loginStatus?.setIsLoggedIn(false)
    }, [])

    return (
        <>
        <NavBar />
        {children}
        </>
    )
})

export default Layout;