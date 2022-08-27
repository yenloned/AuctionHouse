import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { stringify } from "querystring";
import { useContext, useEffect, useState } from "react";
import LoginStatusContext from "../context/userLogin";
import { checkIfJWTexpired, getUserIdFromJWT } from "../functions/checkJWT";
import CustomTheme from "./CustomTheme";
import NavBar from "./Navbar"
import { userDataForNavbar } from "../interface/userProfile";

const Layout = (({children}: any) =>{
    const loginStatus = useContext(LoginStatusContext)
    const [userDataForNavbar, setUserDataForNavbar] = useState<userDataForNavbar | null>(null);

    const getUserDataForLayOut = async (token: string | null) => {
        const client = new ApolloClient({
            uri: "https://auctionhouse-backend-api.herokuapp.com/graphql/",
            cache: new InMemoryCache(),
            headers: {
                authorization: token ? `Bearer ${token}` : ""
            }
          })
        try{
            const {data} = await client.query({
                query: gql
                `query{
                find_profile(input: "${token}"){
                    _id
                    email
                    firstname
                    lastname
                    balance
                    currentItem
                    biddingItem
                    winningItem
                    iconURL
                    }
                }`
            })
            return data;
        }catch(e){
            return e;
        }
        
    }

    useEffect(() => {
    
    const token = localStorage.getItem("jwt_token");
    const isJWTexpired = checkIfJWTexpired(token)
    const userId = getUserIdFromJWT(token)
    if(userId && loginStatus && !isJWTexpired){
        getUserDataForLayOut(token).then(
            (result) => {
                if(result.find_profile && userId === result.find_profile._id){
                    const userData = {
                        userId: result.find_profile._id,
                        userIcon: result.find_profile.iconURL,
                        userBalance: result.find_profile.balance,
                    }
                    setUserDataForNavbar(userData)
                    return loginStatus.setIsLoggedIn(true)
                }
                return loginStatus.setIsLoggedIn(false)
            }
        )
    }else{
        return loginStatus?.setIsLoggedIn(false)
    }
    }, [])

    return (
        <>
        <NavBar userDataForNavbar={userDataForNavbar}/>
        {children}
        </>
    )
})

export default Layout;